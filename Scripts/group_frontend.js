// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7xlna3AUhnAQ-ucRWyJkbP-LHgwiXHq0",
  authDomain: "fifa2022-1f27d.firebaseapp.com",
  databaseURL: "https://fifa2022-1f27d-default-rtdb.firebaseio.com",
  projectId: "fifa2022-1f27d",
  storageBucket: "fifa2022-1f27d.appspot.com",
  messagingSenderId: "970965857308",
  appId: "1:970965857308:web:a9ce29ca1d40e299b81bd9",
  measurementId: "G-L1LYGV2C12",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to create group HTML elements
function createGroupElement(groupName) {
  const groupContainer = document.createElement("div");
  groupContainer.classList.add("group");

  const groupHeader = document.createElement("div");
  groupHeader.classList.add("group-header");
  groupHeader.setAttribute("data-group", groupName);
  groupHeader.textContent = groupName;

  const teamHeaders = document.createElement("div");
  teamHeaders.classList.add("team-headers");

  const headerElements = [
    '<span class="flag-placeholder"></span>',
    '<span class="team-name-placeholder"></span>',
    '<span class="qualified-placeholder"></span>',
    '<span class="position-placeholder"></span>',
    '<span class="matches-played">P</span>',
    '<span class="wins">W</span>',
    '<span class="draws">D</span>',
    '<span class="losses">L</span>',
    '<span class="goal-difference">GD</span>',
    '<span class="points">Pts</span>',
  ];

  teamHeaders.innerHTML = headerElements.join("");

  groupContainer.appendChild(groupHeader);
  groupContainer.appendChild(teamHeaders);

  return groupContainer;
}

// Function to populate team data
function populateTeamData(groupName) {
  // Reference to the group in the database
  const groupRef = database.ref("GroupTable/" + groupName);

  // Get the data for the group
  groupRef.once("value", function (snapshot) {
    // Get the team data
    let teams = snapshot.val();

    // Sort teams based on points, goal difference, and goals scored in decreasing order
    teams = Object.entries(teams).sort((a, b) => {
      const [keyA, teamA] = a;
      const [keyB, teamB] = b;

      // Sort by points in descending order
      if (teamB.Pts !== teamA.Pts) {
        return teamB.Pts - teamA.Pts;
      }

      // If points are equal, sort by goal difference (PlusMinus) in descending order
      if (teamB.PlusMinus !== teamA.PlusMinus) {
        return teamB.PlusMinus - teamA.PlusMinus;
      }

      // If goal difference is also equal, sort by goals scored (GA) in descending order
      const teamAGA = teamA.MP * 3 - teamA.Pts;
      const teamBGA = teamB.MP * 3 - teamB.Pts;
      return teamBGA - teamAGA;
    });

    // Reference to the group container in the HTML
    const groupContainer = document.querySelector(
      `.group-header[data-group="${groupName}"]`
    ).parentElement;

    // Loop through each team and populate the HTML
    for (const [index, [key, team]] of teams.entries()) {
      const teamContainer = document.createElement("div");
      teamContainer.classList.add("team");

      // Mark only the first two teams as "qualified"
      const qualifiedSpan =
        index < 2 ? '<span class="qualified">Q</span>' : "<span></span>";

      // Populate team data
      teamContainer.innerHTML = `
        <span class="index">${index + 1}</span>
        <div class="flag flag-${team.abr.toLowerCase()}"></div>
        <span class="country-name">${team.abr}</span>
        ${qualifiedSpan}
        <span class="matches-played">${team.MP}</span>
        <span class="wins">${team.W}</span>
        <span class="draws">${team.D}</span>
        <span class="losses">${team.L}</span>
        <span class="goal-difference">${team.PlusMinus}</span>
        <span class="points">${team.Pts}</span>
      `;

      // Append the team container to the group container
      groupContainer.appendChild(teamContainer);
    }
  });
}

// Call the function for each group
window.addEventListener("DOMContentLoaded", function () {
  const groupsContainer = document.querySelector(".groups-container");

  const groups = [
    "Group A",
    "Group B",
    "Group C",
    "Group D",
    "Group E",
    "Group F",
    "Group G",
    "Group H",
  ];

  for (const group of groups) {
    const groupElement = createGroupElement(group);
    groupsContainer.appendChild(groupElement);
    populateTeamData(group);
  }
});
