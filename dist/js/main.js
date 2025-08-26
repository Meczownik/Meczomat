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

// Wyszukiwarka drużyn section search w jquery
const API_BASE = 'http://localhost:3000';

$(document).ready(function () {
  const input = $('#teamSearchInput');
  const errorDiv = $('#teamSearchError');
  const autocompleteList = $('#autocompleteList');

  function hideAutocomplete() {
    autocompleteList.empty().hide();
  }

  input.on('input', async function () {
    const name = input.val().trim();
    errorDiv.text('');
    hideAutocomplete();

    if (!name) return;

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
            <li class="autocomplete-item">
              <strong>${team.name}</strong>}
            </li>
          `);

          item.on('click', () => {
            window.location.href = `/team_results.html?id=${team.id}`;
          });

          autocompleteList.append(item);
        });
        autocompleteList.show();
      }
    } catch (err) {
      console.error(err);
      errorDiv.text('Błąd połączenia z serwerem.');
    }
  });

  input.on('keydown', function (e) {
    if ((e.which === 13 || e.key === 'Enter') && autocompleteList.children().length > 0) {
      e.preventDefault();
      autocompleteList.children().first().click();
    }
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#teamSearchInput, #autocompleteList').length) {
      hideAutocomplete();
    }
  });
});


//obsługa przycisków do results.html

$(document).ready(function() {
  $('.group-btn').on('click', async function() {
    const groupId = $(this).data('group-id');
    const container = $('#groupTeamsContainer');
    container.empty();

    try {
      const res = await fetch(`http://localhost:3000/group/${groupId}`);
      if (!res.ok) throw new Error('Błąd pobierania grupy');

      const group = await res.json();

      container.append(`<h2>${group.league} - ${group.district} - ${group.name}</h2>`);
      const ul = $('<ul></ul>');
      group.teams.forEach(team => {
        ul.append(`<li>${team.name}</li>`);
      });
      container.append(ul);
    } catch(err) {
      console.error(err);
      container.text('Nie udało się pobrać drużyn dla tej grupy.');
    }
  });
});

$('.group-btn').on('click', function() {
    const groupId = $(this).data('group-id');
});

