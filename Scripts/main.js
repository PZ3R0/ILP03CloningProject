console.log("HEllo WOrld")

console.log("please discuss with team before you rename this file,purpose of this file is pretty self explanatory")


async function fetchData() {
    try {
      // Replace 'YOUR_API_KEY' with your actual API key
      const apiKey = 'YOUR_API_KEY';
      const apiUrl = 'https://www.statbomb.com/api/v1/YOUR_ENDPOINT';

      // Make a GET request to the API endpoint
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // Parse the JSON response
      const data = await response.json();

      // Do something with the data
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Call the fetchData function to fetch data from StatBomb API
  fetchData();