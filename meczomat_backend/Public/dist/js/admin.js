 const API_BASE = 'https://meczomat.onrender.com';

$(document).ready(function () {
  const form = $('#matchResultForm');
  const team1Input = $('#team1');
  const team2Input = $('#team2');
  const score1Input = $('#score1');
  const score2Input = $('#score2');

  function setupAutocomplete(input) {
    const list = $('<ul class="admin-autocomplete-list"></ul>').hide();
    input.after(list);

    input.on('input', async function () {
      const query = input.val().trim();
      list.empty().hide();
      input.removeData('teamId');

      if (!query) return;

      try {
        const res = await fetch(`${API_BASE}/teams/search?name=${encodeURIComponent(query)}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Błąd serwera');
        }

        const data = await res.json();
        if (!data || data.length === 0) return;

        data.forEach(team => {
          const item = $(`<li class="autocomplete-item" style="cursor:pointer;">${team.name}</li>`);
          item.on('click', () => {
            input.val(team.name);
            input.data('teamId', team.id);
            list.empty().hide();
          });
          list.append(item);
        });

        list.show();
      } catch (err) {
        console.error(err);
        alert(err.message || 'Błąd połączenia z serwerem.');
      }
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest(input).length) {
        list.empty().hide();
      }
    });
  }

  setupAutocomplete(team1Input);
  setupAutocomplete(team2Input);



  //------------------------------------------- sekcja akutalizacji meczu
form.on('submit', async function (e) {
    e.preventDefault();

    const team1Id = team1Input.data('teamId');
    const team2Id = team2Input.data('teamId');
    const score1 = Number(score1Input.val());
    const score2 = Number(score2Input.val());

    if (!team1Id || !team2Id) {
        alert('Musisz wybrać drużyny z listy!');
        return;
    }

    try {
        console.log('Pobieranie meczów...');
        const res = await fetch(`${API_BASE}/matches`);
        
        console.log('Status odpowiedzi:', res.status);
        
        // Sprawdź czy to JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error('Otrzymano HTML zamiast JSON:', text.substring(0, 200));
            throw new Error('Serwer zwrócił stronę HTML zamiast danych JSON');
        }
        
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Błąd pobierania meczów');
        }

        const matches = await res.json();
        console.log('Otrzymane mecze:', matches);
        
        // ... reszta kodu

    } catch (err) {
        console.error('Błąd:', err);
        alert('Błąd: ' + err.message);
    }
});
});
