// 1. Wczytanie bibliotek
require('dotenv').config(); // Do odczytu zmiennych środowiskowych (choć na Renderze ustawiamy je w panelu)
const express = require('express');
const { Pool } = require('pg'); // Zamiast 'mysql2', używamy biblioteki 'pg' dla PostgreSQL
const cors = require('cors');
const path = require('path');

// 2. Utworzenie aplikacji Express
const app = express();
app.use(cors());
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


// Catch-all route: Jeśli żadne zapytanie API nie pasuje, wyślij index.html
// To ważne dla jednostronicowych aplikacji (SPA), jeśli będziesz takich używał w przyszłości
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// 5. Uruchomienie serwera
// Render sam ustawi odpowiedni port poprzez zmienną środowiskową PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer Meczomat działa na porcie ${PORT}`);
});