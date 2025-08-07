<<<<<<< HEAD
$(document).ready(function () {
  const teamid = getTeamIdFromUrl();
  if (teamid) {
    fetchTeamById(teamid);
  }

  function getTeamIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  function fetchTeamById(id) {
    $.ajax({
      url: `http://localhost:3000/teams/${id}`, 
      method: 'GET',
      success: function (team) {
        displayTeamData(team);
      },
      error: function () {
        $('#teamResultsBody').html(
          `<tr><td colspan="5" style="color:red">Nie znaleziono drużyny o ID ${id}</td></tr>`
        );
      }
    });
  }

  function displayTeamData(team) {
  const infoHtml = `
    <div class="team-summary" style="color: white; margin-bottom: 20px;">
      <h2>${team.Nazwa || 'Nieznana drużyna'}</h2>
      <p><strong>Okręg:</strong> ${team.okreg} | <strong>Liga:</strong> ${team.liga}| <strong>Grupa:</strong> ${team.grupa || 'brak'}</p> 
      
      <p><strong>Punkty:</strong> ${team.punkty ?? '-'} | <strong>Rozegrane mecze</strong> ${team.rozegrane_mecze ?? '-'} | <strong>Bilans bramkowy:</strong> ${team.strzelone_bramki ?? '-'}-${team.stracone_bramki ?? '-'}</p>
    </div>
  `;
  $('#teamInfo').html(infoHtml);

  const row = `
    <tr>
      <td>${team.data || 'brak'}</td>
      <td>${team.Nazwa || 'brak'}</td>
      <td>${team.wynik || '-'}</td>
      <td>${team.rywal || '-'}</td>
      <td>${team.liga || 'brak'}</td>
    </tr>
  `;
  $('#teamResultsBody').html(row);
}

});
=======
$(document).ready(function () {
  const teamid = getTeamIdFromUrl();
  if (teamid) {
    fetchTeamById(teamid);
  }

  function getTeamIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  function fetchTeamById(id) {
    $.ajax({
      url: `http://localhost:3000/teams/${id}`,
      method: 'GET',
      success: function (team) {
        displayTeamData(team);
        fetchRelatedTeams(team.okreg, team.liga, team.grupa); 
      },
      error: function () {
        $('#teamResultsBody').html(
          `<tr><td colspan="5" style="color:red">Nie znaleziono drużyny o ID ${id}</td></tr>`
        );
      }
    });
  }

  function displayTeamData(team) {
    const infoHtml = `
      <div class="team-summary" style="color: white; margin-bottom: 20px;">
        <h2>${team.Nazwa || 'Nieznana drużyna'}</h2>
        <p><strong>Okręg:</strong> ${team.okreg} | <strong>Liga:</strong> ${team.liga} | <strong>Grupa:</strong> ${team.grupa || 'brak'}</p> 
        <p><strong>Punkty:</strong> ${team.punkty ?? '-'} | <strong>Rozegrane mecze:</strong> ${team.rozegrane_mecze ?? '-'} | <strong>Bilans bramkowy:</strong> ${team.strzelone_bramki ?? '-'}-${team.stracone_bramki ?? '-'}</p>
      </div>
    `;
    $('#teamInfo').html(infoHtml);
  }

 function fetchRelatedTeams(okreg, liga, grupa) {
  $.ajax({
    url: `http://localhost:3000/teams/filter-extended?liga=${encodeURIComponent(liga)}&okreg=${encodeURIComponent(okreg)}&grupa=${encodeURIComponent(grupa)}`,
    method: 'GET',
    success: function (teams) {
      const tableBody = $('.results_table .league-table tbody');
      tableBody.empty();

      if (!teams.length) {
        tableBody.append('<tr><td colspan="6">Brak drużyn w tej samej grupie.</td></tr>');
        return;
      }

      teams.sort((a, b) => (b.punkty ?? 0) - (a.punkty ?? 0));

      const rows = teams.map((team, i) => `
        <tr class="clickable-row" data-id="${team.id}">
          <td>${i + 1}</td>
          <td>${team.Nazwa}</td>
          <td>${team.liga}</td>
          <td>${team.okreg}</td>
          <td>${team.punkty ?? '-'}</td>
          <td>${team.rozegrane_mecze ?? '-'}</td>
        </tr>
      `).join('');

      tableBody.html(rows);
    },
    error: function () {
      $('.results_table .league-table tbody').html('<tr><td colspan="6" style="color:red">Błąd podczas ładowania danych tabeli wyników.</td></tr>');
    }
  });
}

$('.results_table .league-table tbody').on('click', '.clickable-row', function() {
  const teamId = $(this).data('id');
  if (teamId) {
    window.location.href = `team_results.html?id=${teamId}`;
  }
});



// wyszukiwarka sekcja 

const $input = $('#teamSearchInput');
const $autocompleteList = $('#autocompleteList');
const $error = $('#teamSearchError');

function hideAutocomplete() {
  $autocompleteList.empty().hide();
}

$input.on('input', async function () {
  const query = $input.val().trim();
  $error.text('');
  $autocompleteList.empty().hide();

  if (!query) return;

  try {
    const res = await fetch(`http://localhost:3000/teams/search?name=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!res.ok) {
      $error.text(data.message || 'Błąd podczas wyszukiwania.');
      return;
    }

    if (data.length > 0) {
      data.forEach(team => {
        const item = $(`
          <li class="autocomplete-item" style="padding: 8px 12px; cursor: pointer;">
            <strong>${team.Nazwa}</strong> - ${team.liga} - ${team.okreg}
          </li>
        `);

        item.on('click', () => {
          window.location.href = `/team_results.html?id=${team.id}`;
        });

        $autocompleteList.append(item);
      });

      $autocompleteList.show();
    } else {
      hideAutocomplete();
    }
  } catch (err) {
    console.error(err);
    $error.text('Błąd połączenia z serwerem.');
  }
});

$input.on('keydown', function (e) {
  if ((e.which === 13 || e.key === 'Enter') && $autocompleteList.children().length > 0) {
    e.preventDefault();
    $autocompleteList.children().first().click();
  }
});

$(document).on('click', function (e) {
  if (!$(e.target).closest('#teamSearchInput, #autocompleteList').length) {
    hideAutocomplete();
  }
});


});



>>>>>>> refs/remotes/origin/feature/results-integration
