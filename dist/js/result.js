let loadedTeamsR = [];

$(function () {
  const params = new URLSearchParams(window.location.search);
  const liga = params.get("liga")?.trim();
  const okreg = params.get("okreg")?.trim();
  const grupa = params.get("grupa")?.trim();

  const $tbody = $(".league-table tbody");
  const $input = $('#teamSearchInput');
  const $error = $('#teamSearchError');
  const $resultsSection2 = $('#searchResults2');
  const $autocompleteList = $('#autocompleteList'); 

  if (!liga || !okreg || !grupa) {
    $tbody.html("<tr><td colspan='6'>Brakuje parametrów w URL (liga, okręg lub grupa).</td></tr>");
    return;
  }

  const fetchUrl = `http://localhost:3000/teams/filter-extended?liga=${encodeURIComponent(liga)}&okreg=${encodeURIComponent(okreg)}&grupa=${encodeURIComponent(grupa)}`;

  $.getJSON(fetchUrl)
    .done(teams => {
      console.log('Pobrane drużyny:', teams);
      if (!teams.length) {
        $tbody.html("<tr><td colspan='6'>Brak drużyn dla podanych parametrów.</td></tr>");
        return;
      }

      loadedTeamsR = teams;
      renderTable(teams);
    })
    .fail(() => {
      $tbody.html("<tr><td colspan='6'>Błąd podczas pobierania danych z serwera.</td></tr>");
    });



    
 function renderTable(teams) {
  const rows = teams.map((team, i) => `
    <tr class="team-row" data-id="${team.id ?? team.Id}">
      <td>${i + 1}</td>
      <td>${team.Nazwa}</td>
      <td>${team.liga}</td>
      <td>${team.okreg}</td>
      <td>${team.punkty ?? '-'}</td>
      <td>${team.rozegrane_mecze ?? '-'}</td>
    </tr>`).join('');
  $tbody.html(rows);
}

$tbody.on('click', '.team-row', function () {
  const teamid = $(this).data('id');
  if (teamid) {
    window.location.href = `team_results.html?id=${teamid}`;
  }
});

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
          <li class="autocomplete-item" style="cursor:pointer;">
            <strong>${team.Nazwa}</strong> - ${team.liga} - ${team.okreg}
          </li>
        `);

        item.on('click', () => {
          window.location.href = `/team_results.html?id=${team.id}`;
        });

        $autocompleteList.append(item);
      });

      $autocompleteList.show();
      $resultsSection2?.show(); // opcjonalnie
    } else {
      $autocompleteList.hide();
      $resultsSection2?.hide();
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
