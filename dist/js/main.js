$(document).ready(function(){
    $(".info-box").hide();
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
    const $target = $('.map-section');
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
});