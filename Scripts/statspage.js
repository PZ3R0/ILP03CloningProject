import { firebaseConfig } from './config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

// Function to fetch match details from Firebase Realtime Database and generate HTML content
function fetchMatchDetailsAndRender() {
    // Get the match_id from local storage
    const selectedMatchId = localStorage.getItem('selectedMatchId');

    // Reference to the Firebase database for matches
    const database = firebase.database();
    const matchesRef = database.ref('WorldCupGamesData/matches');

    // Fetch data from Firebase Realtime Database
    matchesRef.once('value', (snapshot) => {
        const matches = snapshot.val();
        console.log(matches)

        // Loop through the matches to find the match with the selected match_id
        matches.forEach(match => {
            if (match.match_id === selectedMatchId) {
                // Generate HTML content for the match details
                const matchDetailsHTML = `
                    <div class="d-flex justify-content-center mt-5 stats-page-logo">
                        <img src="../Assets/statspage/logo.png" alt="">
                    </div>
                    <div class="d-flex justify-content-between stats-page-group-section mx-5">
                        <div>${match.group}</div>
                        <div>${match.date}</div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="d-flex mt-5 justify-content-around w-60 score-board">
                            <div class="stats-page-teamsandflag  w-25 text-center">${match.team1}</div>
                            <i class="flag flag-${match.team1.toLowerCase().replace(/(\w+)\s+(\w+)/g, "$1-$2")} fa-4x"></i>
                            <div class="stats-page-teamsandflag ">${match.team1score}</div>
                            <div class="stats-page-teamsandflag ">:</div>
                            <div class="stats-page-teamsandflag">${match.team2score}</div>
                            <i class="flag flag-${match.team2.toLowerCase().replace(/(\w+)\s+(\w+)/g, "$1-$2")} fa-4x ps-4"></i>
                            <div class="stats-page-teamsandflag w-25 text-center">${match.team2}</div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center w-100 mt-3">
                        <div class="full-time">Full-Time</div>
                    </div>
                `;

                // Replace the content of the container element with the generated HTML
                const container = document.getElementById('matchDetailsContainer');
                container.innerHTML = matchDetailsHTML;

                // Stop looping once the match with the selected match_id is found
                return;
            }
        });
    });
}

// Call the function to fetch match details and render HTML content
fetchMatchDetailsAndRender();


function showTVProviders() {
    const tvProvidersSpace = document.getElementById('tv-providers')
    const selectedNation = localStorage.getItem('tvProviderNation')
    const database = firebase.database();
    const imageLinksRef = database.ref('TvProviders/' + selectedNation + 'TvProviders');

    imageLinksRef.once('value', (snapshot) => {
        const imageLinks = snapshot.val();
        console.log(imageLinks)

        // Display images in the HTML page
        for (const key in imageLinks) {
            console.log(key)
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
                tvProvidersSpace.appendChild(imageWrapper);
            }
        }
    });
}
showTVProviders()

// Get the elements
const lineup = document.getElementById('lineup');
const stats = document.getElementById('stats');
const table = document.getElementById('table');

// Add event listeners
lineup.addEventListener('click', () => {
    lineup.classList.add('pink-text');
    stats.classList.remove('pink-text');
    table.classList.remove('pink-text');
});

stats.addEventListener('click', () => {
    stats.classList.add('pink-text');
    lineup.classList.remove('pink-text');
    table.classList.remove('pink-text');

    
});
const progressBarContainer = document.getElementById('progress-bar-container')
// Add event listener for the "Table" option
table.addEventListener('click', () => {

    progressBarContainer.style.display = 'none';
    tablesContainer.style.display = 'block';
    // Remove the pink text class from other options
    lineup.classList.remove('pink-text');
    stats.classList.remove('pink-text');
    // Add pink text class to the "Table" option
    table.classList.add('pink-text');

    // Fetch JSON data and create tables
    const jsonFilePath = '../Assets/statspage/wcgroupstats.json';
    fetchData(jsonFilePath)
        .then(data => {
            if (data) {
                // Clear existing tables before creating new ones
                const tablesContainer = document.getElementById('tablesContainer');
                tablesContainer.innerHTML = '';
                createTables(data);
            }
        })
        .catch(error => console.error('Error:', error));
});


// Function to fetch JSON data from the file path
async function fetchData(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
// Function to create table for each group
// Function to create table for each group
export function createTables(data) {
    const tablesContainer = document.getElementById('tablesContainer');

    // Iterate over each group
    for (const groupName in data) {
        if (data.hasOwnProperty(groupName)) {
            const groupData = data[groupName];

            const tableWrapper = document.createElement('div');
            tableWrapper.classList.add('table-wrapper');

            // Create table element
            const table = document.createElement('table');
            // Create header for group name
            const thead = document.createElement('thead');
            const groupHeaderRow = document.createElement('tr');
            groupHeaderRow.classList.add('group-header')
            groupHeaderRow.textContent = groupName;
            const headerRow = document.createElement('tr');
            for (const columnHeader of ['', 'Team', 'MP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts']) {
                const th = document.createElement('th');
                th.textContent = columnHeader;
                th.style.textAlign = 'center';
                headerRow.appendChild(th);
            }
            thead.append(groupHeaderRow);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body
            const tbody = document.createElement('tbody');

            // Sort teams by points (Pts)
            const sortedTeams = Object.entries(groupData).sort((a, b) => b[1].Pts - a[1].Pts);

            // Create table rows for each team
            sortedTeams.forEach(([teamName, teamData], index) => {
                const row = document.createElement('tr');

                // Create cell for index
                const indexCell = document.createElement('td');
                indexCell.textContent = index + 1; // Add 1 to start from 1 instead of 0
                row.appendChild(indexCell);

                // Create cell for team name
                const teamNameCell = document.createElement('td');

                // Create the <i> tag for the team flag
                const flagIcon = document.createElement('i');
                flagIcon.classList.add('flag', `flag-${teamName.toLowerCase().replace(/(\w+)\s+(\w+)/g, "$1-$2")}`, 'fa-4x'); // Add appropriate classes for flag styling
                teamNameCell.appendChild(flagIcon); // Append the <i> tag to the cell

                // Add a space between the flag and the team name
                teamNameCell.appendChild(document.createTextNode(' '));

                // Add the team name text to the cell
                teamNameCell.appendChild(document.createTextNode(teamName));

                // Append the cell to the table row
                row.appendChild(teamNameCell);

                // If top 2 teams, add "Q" symbol
                if (index < 2) {
                    const qSymbol = document.createElement('span');
                    qSymbol.textContent = 'Q';
                    qSymbol.classList.add('qualification-symbol');
                    teamNameCell.appendChild(qSymbol);
                }

                // Create cells for other team data
                for (const key in teamData) {
                    if (teamData.hasOwnProperty(key) && key !== 'Team') {
                        const cell = document.createElement('td');
                        cell.textContent = teamData[key];
                        row.appendChild(cell);
                    }
                }
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            tableWrapper.appendChild(table);

            // Append table to container
            tablesContainer.appendChild(tableWrapper);
        }
    }
}
