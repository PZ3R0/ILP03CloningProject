
let currentImageIndex = 0;
const images = document.querySelectorAll('.main-content');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function updateCardDisplay(){
if (currentImageIndex === 0) {
    prevButton.style.display = 'none';
} else {
    prevButton.style.display = 'block';
}

// Hide the "next" button if the last card is displayed
if (currentImageIndex ===  images.length - 1) {
    nextButton.style.display = 'none';
} else {
    nextButton.style.display = 'block';
}

}
function changeImage(direction) {
images[currentImageIndex].classList.remove('active');
currentImageIndex += direction;
images[currentImageIndex].classList.add('active');
updateCardDisplay();
}

document.addEventListener("DOMContentLoaded", function() {
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const picsRef = firebase.database().ref('pics');
fetchData('imageconsol0', 'carousel-content0', 'left0', 'right0',3);
fetchData('imagesconsol1', 'carousel-content1', 'left1', 'right1',4);
fetchData('imageconsol2', 'carousel-content2', 'left2', 'right2',3);
fetchData('imageconsol4', 'carousel-content3', 'left3', 'right3',4);




picsRef.once('value').then(function(snapshot) {
var pics = snapshot.val();
// Update pics in the HTML
if (pics['THE FINAL']) {
document.getElementById('final-img').src = pics['THE FINAL'];
}
if (pics['THE KNOCKOUT STAGE']) {
document.getElementById('knockout-img').src = pics['THE KNOCKOUT STAGE'];
}
if (pics['THE GROUP STAGE']) {
document.getElementById('groupstage-img').src = pics['THE GROUP STAGE'];
}
if (pics['Lionel Messi']) {
    document.getElementById('Messi-img').src = pics['Lionel Messi'];
    }
if (pics['Kylian Mbappé']) {
    document.getElementById('Mbappé-img').src = pics['Kylian Mbappé'];
    }
});
console.log("Page loaded and ready.");



async function fetchData(refName, contentId, leftBtnId, rightBtnId,cardno) {
    const snapshot = await db.ref(refName).once('value');
    const data = snapshot.val();
    console.log("Page loaded and feach.");

    
    console.log(data);

    const carouselContent = document.getElementById(contentId);
    for (const [key, value] of Object.entries(data)) {
        const li = document.createElement('li');
        li.classList.add('card-small');
        li.innerHTML = `
            <div class="img-small">
                <img src="${value}" alt="${key}" >
            </div>
            <p class="landing-para">${key}</p>
        `;
        carouselContent.appendChild(li);
    }
    checkCarouselPosition(contentId, leftBtnId, rightBtnId,cardno);
}

function checkCarouselPosition(contentId, leftBtnId, rightBtnId,cardno) {
    const carouselSmall = document.getElementById(contentId);
    const leftButton = document.getElementById(leftBtnId);
    const rightButton = document.getElementById(rightBtnId);
    let currentIndex = 0;

    const updateButtonsVisibility = () => {
        const cards = carouselSmall.querySelectorAll('.card-small');
        if (currentIndex === 0) {
            leftButton.style.display = 'none';
        } else {
            leftButton.style.display = 'block';
        }

        if (currentIndex >= cards.length - cardno) {
            rightButton.style.display = 'none';
        } else {
            rightButton.style.display = 'block';
        }
    };

    leftButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= cardno;
            carouselSmall.style.transform = `translateX(-${currentIndex * 100/cardno}%)`;
        }
        updateButtonsVisibility();
    });

    rightButton.addEventListener('click', () => {
        if (currentIndex < carouselSmall.querySelectorAll('.card-small').length - cardno) {
            currentIndex += cardno;
            carouselSmall.style.transform = `translateX(-${currentIndex * 100/cardno}%)`;
        }
        updateButtonsVisibility();
    });

    updateButtonsVisibility();
}




// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Fetch data from Firebase
const wcMatchDataRef = firebase.database().ref('WorldCupGamesData/matches');
wcMatchDataRef.once('value', snapshot => {
const data = snapshot.val();
const lastFourGames = data.slice(62, 64); // Get the last 4 games
const allmatches= data.slice(0,64);
// Loop through the games and create a card for each
lastFourGames.forEach(game => {
    createCard(game,'.matchcontainer1');
    // containerSelector=matchcontainer1;
});
allmatches.forEach(game => {
    createCard(game,'.matchcontainer2');
    // containerSelector=matchcontainer2;
    });
});

// Function to create a card
function createCard(game,containerSelector){
// Create card elements
const card = document.createElement('div');
card.classList.add('card');
card.classList.add('d-flex');
card.classList.add('flex-row');

const cardBody = document.createElement('div');
cardBody.classList.add('card-body');
cardBody.classList.add('d-flex');
cardBody.classList.add('flex-column');

// Create game date section
const gameDateSection = document.createElement('div');
gameDateSection.classList.add('d-flex');
gameDateSection.classList.add('justify-content-between');
gameDateSection.classList.add('game-date');

const gameDate = document.createElement('span');
gameDate.textContent = game.date;
gameDateSection.appendChild(gameDate);

const gameTime = document.createElement('span');
gameTime.textContent = '21:30';
gameDateSection.appendChild(gameTime);

cardBody.appendChild(gameDateSection);

// Create teams section
const teamsSection = document.createElement('div');
teamsSection.classList.add('d-flex');
teamsSection.classList.add('flex-column');



const team1Section = document.createElement('div');
team1Section.classList.add('d-flex');

team1Section.classList.add('justify-content-between');

const team1Name = document.createElement('div');
team1Name.classList.add('team-name');
team1Name.innerHTML = `<i class="flag flag-${game.team1.toLowerCase().replace(/(\w+)\s+(\w+)/g, '$1-$2')}"></i>${game.team1}`;
team1Section.appendChild(team1Name);

const team1Score = document.createElement('div');
team1Score.innerHTML = `<b>${game.team1score}</b>`;
team1Section.appendChild(team1Score);

teamsSection.appendChild(team1Section);

const team2Section = document.createElement('div');
team2Section.classList.add('d-flex');
team2Section.classList.add('justify-content-between');

const team2Name = document.createElement('div');
team2Name.classList.add('team-name');
team2Name.innerHTML = `<i class="flag flag-${game.team2.toLowerCase().replace(/(\w+)\s+(\w+)/g, '$1-$2')}"></i>${game.team2}`;
team2Section.appendChild(team2Name);

const team2Score = document.createElement('div');
team2Score.innerHTML = `<b>${game.team2score}</b>`; 

const fullTimeIndicator = document.createElement('div');
fullTimeIndicator.classList.add('d-flex');
fullTimeIndicator.classList.add('align-items-center');
fullTimeIndicator.classList.add('justify-content-center');
const fullTimeIndicatorinner = document.createElement('div');
fullTimeIndicatorinner.classList.add('full-time');
fullTimeIndicatorinner.classList.add('bgfulltime');
fullTimeIndicatorinner.classList.add('px-2');

fullTimeIndicatorinner.textContent = 'FT';
fullTimeIndicator.appendChild(fullTimeIndicatorinner);

team2Section.appendChild(team2Score);

teamsSection.appendChild(team2Section);


cardBody.appendChild(teamsSection);

// Create full time indicator


// Append card body to card
card.appendChild(cardBody);
card.appendChild(fullTimeIndicator);


// Append card to container
const container = document.querySelector(containerSelector);
container.appendChild(card);



}



//naveen

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
    const groupRef = db.ref("GroupTable/" + groupName);
  
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



updateCardDisplay();


}); 
}); 

