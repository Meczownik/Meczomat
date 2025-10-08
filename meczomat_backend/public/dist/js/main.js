$(document).ready(function(){
    $(".info-box").hide();
});


//------------------------------------------------------------------------------


const API_BASE = '/';

$(document).ready(function () {

  const input = $('#teamSearchInput');
  const errorDiv = $('#teamSearchError');
  const autocompleteList = $('#autocompleteList');

  function hideAutocomplete() {
    autocompleteList.empty().hide();
  }

input.on('input', async function () {
    const name = input.val().trim();
    console.log('=== WYSZUKIWANIE ROZPOCZĘTE ===');
    console.log('Szukana fraza:', name);
    
    errorDiv.text('');
    hideAutocomplete();

    if (!name) {
        console.log('Pusta fraza - pomijam');
        return;
    }
    
    try {
        console.log('Wysyłam żądanie do API...');
        const res = await fetch(`/teams/search?name=${encodeURIComponent(name)}`);
        
        console.log('Otrzymano odpowiedź, status:', res.status);
        
        if (!res.ok) {
            console.error('Błąd HTTP:', res.status);
            throw new Error('Błąd podczas wyszukiwania');
        }
        
        const data = await res.json();
        console.log('Otrzymane dane z API:', data);
        console.log('Liczba znalezionych drużyn:', data.length);
        
        if (data.length === 0) {
            console.log('Brak wyników');
            return;
        }
        
        console.log('Tworzenie listy autocomplete...');
        
        // Wyczyść poprzednie wyniki
        autocompleteList.empty();
        
        data.forEach((team, index) => {
            console.log(`Dodaję drużynę ${index + 1}:`, team.name, '(ID:', team.id + ')');
            
            const item = $(`
                <li class="autocomplete-item" style="cursor:pointer; padding: 10px; border-bottom: 1px solid #ccc; background: white;">
                    <strong>${team.name}</strong>
                </li>
            `);
            
            item.on('click', () => {
                console.log('=== KLIKNIĘTO DRUŻYNĘ ===');
                console.log('Przechodzę do:', `/team_results.html?id=${team.id}`);
                console.log('Nazwa drużyny:', team.name);
                window.location.href = `/team_results.html?id=${team.id}`;
            });
            
            autocompleteList.append(item);
        });

        console.log('Pokazuję listę autocomplete');
        autocompleteList.show();
        console.log('Czy lista jest widoczna?', autocompleteList.is(':visible'));
        
    } catch (err) {
        console.error('=== BŁĄD WYSZUKIWANIA ===');
        console.error('Szczegóły błędu:', err);
        console.error('Komunikat:', err.message);
        
        errorDiv.text('Błąd połączenia z serwerem.');
    }
});

  input.on('keydown', function (e) {
    if (e.key === 'Enter' && autocompleteList.children().length > 0) {
      e.preventDefault();
      autocompleteList.children().first().click();
    }
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#teamSearchInput, #autocompleteList').length) {
      hideAutocomplete();
    }
  });

  input.on('focus', hideAutocomplete); 

  $('.group-btn').on('click', async function () {
    const groupId = $(this).data('group-id');
    const container = $('#groupTeamsContainer');
    container.empty();

    try {
      const res = await fetch(`${API_BASE}/group/${groupId}`);
      if (!res.ok) throw new Error('Błąd pobierania grupy');

      const group = await res.json();

      container.append(`<h2>${group.league} - ${group.district} - ${group.name}</h2>`);

      const ul = $('<ul></ul>');
      group.teams.forEach(({ name, id }) => {
        const li = $(`<li class="team-link" style="cursor:pointer;" data-id="${id}">${name}</li>`);
        li.on('click', () => {
          window.location.href = `/team_results.html?id=${id}`;
        });
        ul.append(li);
      });

      container.append(ul);
    } catch (err) {
      console.error(err);
      container.text('Nie udało się pobrać drużyn dla tej grupy.');
    }
  });
});

//------------------------------------------------------------------------------



document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownBtn.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Opcjonalnie: zamknij menu po kliknięciu poza nim
    document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollToShortcutsBtn = document.querySelector('a[href="#news"]');
    const youtubeSection = document.querySelector('.youtube-section');

    scrollToShortcutsBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Zapobiega domyślnemu zachowaniu linku
        youtubeSection.scrollIntoView({ behavior: 'smooth' }); // Płynne przewijanie
    });
});

$('.group-btn').on('click', function() {
    const groupId = $(this).data('group-id');
});

$(document).ready(function () {
  $('#lowerLeaguesBtn').on('click', function (e) {
    e.preventDefault();
    const $target = $('#map-container');
    if ($target.length) {
      $('html, body').animate({
        scrollTop: $target.offset().top - 300// opcjonalnie odejmij padding/header
      }, 200); // czas animacji w ms
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navCenter = document.querySelector('.nav__center');
    const navRight = document.querySelector('.nav__right');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navCenter.classList.toggle('active');
        navRight.classList.toggle('active');
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1222) {
            hamburgerMenu.classList.remove('active');
            navCenter.classList.remove('active');
            navRight.classList.remove('active');
        }
    });
});
