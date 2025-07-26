$(document).ready(function(){
    $(".info-box").hide();

    // Tablica z parami: [przycisk, box do pokazania]
    const pairs = [

        //Zachodnio-Pomorskie

        ["#zachodnio-pomorskie", "#info-zachodnio-pomorskie"],

        //Pomorskie

        ["#pomorskie", "#info-pomorskie"],
        ["#a_gdansk", "#A-klasa_Gdansk"],
        ["a_malbork", "#A-klasa_Malbork"],
        ["#b_gdansk", "#B-klasa_Gdansk"],
        ["#b_malbork", "#B-klasa_Malbork"],

        //Warmińsko-Mazurskie

        ["#warminsko-mazurskie", "#info-warminsko-mazurskie"],

        //Podlaskie

        ["#podlaskie", "#info-podlaskie"],

        //Lubuskie

        ["#lubuskie", "#info-lubuskie"],
        ["#a_gorzow-wielkopolski", "#A-klasa_gorzow-wielkopolski"],
        ["#a_zielona-gora", "#A-klasa_zielona-gora"],

        //Wielkopolskie

        ["#wielkopolskie", "#info-wielkopolskie"],

        //Kujawsko-Pomorskie

        ["#kujawsko-pomorskie", "#info-kujawsko-pomorskie"],
        ["#a_bydgoszcz", "#A-klasa_bydgoszcz"],
        ["#b_bydgoszcz", "#B-klasa_bydgoszcz"],
        ["#b_torun", "#B-klasa_torun"],

        //Mazowieckie

        ["#mazowieckie", "#info-mazowieckie"],
        ["#o_warszawa", "#Okregowka_Warszawa"],
        ["#a_warszawa", "#A-klasa_Warszawa"],
        ["#a_radom", "#A-klasa_Radom"],
        ["#b_warszawa", "#B-klasa_Warszawa"],
        ["#b_radom", "#B-klasa_Radom"],
        ["#b_siedlce", "#B-klasa_Siedlce"],

        //Dolnośląskie

        ["#dolnoslaskie", "#info-dolnoslaskie"],
        ["#a_wroclaw", "#A-klasa_Wroclaw"],
        ["#a_walbrzych", "#A-klasa_Walbrzych"],
        ["#a_legnica", "#A-klasa_Legnica"],
        ["#a_jelenia_gora", "#A-klasa_Jelenia_Gora"],
        ["#b_walbrzych", "#B-klasa_Walbrzych"],
        ["#b_legnica", "#B-klasa_Legnica"],
        ["#b_jelenia_gora", "#B-klasa_Jelenia_Gora"],

        //Łódzkie

        ["#lodzkie", "#info-lodzkie"],

        //Lubelskie

        ["#lubelskie", "#info-lubelskie"],
        ["#a_biala-podlaska", "#A-klasa_Biala-Podlaska"],

        //Opolskie

        ["#opolskie", "#info-opolskie"],

        //Śląskie

        ["#slaskie", "#info-slaskie"],
        ["#a_rybnik", "#A-klasa_Rybnik"],
        ["#b_rybnik", "#B-klasa_Rybnik"],

        //Świętokrzyskie

        ["#swietokrzyskie", "#info-swietokrzyskie"],

        //Małopolskie

        ["#malopolskie", "#info-malopolskie"],
        ["#o_krakow", "#Okregowka_Krakow"],
        ["#a_wadowice", "#A-klasa_Wadowice"],
        ["#b_wadowice", "#B-klasa_Wadowice"],
        ["#b_podhalanski", "#B-klasa_Podhalanski"],
        
        //Podkarpackie

        ["#podkarpackie", "#info-podkarpackie"],
        ["#a_jaroslaw", "#A-klasa_Jaroslaw"],
        ["#a_krosno", "#A-klasa_Krosno"],
        ["#a_rzeszow", "#A-klasa_Rzeszow"],
        ["#a_stalowa-wola", "#A-klasa_Stalowa-Wola"],
        ["#b_debica", "#B-klasa_Debica"],
        ["#b_krosno", "#B-klasa_Krosno"],
        ["#b_rzeszow", "#B-klasa_Rzeszow"],
        ["#b_stalowa-wola", "#B-klasa_Stalowa-Wola"]
    ];

    pairs.forEach(([btn, box]) => {
        $(btn).click(function(e){
            e.stopPropagation();
            $(box).slideToggle();
        });
    });
});

// Przykładowe dane results table
const sampleData = [
    {
        position: 1,
        league: "Ekstraklasa",
        team: "Legia Warszawa",
        difference: 8,
        points: 29
    },
    {
        position: 2,
        league: "Ekstraklasa",
        team: "Lech Poznań",
        difference: 12,
        points: 24
    },
    {
        position: 3,
        league: "Ekstraklasa",
        team: "Przykładowy team",
        difference: 10,
        points: 8
    },
    {
        position: 4,
        league: "Ekstraklasa",
        team: "Przykładowy team",
        difference: 10,
        points: 8
    },
    {
        position: 5,
        league: "Ekstraklasa",
        team: "Przykładowy team",
        difference: 10,
        points: 8
    },
    // wincyj timków
];

function populateTable(data) {
    const tbody = document.querySelector('.league-table tbody');
    tbody.innerHTML = '';
    
    data.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.position}</td>
            <td>${team.league}</td>
            <td class="team-name">${team.team}</td>
            <td>${team.difference}</td>
            <td><strong>${team.points}</strong></td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateTable(sampleData);
});


// Wyszukiwarka drużyn section search w jquery
const API_BASE = 'http://localhost:3000';

$(document).ready(function () {
  $('#teamSearchBtn').on('click', async function () {
    const input = $('#teamSearchInput');
    const errorDiv = $('#teamSearchError');
    const resultsSection = $('#searchResults');
    const resultsList = $('#teamResultsList');
    const name = input.val().trim();

    errorDiv.text('');
    resultsSection.hide();
    resultsList.empty();

    

    if (!name) {
      errorDiv.text('Wpisz nazwę drużyny!');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/teams/search?name=${encodeURIComponent(name)}`);

      const data = await res.json();

      if (!res.ok) {
        errorDiv.text(data.message || 'Błąd podczas wyszukiwania.');
        return;
      }

      if (data.length > 0) {
        data.forEach(team => {
          const item = $(`
            <li>
              <strong>${team.nazwaDruzyny}</strong><br>
              Liga: ${team.liga}<br>
              Okręg: ${team.okreg || 'brak'}<br>
            </li>
          `);
          resultsList.append(item);
        });
        resultsSection.show();
      } else {
        errorDiv.text('Nie znaleziono takiej drużyny.');
      }
    } catch (err) {
      console.error(err);
      errorDiv.text('Błąd połączenia z serwerem.');
    }
  });
  
    //obsługa entera
    $('#teamSearchInput').on('keydown', function (e) {
        if (e.which === 13 || e.key === 'Enter') {
            $('#teamSearchBtn').click();
        }
    });

});


//obsługa przycisków do results.html

$(document).ready(function () {
  const buttonConfig = {
    // OKRĘGÓWKA
    okregowka_wroclaw:         { liga: 'Okręgówka', okreg: 'Wrocław' },
    okregowka_walbrzych:       { liga: 'Okręgówka', okreg: 'Wałbrzych' },
    okregowka_legnica:         { liga: 'Okręgówka', okreg: 'Legnica' },
    okregowka_jelenia_gora:    { liga: 'Okręgówka', okreg: 'Jelenia Góra' },

    // A-KLASA
    a_wroclaw_gr1:             { liga: 'Klasa A', okreg: 'Wrocław', grupa: 'Gr. 1' },
    a_wroclaw_gr2:             { liga: 'Klasa A', okreg: 'Wrocław', grupa: 'Gr. 2' },
    a_wroclaw_gr3:             { liga: 'Klasa A', okreg: 'Wrocław', grupa: 'Gr. 3' },
    a_wroclaw_gr4:             { liga: 'Klasa A', okreg: 'Wrocław', grupa: 'Gr. 4' },
    a_walbrzych_gr1:           { liga: 'Klasa A', okreg: 'Wałbrzych', grupa: 'Gr. 1' },
    a_walbrzych_gr2:           { liga: 'Klasa A', okreg: 'Wałbrzych', grupa: 'Gr. 2' },
    a_walbrzych_gr3:           { liga: 'Klasa A', okreg: 'Wałbrzych', grupa: 'Gr. 3' },
    a_legnica_gr1:             { liga: 'Klasa A', okreg: 'Legnica', grupa: 'Gr. 1' },
    a_legnica_gr2:             { liga: 'Klasa A', okreg: 'Legnica', grupa: 'Gr. 2' },
    a_legnica_gr3:             { liga: 'Klasa A', okreg: 'Legnica', grupa: 'Gr. 3' },
    a_jelenia_gora_gr1:        { liga: 'Klasa A', okreg: 'Jelenia Góra', grupa: 'Gr. 1' },
    a_jelenia_gora_gr2:        { liga: 'Klasa A', okreg: 'Jelenia Góra', grupa: 'Gr. 2' },
    a_jelenia_gora_gr3:        { liga: 'Klasa A', okreg: 'Jelenia Góra', grupa: 'Gr. 3' },

    // B-KLASA 
    b_walbrzych_gr1:           { liga: 'Klasa B', okreg: 'Wałbrzych', grupa: 'Gr. 1' },
    b_walbrzych_gr2:           { liga: 'Klasa B', okreg: 'Wałbrzych', grupa: 'Gr. 2' },
    b_walbrzych_gr3:           { liga: 'Klasa B', okreg: 'Wałbrzych', grupa: 'Gr. 3' },
    b_walbrzych_gr4:           { liga: 'Klasa B', okreg: 'Wałbrzych', grupa: 'Gr. 4' },
    b_legnica_gr1:             { liga: 'Klasa B', okreg: 'Legnica', grupa: 'Gr. 1' },
    b_legnica_gr2:             { liga: 'Klasa B', okreg: 'Legnica', grupa: 'Gr. 2' },
    b_legnica_gr3:             { liga: 'Klasa B', okreg: 'Legnica', grupa: 'Gr. 3' },
    b_legnica_gr4:             { liga: 'Klasa B', okreg: 'Legnica', grupa: 'Gr. 4' },
    b_legnica_gr5:             { liga: 'Klasa B', okreg: 'Legnica', grupa: 'Gr. 5' },
    b_jelenia_gora_gr1:        { liga: 'Klasa B', okreg: 'Jelenia Góra', grupa: 'Gr. 1' },
    b_jelenia_gora_gr2:        { liga: 'Klasa B', okreg: 'Jelenia Góra', grupa: 'Gr. 2' },
    b_jelenia_gora_gr3:        { liga: 'Klasa B', okreg: 'Jelenia Góra', grupa: 'Gr. 3' },
    b_jelenia_gora_gr4:        { liga: 'Klasa B', okreg: 'Jelenia Góra', grupa: 'Gr. 4' },
    b_jelenia_gora_gr5:        { liga: 'Klasa B', okreg: 'Jelenia Góra', grupa: 'Gr. 5' },

    // IV LIGA
    iv_liga_dolnoslaskie:      { liga: 'IV', okreg: 'Dolny Śląsk' },

    // EKSTRAKLASA
    ekstraklasa:               { liga: 'Ekstraklasa' }
  };

  $.each(buttonConfig, function (id, value) {
    $('#' + id).on('click', function () {
      let url = `results.html?liga=${encodeURIComponent(value.liga)}`;
      if (value.okreg) {
        url += `&okreg=${encodeURIComponent(value.okreg)}`;
      }
      if (value.grupa) {
        url += `&grupa=${encodeURIComponent(value.grupa)}`;
      }
      window.location.href = url;
    });
  });
});

