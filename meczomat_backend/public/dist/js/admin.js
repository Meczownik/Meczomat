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
      const res = await fetch(`${API_BASE}/matches`);
      if (!res.ok) throw new Error('Błąd pobierania meczów');

      const matches = await res.json();
      const match = matches.find(
        m =>
          (m.homeTeam.id === team1Id && m.awayTeam.id === team2Id) ||
          (m.homeTeam.id === team2Id && m.awayTeam.id === team1Id)
      );

      if (!match) {
        alert('Nie znaleziono meczu między tymi drużynami!');
        return;
      }

      const updateRes = await fetch(`${API_BASE}/matches/${match.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeGoals: score1,
          awayGoals: score2,
        }),
      });

      if (updateRes.ok) {
        alert('Wynik zmieniony pomyślnie!');
        form.trigger('reset');
        team1Input.removeData('teamId');
        team2Input.removeData('teamId');
      } else {
        const err = await updateRes.json();
        alert(`Błąd: ${err.message || 'Nie udało się zapisać wyniku'}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Błąd połączenia z serwerem.');
    }
  });
});
