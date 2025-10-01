$(function () {
  const params = new URLSearchParams(window.location.search);
  const groupId = params.get("groupId"); 
  const $tbody = $(".league-table tbody");

  if (!groupId) {
    console.warn("Brakuje parametru groupId w URL.");
    return;
  }

  const API_BASE = '/'; 

 
  const groupRequest = $.getJSON(`${API_BASE}/group/details/${groupId}`);
  const standingsRequest = $.getJSON(`${API_BASE}/standings/${groupId}`);

  $.when(groupRequest, standingsRequest)
    .done((groupResp, standingsResp) => {
      const group = groupResp[0];
      const standings = standingsResp[0];

      
      $('#leagueName').text(group.league || '-');
      $('#regionName').text(group.district || '-');
      $('#groupName').text(group.groupName || '-');

      if (standings && standings.length) {
        const rows = standings.map((s, index) => `
          <tr class="team-row" data-id="${s.team.id}">
            <td>${index + 1}</td>
            <td>${s.team.name}</td>
            <td>${s.points}</td>
            <td>${s.goalsFor}</td>
            <td>${s.goalsAgainst}</td>
            <td>${s.goalDifference}</td>
          </tr>
        `).join('');
        $tbody.html(rows);
      } else {
        $tbody.html("<tr><td colspan='6'>Brak wyników dla tej grupy.</td></tr>");
      }
    })
    .fail((groupErr, standingsErr) => {
      console.error("Błąd pobierania danych grupy lub tabeli:", groupErr, standingsErr);
      $tbody.html("<tr><td colspan='6'>Błąd pobierania danych z serwera.</td></tr>");
    });

  // Kliknięcie na wiersz drużyny -> przejście do team_results
  $tbody.on('click', '.team-row', function () {
    const teamId = $(this).data('id');
    if (teamId) {
      window.location.href = `team_results.html?id=${teamId}`;
    }
  });
});
