document.addEventListener("DOMContentLoaded", () => {
  const teams = [
    { name: "England", abr: "ENG", flagClass: "flag-eng" },
    { name: "Senegal", abr: "SEN", flagClass: "flag-sen" },
    { name: "France", abr: "FRA", flagClass: "flag-fra" },
    { name: "Poland", abr: "POL", flagClass: "flag-pol" },
    { name: "Morocco", abr: "MAR", flagClass: "flag-mar" },
    { name: "Spain", abr: "ESP", flagClass: "flag-esp" },
    { name: "Portugal", abr: "POR", flagClass: "flag-por" },
    { name: "Switzerland", abr: "SUI", flagClass: "flag-sui" },
    { name: "Netherlands", abr: "NED", flagClass: "flag-ned" },
    { name: "USA", abr: "USA", flagClass: "flag-usa" },
    { name: "Argentina", abr: "ARG", flagClass: "flag-arg", link:"argentina-player-img.html" },
    { name: "Australia", abr: "AUS", flagClass: "flag-aus",link:"australia-player-img.html" },
    { name: "Japan", abr: "JPN", flagClass: "flag-jpn" },
    { name: "Croatia", abr: "CRO", flagClass: "flag-cro" },
    { name: "Brazil", abr: "BRA", flagClass: "flag-bra" },
    { name: "South Korea", abr: "KOR", flagClass: "flag-kor" },
    { name: "Ecuador", abr: "ECU", flagClass: "flag-ecu" },
    { name: "Qatar", abr: "QAT", flagClass: "flag-qat" },
    { name: "Iran", abr: "IRN", flagClass: "flag-irn" },
    { name: "Wales", abr: "WAL", flagClass: "flag-wal" },
    { name: "Mexico", abr: "MEX", flagClass: "flag-mex" },
    { name: "Saudi Arabia", abr: "KSA", flagClass: "flag-ksa" },
    { name: "Tunisia", abr: "TUN", flagClass: "flag-tun" },
    { name: "Denmark", abr: "DEN", flagClass: "flag-den" },
    { name: "Germany", abr: "GER", flagClass: "flag-ger" },
    { name: "Costa Rica", abr: "CRC", flagClass: "flag-crc" },
    { name: "Belgium", abr: "BEL", flagClass: "flag-bel" },
    { name: "Canada", abr: "CAN", flagClass: "flag-can" },
    { name: "Cameroon", abr: "CMR", flagClass: "flag-cmr" },
    { name: "Serbia", abr: "SRB", flagClass: "flag-srb" },
    { name: "Uruguay", abr: "URU", flagClass: "flag-uru" },
    { name: "Ghana", abr: "GHA", flagClass: "flag-gha" },
  ];

  const teamsContainer = document.getElementById("teams-container");

  if (teamsContainer) {
    // Sort the teams array by name in ascending order
    teams.sort((a, b) => a.name.localeCompare(b.name));
    

    teams.forEach((team) => {
      const teamDiv = document.createElement("div");
      teamDiv.className = "team";
      teamDiv.id = `team-${team.abr.toLowerCase()}`;

      const flagDiv = document.createElement("div");
      flagDiv.className = `flag ${team.flagClass}`;
      teamDiv.appendChild(flagDiv);

      const nameDiv = document.createElement("div");
      nameDiv.className = "team-name";
      nameDiv.textContent = team.name;
      teamDiv.appendChild(nameDiv);

      const abrDiv = document.createElement("div");
      abrDiv.className = "team-abr";
      abrDiv.textContent = `(${team.abr})`;
      teamDiv.appendChild(abrDiv);

      teamsContainer.appendChild(teamDiv);

      // Add click event listener for redirection
      if (team.link) {
        teamDiv.addEventListener("click", () => {
          window.location.href = team.link;
        });
      }
    });
  } else {
    console.error("teams-container element not found");
  }
});
