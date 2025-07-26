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
  const $resultsList2 = $('#teamResultsList2');

  if (!liga || !okreg || !grupa) {
    $tbody.html("<tr><td colspan='6'>Brakuje parametrów w URL (liga, okręg lub grupa).</td></tr>");
    return;
  }

  const fetchUrl = `http://localhost:3000/teams/filter-extended?liga=${encodeURIComponent(liga)}&okreg=${encodeURIComponent(okreg)}&grupa=${encodeURIComponent(grupa)}`;

  $.getJSON(fetchUrl)
    .done(teams => {
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
      <tr>
        <td>${i + 1}</td>
        <td>${team.nazwaDruzyny}</td>
        <td>${team.liga}</td>
        <td>${team.okreg}</td>
        <td>${team.punkty ?? '-'}</td>
        <td>${team.roznica ?? '-'}</td>
      </tr>`).join('');
    $tbody.html(rows);
  }



  function searchTeams() {
  const query = $input.val().trim().toLowerCase();
  $error.text('');

  if (!query) {
    renderTable(loadedTeamsR);
    return;
  }

  if (!loadedTeamsR.length) {
    $error.text('Brak załadowanych drużyn do przeszukania.');
    return;
  }

  const filtered = loadedTeamsR.filter(team =>
    team.nazwaDruzyny.toLowerCase().includes(query)
  );

  if (!filtered.length) {
    $error.text('Nie znaleziono takiej drużyny w wybranej lidze, okręgu i grupie.');
    return;
  }

  renderTable(filtered);
}

$input.on('keypress', function (e) {
  if (e.which === 13) {
    searchTeams();
  }
});


  $('#teamSearchBtn').click(searchTeams);
  $input.on('keydown', e => {
    if (e.key === 'Enter') searchTeams();
  });
});
