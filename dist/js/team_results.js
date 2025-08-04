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
