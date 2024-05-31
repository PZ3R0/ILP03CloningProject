const jsonFilePath = '../Assets/statspage/newestWCData1.json';

// Function to fetch JSON data from a given path
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
const tablesContainer = document.getElementById('tablesContainer');
const progressBarContainer = document.getElementById('progress-bar-container');
const teamNameContainer = document.getElementById('team-names')
// Function to render progress bars
function renderProgressBar(neededGameData) {
    progressBarContainer.innerHTML = ''; // Clear previous content

    // Loop through each statistic in neededGameData
    for (const stat in neededGameData) {
        const team1StatValue = neededGameData[stat]['team1'];
        const team2StatValue = neededGameData[stat]['team2'];

        // Convert values to percentages
        const total = team1StatValue + team2StatValue;
        const team1Percentage = (team1StatValue / total) * 100;
        const team2Percentage = (team2StatValue / total) * 100;

        // Create progress bar elements
        const statHeader = document.createElement('div');
        statHeader.classList.add('stat-header');
        statHeader.textContent = stat;
        const progressContainer = document.createElement('div');
        progressContainer.classList.add('progress-container');

        const team1value = document.createElement('div');
        team1value.classList.add('team1-stat-value');
        team1value.textContent = team1StatValue;
        const team1ProgressBar = document.createElement('div');
        team1ProgressBar.classList.add('progress-team', 'team1');
        team1ProgressBar.style.width = `${team1Percentage}%`;

        const team2ProgressBar = document.createElement('div');
        team2ProgressBar.classList.add('progress-team', 'team2');
        team2ProgressBar.style.width = `${team2Percentage}%`;
        const team2value = document.createElement('div');
        team2value.classList.add('team2-stat-value');
        team2value.textContent = team2StatValue;

        // Append progress bar elements to container
        progressBarContainer.appendChild(statHeader);
        progressContainer.appendChild(team1value);
        progressContainer.appendChild(team1ProgressBar);
        progressContainer.appendChild(team2ProgressBar);
        progressContainer.appendChild(team2value);
        progressBarContainer.appendChild(progressContainer);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const statsButton = document.getElementById('stats');
    const tableButton = document.getElementById('table');

    // Function to fetch data and render stats
    function renderStats() {
        // Fetch data from JSON file and render progress bars
        tablesContainer.style.display = 'none';
        progressBarContainer.style.display = 'block';
        fetchData(jsonFilePath)
            .then(data => {
                if (data) {
                    const selectedMatchId = localStorage.getItem('selectedMatchId');
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

    // Event listener for stats button
    statsButton.addEventListener('click', function () {
        renderStats();
    });

    // Event listener for table button
    tableButton.addEventListener('click', function () {
        // Fetch data for table and render
        fetchData(jsonFilePath)
            .then(data => {
                if (data) {
                    // Clear previous content
                    progressBarContainer.innerHTML = '';
                    // Display tables
                    tablesContainer.style.display = 'block';
                    progressBarContainer.style.display = 'none';
                    // Render tables here
                    createTables(data);
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Show stats by default
    renderStats();

    // Trigger the animation when user scrolls
    window.addEventListener('scroll', function () {
        const progressBars = document.querySelectorAll('.progress-team');
        progressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.5;
            if (barPosition < screenPosition) {
                bar.classList.add('fill-animation'); // Add class to trigger animation
            }
        });
    });
});
