$(function () {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get("id");
  const $tbody = $(".league-table tbody");

  if (!teamId) {
    $tbody.html("<tr><td colspan='6'>Brakuje parametru id drużyny w URL.</td></tr>");
    return;
  }

  $.getJSON(`http://localhost:3000/teams/${teamId}`)
    .done(team => {
      if (!team) {
        $tbody.html(`<tr><td colspan='6'>Nie znaleziono drużyny o ID ${teamId}</td></tr>`);
        return;
      }

      $('#teamName').text(team.name || '-');
      $('#teamLiga').text(team.group?.league || '-');
      $('#teamOkreg').text(team.group?.district || '-');
      $('#teamGrupa').text(team.group?.name || '-');


      const groupId = team.group?.id;

      if (!groupId) {
        $tbody.html("<tr><td colspan='6'>Nie znaleziono grupy dla tej drużyny.</td></tr>");
        return;
      }

    
      $.getJSON(`http://localhost:3000/standings/${groupId}`)
        .done(data => {
          if (!data.length) {
            $tbody.html("<tr><td colspan='6'>Brak wyników dla tej grupy.</td></tr>");
            return;
          }
          renderTable(data);
        })
        .fail(() => {
          $tbody.html("<tr><td colspan='6'>Błąd podczas pobierania danych z serwera.</td></tr>");
        });

    })
    .fail(() => {
      $tbody.html(`<tr><td colspan='6'>Błąd podczas pobierania danych drużyny o ID ${teamId}</td></tr>`);
    });

  function renderTable(data) {
  const rows = data.map((s, index) => `
    <tr class="team-row" data-id="${s.team.id}">
      <td>${index + 1}</td>   <!-- tutaj numer miejsca -->
      <td>${s.team.name}</td>
      <td>${s.points}</td>
      <td>${s.goalsFor}</td>
      <td>${s.goalsAgainst}</td>
      <td>${s.goalDifference}</td>
    </tr>
  `).join('');
  $tbody.html(rows);
}

  $tbody.on('click', '.team-row', function () {
    const teamId = $(this).data('id');
    if (teamId) {
      window.location.href = `team_results.html?id=${teamId}`;
    }
  });
});



//Tabela z meczami danej drużyny 
$(function () {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get("id");
  const $tbody = $("#teamResultsBody");

  if (!teamId) {
    $tbody.html("<tr><td colspan='4'>Brakuje parametru id drużyny w URL.</td></tr>");
    return;
  }

  $.getJSON(`http://localhost:3000/matches/team/${teamId}`)
    .done(matches => {
      console.log(matches);

      if (!matches || !matches.length) {
        $tbody.html("<tr><td colspan='4'>Brak meczów dla tej drużyny.</td></tr>");
        return;
      }

      const rows = matches.map(m => {
      const team1 = m.homeTeam?.name || "-";
      const team2 = m.awayTeam?.name || "-";
      const wynik = (m.homeGoals != null && m.awayGoals != null)
        ? `${m.homeGoals} : ${m.awayGoals}`
        : "-";

      return `
      <tr>
        <td>${
          new Date(m.matchDate).toLocaleString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })
        }</td>
        <td>${team1}</td>
        <td>${wynik}</td>
        <td>${team2}</td>
      </tr>
      `;
      }).join("");

      $tbody.html(rows);
    })
    .fail(() => {
      $tbody.html("<tr><td colspan='4'>Błąd podczas pobierania meczów.</td></tr>");
    });
});


// Wyszukiwarka drużyn
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
          const league = team.group ? team.group?.league : '';
          const district = team.group ? team.group?.district : '';

          const item = $(`
          <li class="autocomplete-item">
            <strong>${team.name}</strong>
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
