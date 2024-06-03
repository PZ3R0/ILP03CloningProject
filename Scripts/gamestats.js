const jsonFilePath = '../Assets/statspage/newestWCData1.json';
import { firebaseConfig } from './config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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

const selectedMatchId = localStorage.getItem('selectedMatchId');
const tablesContainer = document.getElementById('tablesContainer');
const progressBarContainer = document.getElementById('progress-bar-container');
const teamNameContainer = document.getElementById('team-names');
const keysContainer = document.getElementById('keys');

// Function to observe when progress bars come into view
function observeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-team');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'width 1s ease-in-out';
                entry.target.style.width = entry.target.getAttribute('data-width');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Function to render progress bars
function renderProgressBar(neededGameData) {
    progressBarContainer.innerHTML = '';

    for (const stat in neededGameData) {
        const team1StatValue = neededGameData[stat]['team1'];
        const team2StatValue = neededGameData[stat]['team2'];

        const total = team1StatValue + team2StatValue;
        const team1Percentage = (team1StatValue / total) * 100;
        const team2Percentage = (team2StatValue / total) * 100;

        const statHeader = document.createElement('div');
        statHeader.classList.add('stat-header');
        statHeader.textContent = stat;

        const progressContainer = document.createElement('div');
        progressContainer.classList.add('progress-container');

        const greyBarLeft = document.createElement('div');
        greyBarLeft.classList.add('grey-bar', 'left');

        const greyBarRight = document.createElement('div');
        greyBarRight.classList.add('grey-bar', 'right');

        const team1ProgressBar = document.createElement('div');
        team1ProgressBar.classList.add('progress-team', 'team1');
        team1ProgressBar.style.width = '0%';
        team1ProgressBar.setAttribute('data-width', `calc(100% - ${team1Percentage}%)`);

        const team2ProgressBar = document.createElement('div');
        team2ProgressBar.classList.add('progress-team', 'team2');
        team2ProgressBar.style.width = '0%';
        team2ProgressBar.setAttribute('data-width', `${team2Percentage}%`);

        const team1StatValueElem = document.createElement('div');
        team1StatValueElem.classList.add('stat-value');
        team1StatValueElem.textContent = team1StatValue;

        const team2StatValueElem = document.createElement('div');
        team2StatValueElem.classList.add('stat-value');
        team2StatValueElem.textContent = team2StatValue;

        // Append progress bar elements to container
        progressBarContainer.appendChild(statHeader);
        progressContainer.appendChild(team1StatValueElem);
        progressContainer.appendChild(greyBarLeft);
        greyBarLeft.appendChild(team1ProgressBar);
        progressContainer.appendChild(greyBarRight);
        greyBarRight.appendChild(team2ProgressBar);
        progressContainer.appendChild(team2StatValueElem);

        progressBarContainer.appendChild(progressContainer);
    }

    observeProgressBars();
}

document.addEventListener('DOMContentLoaded', function () {
    const statsButton = document.getElementById('stats');
    const tableButton = document.getElementById('table');

    function renderStats() {
        tablesContainer.style.display = 'none';
        progressBarContainer.style.display = 'block';
        fetchData(jsonFilePath)
            .then(data => {
                if (data) {
                    const neededGameData = data[selectedMatchId];
                    console.log(neededGameData);
                    if (neededGameData) {
                        renderProgressBar(neededGameData);
                    } else {
                        console.error('Selected match data not found.');
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    }

    statsButton.addEventListener('click', function () {
        renderStats();
    });

    tableButton.addEventListener('click', function () {
        fetchData(jsonFilePath)
            .then(data => {
                if (data) {
                    progressBarContainer.innerHTML = '';
                    tablesContainer.style.display = 'block';
                    progressBarContainer.style.display = 'none';
                    createTables(data);
                }
            })
            .catch(error => console.error('Error:', error));
    });

    renderStats();
});

const matchesRef = ref(database, 'WorldCupGamesData/matches');
const team1Name = document.getElementById('team-1-name');
const team2Name = document.getElementById('team-2-name');

onValue(matchesRef, (snapshot) => {
    const matches = snapshot.val();
    console.log(matches);

    // Loop through the matches to find the match with the selected match_id
    matches.forEach(match => {
        if (match.match_id === selectedMatchId) {
            team1Name.textContent = match.team1;
            team2Name.textContent = match.team2;
        }
    });
});
