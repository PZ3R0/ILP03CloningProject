import { firebaseConfig } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

export function showTVProviders() {
  // Clear existing images
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = '';

  // Get the selected country from the dropdown
  const countrySelect = document.getElementById('countrySelect');
  const selectedCountry = countrySelect.value;
  localStorage.setItem('tvProviderNation', selectedCountry);

  console.log("Selected country:", selectedCountry); // Check the selected country

  // Reference to the Firebase database for the selected country
  const database = getDatabase(initializeApp(firebaseConfig));
  const imageLinksRef = ref(database, 'TvProviders/' + selectedCountry + 'TvProviders');

  // Fetch image links from Firebase Realtime Database
  onValue(imageLinksRef, (snapshot) => {
    const imageLinks = snapshot.val();
    console.log("Image links:", imageLinks); // Check fetched image links

    // Display images in the HTML page
    for (const key in imageLinks) {
      if (Object.hasOwnProperty.call(imageLinks, key)) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'image-wrapper';
        const imageUrl = imageLinks[key];

        // Create an img element
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Image ${key}`; // Set alt text
        imageWrapper.appendChild(imgElement);

        // Append the image wrapper to the container
        imageContainer.appendChild(imageWrapper);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('countrySelect');
  countrySelect.addEventListener('change', showTVProviders);
});

let data = [];
let groupBy = 'group'; // Initial grouping method

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const fetchData = async () => {
  const wcMatchData = ref(db, 'WorldCupGamesData/matches');
  onValue(wcMatchData, (snapshot) => {
    data = snapshot.val();
    console.log(data);
    renderCards(); // Call renderCards instead of repeating the rendering logic
  });
};

// Function to render cards based on the current grouping method
const renderCards = () => {
  let cardSpace = document.getElementById('cardelement');
  cardSpace.innerHTML = ''; // Clear the existing content

  const groupedGames = groupBy === 'group' ? groupByGroup(data) : groupByDate(data);

  // Iterate over each group or date
  for (const [key, games] of Object.entries(groupedGames)) {
    // Create a group/date header
    const header = document.createElement('div');
    header.classList.add('group-header');

    const headerText = document.createElement('p');
    headerText.textContent = `${key}`;
    header.appendChild(headerText);

    const viewGroupsLink = document.createElement('a');
    viewGroupsLink.href = "#";
    viewGroupsLink.textContent = "View Groups";
    viewGroupsLink.classList.add('view-groups-link');
    viewGroupsLink.addEventListener('click', (event) => {
      event.preventDefault();
      showTables(key);
    });
    header.appendChild(viewGroupsLink);

    cardSpace.appendChild(header);

    // Create a container for the grid
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    // Split the games into chunks of 6 (assuming 6 games per group)
    const gamesChunks = chunk(games, 6);

    // Create the grid rows
    for (const gamesChunk of gamesChunks) {
      const gridRow = document.createElement('div');
      gridRow.classList.add('grid-row');

      // Create the cards for each game in the chunk
      for (const game of gamesChunk) {
        const scoreCard = createScoreCard(game);
        gridRow.appendChild(scoreCard);
      }

      gridContainer.appendChild(gridRow);
    }

    cardSpace.appendChild(gridContainer);

    // Add an image after the grid
    const imageElement = document.createElement('img');
    imageElement.src = '../Assets/scoreandfixrures/adidas-schedule-banner-kvg-1160x68.webp'; // Replace with the actual image URL
    imageElement.classList.add('group-image');
    cardSpace.appendChild(imageElement);
  }
};

// Function to show tables in a popout window
function showTables(groupKey) {
  // Fetch the table data for the specified groupKey (You can adjust this logic as needed)
  const tablesData = data.filter(game => game.group === groupKey);

  // Create the popout window
  const popoutWindow = window.open('', '', 'width=800,height=600');

  // Write the HTML content for the table

  tablesData.forEach((game) => {
    // Assuming you have properties like team, played, won, drawn, lost, points in your data
  });

}

// Event listener to toggle the grouping method
document.getElementById('sort-button').addEventListener('click', () => {
  groupBy = groupBy === 'group' ? 'date' : 'group';
  renderCards();
});

// Call fetchData initially to load the data and render the cards
fetchData();

// Helper function to group the games by their 'group' attribute
function groupByGroup(games) {
  const groupedGames = {};
  for (const game of games) {
    const groupName = game.group;
    if (!groupedGames[groupName]) {
      groupedGames[groupName] = [];
    }
    groupedGames[groupName].push(game);
  }
  return groupedGames;
}

// Helper function to group the games by their 'date' attribute
function groupByDate(games) {
  const groupedGames = {};
  for (const game of games) {
    const date = game.date;
    if (!groupedGames[date]) {
      groupedGames[date] = [];
    }
    groupedGames[date].push(game);
  }
  return groupedGames;
}

// Helper function to create a score card element
function createScoreCard(game) {

  const isTeam1Winner = game.team1score > game.team2score;
  const isTeam2Winner = game.team2score > game.team1score;

  const scoreCard = document.createElement('div');
  scoreCard.className = "card product-card";
  scoreCard.innerHTML = `
  <div class="card">
  <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between game-date">
          <span class="">${game.date}</span>
          <span>21:30</span>
      </div>
      <div class="d-flex">
          <div class="w-95">
              <div class="d-flex justify-content-between align-items-center">
                  <div class="team-name">
                      ${isTeam1Winner ? '<span class="blue-dot"></span>' : ''}
                      <i class="flag flag-${game.team1.toLowerCase().replace(/(\w+)\s+(\w+)/g, '$1-$2')}"></i>
                      ${game.team1}
                  </div>
                  <div><b>${game.team1score}</b></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                  <div class="team-name">
                      ${isTeam2Winner ? '<span class="blue-dot"></span>' : ''}
                      <i class="flag flag-${game.team2.toLowerCase().replace(/(\w+)\s+(\w+)/g, '$1-$2')}"></i>
                      ${game.team2}
                  </div>
                  <div><b>${game.team2score}</b></div>
              </div>
          </div>
          <div class="d-flex align-items-center justify-content-center full-time">FT</div>
      </div>
  </div>
</div>
              
  `;

  scoreCard.addEventListener('click', () => {
    // Store the match_id in local storage
    localStorage.setItem('selectedMatchId', game.match_id);
    // Redirect to another page
    window.location.href = '../HTML/statspage.html';
  });

  return scoreCard;
}

// Helper function to display a blue dot if the team is the winner
function getWinnerDot(score1, score2, isFirstTeam) {
  if (score1 > score2 && isFirstTeam) {
    return `<span class="blue-dot"></span>`;
  } else if (score2 > score1 && !isFirstTeam) {
    return `<span class="blue-dot"></span>`;
  } else {
    return `<span class="blue-dot hidden"></span>`;
  }
}

// Helper function to chunk an array into smaller arrays
function chunk(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
