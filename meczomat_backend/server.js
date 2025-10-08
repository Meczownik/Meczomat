// 1. Wczytanie bibliotek
require('dotenv').config(); // Do odczytu zmiennych środowiskowych (choć na Renderze ustawiamy je w panelu)
const express = require('express');
const { Pool } = require('pg'); // Zamiast 'mysql2', używamy biblioteki 'pg' dla PostgreSQL
const cors = require('cors');
const path = require('path');

// 2. Utworzenie aplikacji Express
const app = express();
// W server.js, zastąp obecne app.use(cors()) tym:
app.use(cors({
    origin: function (origin, callback) {
        // Zezwól na żądania bez origin (np. z tej samej domeny) lub z Render
        if (!origin || origin.includes('render.com') || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// 3. Serwowanie plików statycznych (frontendu) z folderu 'public'
// To sprawia, że plik index.html i reszta są dostępne w przeglądarce
app.use(express.static('public'));

// 4. Konfiguracja połączenia z bazą danych PostgreSQL na Render
// Render automatycznie dostarcza zmienną DATABASE_URL z wszystkimi danymi
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Ta opcja jest często wymagana przez platformy hostingowe takie jak Render
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware do logowania żądań
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});


// --- ENDPOINTY API ---
// Tutaj umieszczasz "adresy", z którymi łączy się Twój frontend

// Przykład: Wyszukiwanie drużyn
app.get('/teams/search', async (req, res) => {
    const teamName = req.query.name;
    if (!teamName) {
        return res.status(400).json({ error: 'Nazwa drużyny jest wymagana' });
    }

    try {
        // W PostgreSQL używamy $1, $2 zamiast ? jako placeholderów
        // Używamy ILIKE zamiast LIKE dla wyszukiwania bez rozróżniania wielkości liter
        const result = await pool.query(
            'SELECT id, name FROM teams WHERE name ILIKE $1',
            [`%${teamName}%`]
        );
        // Wyniki w bibliotece 'pg' znajdują się w obiekcie result.rows
        res.json(result.rows);
    } catch (error) {
        console.error('Błąd przy wyszukiwaniu drużyny:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Przykład: Pobieranie danych o grupie i tabeli ligowej
app.get('/group/:id', async (req, res) => {
    const groupId = req.params.id;

    try {
        // Pobieramy informacje o samej grupie
        const groupInfo = await pool.query('SELECT name, league, district FROM league_groups WHERE id = $1', [groupId]);

        // Pobieramy tabelę (standings) dla tej grupy, łącząc z tabelą drużyn (teams)
        const standings = await pool.query(
            `SELECT 
                s.points, 
                s."goalsFor", 
                s."goalsAgainst", 
                s."goalDifference", 
                t.name as "teamName"
             FROM standings s
             JOIN teams t ON s.team_id = t.id
             WHERE s.group_id = $1
             ORDER BY s.points DESC, s."goalDifference" DESC, s."goalsFor" DESC`,
            [groupId]
        );

        res.json({
            group: groupInfo.rows[0],
            table: standings.rows
        });

    } catch (error) {
        console.error(`Błąd przy pobieraniu danych dla grupy ${groupId}:`, error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});


// Przykład: Aktualizacja wyniku meczu (dla panelu admina)
app.patch('/matches/:id', async (req, res) => {
    const matchId = req.params.id;
    const { homeGoals, awayGoals } = req.body;

    try {
        const result = await pool.query(
            'UPDATE matches SET "homeGoals" = $1, "awayGoals" = $2 WHERE id = $3',
            [homeGoals, awayGoals, matchId]
        );

        if (result.rowCount > 0) {
            res.json({ message: 'Wynik zaktualizowany pomyślnie' });
        } else {
            res.status(404).json({ error: 'Nie znaleziono meczu' });
        }
    } catch (error) {
        console.error('Błąd przy aktualizacji wyniku:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Dodaj tutaj resztę swoich endpointów API...

// Pobieranie danych drużyny
app.get('/teams/:id', async (req, res) => {
    const teamId = req.params.id;
    try {
        const result = await pool.query(
            `SELECT t.*, lg.name as "groupName", lg.league, lg.district 
             FROM teams t 
             LEFT JOIN league_groups lg ON t.group_id = lg.id 
             WHERE t.id = $1`,
            [teamId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Nie znaleziono drużyny' });
        }
    } catch (error) {
        console.error('Błąd pobierania drużyny:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Pobieranie tabeli dla grupy
app.get('/standings/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    try {
        const result = await pool.query(
            `SELECT s.points, s."goalsFor", s."goalsAgainst", s."goalDifference",
                    t.id, t.name
             FROM standings s
             JOIN teams t ON s.team_id = t.id
             WHERE s.group_id = $1
             ORDER BY s.points DESC, s."goalDifference" DESC, s."goalsFor" DESC`,
            [groupId]
        );
        
        // Formatowanie dla frontendu
        const standings = result.rows.map(row => ({
            points: row.points,
            goalsFor: row.goalsFor,
            goalsAgainst: row.goalsAgainst,
            goalDifference: row.goalDifference,
            team: {
                id: row.id,
                name: row.name
            }
        }));
        
        res.json(standings);
    } catch (error) {
        console.error('Błąd pobierania tabeli:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Pobieranie meczów drużyny
app.get('/matches/team/:teamId', async (req, res) => {
    const teamId = req.params.teamId;
    try {
        const result = await pool.query(
            `SELECT m.id, m."homeGoals", m."awayGoals", m."matchDate",
                    ht.id as "homeTeamId", ht.name as "homeTeamName",
                    at.id as "awayTeamId", at.name as "awayTeamName"
             FROM matches m
             JOIN teams ht ON m.home_team_id = ht.id
             JOIN teams at ON m.away_team_id = at.id
             WHERE m.home_team_id = $1 OR m.away_team_id = $1
             ORDER BY m."matchDate" DESC`,
            [teamId]
        );
        
        const matches = result.rows.map(row => ({
            id: row.id,
            homeGoals: row.homeGoals,
            awayGoals: row.awayGoals,
            matchDate: row.matchDate,
            homeTeam: {
                id: row.homeTeamId,
                name: row.homeTeamName
            },
            awayTeam: {
                id: row.awayTeamId,
                name: row.awayTeamName
            }
        }));
        
        res.json(matches);
    } catch (error) {
        console.error('Błąd pobierania meczów:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Endpoint dla szczegółów grupy (dla results.html)
app.get('/group/details/:id', async (req, res) => {
    const groupId = req.params.id;

    try {
        const groupInfo = await pool.query(
            'SELECT id, name as "groupName", league, district FROM league_groups WHERE id = $1', 
            [groupId]
        );

        if (groupInfo.rows.length > 0) {
            res.json(groupInfo.rows[0]);
        } else {
            res.status(404).json({ error: 'Nie znaleziono grupy' });
        }
    } catch (error) {
        console.error(`Błąd przy pobieraniu grupy ${groupId}:`, error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Catch-all route: Jeśli żadne zapytanie API nie pasuje, wyślij index.html
// To ważne dla jednostronicowych aplikacji (SPA), jeśli będziesz takich używał w przyszłości
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// 5. Uruchomienie serwera
// Render sam ustawi odpowiedni port poprzez zmienną środowiskową PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Serwer Meczomat działa na porcie ${PORT}`);
});