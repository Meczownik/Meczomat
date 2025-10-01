$(function () {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get("id");

  if (!teamId) return console.error("Brak ID drużyny w URL");

  const $leagueTbody = $(".league-table tbody");
  const $matchesTbody = $("#teamResultsBody");

  const API_BASE = '/';

  const teamRequest = $.getJSON(`${API_BASE}/teams/${teamId}`);
  const matchesRequest = $.getJSON(`${API_BASE}/matches/team/${teamId}`);

  $.when(teamRequest, matchesRequest)
    .done(function (teamResp, matchesResp) {
      const team = teamResp[0];      
      const matches = matchesResp[0]; 

      $('#teamName').text(team.name || '-');
      $('#teamLiga').text(team.group?.league || '-');
      $('#teamOkreg').text(team.group?.district || '-');
      $('#teamGrupa').text(team.group?.name || '-');

      if (team.group?.id) {
        $.getJSON(`${API_BASE}/standings/${team.group.id}`)
          .done(data => {
            if (data.length) {
              const rows = data.map((s, index) => `
                <tr class="team-row" data-id="${s.team.id}">
                  <td>${index + 1}</td>
                  <td>${s.team.name}</td>
                  <td>${s.points}</td>
                  <td>${s.goalsFor}</td>
                  <td>${s.goalsAgainst}</td>
                  <td>${s.goalDifference}</td>
                </tr>
              `).join('');
              $leagueTbody.html(rows);
            } else {
              $leagueTbody.html("<tr><td colspan='6'>Brak wyników dla tej grupy.</td></tr>");
            }
          })
          .fail(() => $leagueTbody.html("<tr><td colspan='6'>Błąd pobierania tabeli grupy</td></tr>"));
      }

      // Mecze 
      if (matches.length) {
        const rows = matches.map(m => {
          const team1 = m.homeTeam?.name || "-";
          const team2 = m.awayTeam?.name || "-";
          const wynik = (m.homeGoals != null && m.awayGoals != null)
            ? `${m.homeGoals} : ${m.awayGoals}`
            : "-";
          return `
            <tr>
              <td>${new Date(m.matchDate).toLocaleString("pl-PL", {
                day: "2-digit", month: "2-digit", year: "numeric",
                hour: "2-digit", minute: "2-digit"
              })}</td>
              <td>${team1}</td>
              <td>${wynik}</td>
              <td>${team2}</td>
            </tr>
          `;
        }).join('');
        $matchesTbody.html(rows);
      } else {
        $matchesTbody.html("<tr><td colspan='4'>Brak meczów dla tej drużyny.</td></tr>");
      }
    })
    .fail(function (teamErr, matchesErr) {
      console.error("Błąd w pobieraniu danych:", teamErr, matchesErr);
      $leagueTbody.html("<tr><td colspan='6'>Błąd pobierania danych drużyny</td></tr>");
      $matchesTbody.html("<tr><td colspan='4'>Błąd pobierania meczów</td></tr>");
    });

    $leagueTbody.on('click', '.team-row', function () {
  const newTeamId = $(this).data('id');
  if (newTeamId) {
    window.location.href = `team_results.html?id=${newTeamId}`;
  }
});

});
