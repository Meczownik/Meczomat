$(function () {
  const params = new URLSearchParams(window.location.search);
  const groupId = params.get("groupId"); 
  const $tbody = $(".league-table tbody");

  if (!groupId) {
    console.warn("Brakuje parametru groupId w URL.");
    return;
  }

  $.getJSON(`http://localhost:3000/group/details/${groupId}`)
    .done(group => {
      $('#leagueName').text(group.league);
      $('#regionName').text(group.district);
      $('#groupName').text(group.groupName);
    })
    .fail(() => {
      console.warn('Nie udało się pobrać szczegółów grupy');
    });



    
  $.getJSON(`http://localhost:3000/standings/${groupId}`)
    .done(data => {
      if (!data.length) {
        $tbody.html("<tr><td colspan='7'>Brak wyników dla tej grupy.</td></tr>");
        return;
      }
      renderTable(data);
    })
    .fail(() => {
      $tbody.html("<tr><td colspan='7'>Błąd podczas pobierania danych z serwera.</td></tr>");
    });

  function renderTable(data) {
    const rows = data.map(s => `
      <tr class="team-row" data-id="${s.team.id}">
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
