<<<<<<< Updated upstream
const fetch = require('node-fetch');

async function searchGyms(city) {
  const apiUrl = 'https://local-business-data.p.rapidapi.com/search';
  const apiKey = 'bddf7ad5dcmsh0f47b444a858a99p1e7f0ejsna5b3c2abc0c5';

  const queryParams = new URLSearchParams({
    query: `Gyms in ${city}`,
    limit: 20,
    language: 'en',
    region: 'us'
  });

  const url = `${apiUrl}?${queryParams}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
    }

=======
const gymSearch = document.querySelector('.search-button');

gymSearch.addEventListener('click', function (event) {
    event.preventDefault();

    const searchedCity = document.querySelector('.search-input').value;

    if (searchedCity === '') {
        window.alert('Enter City');

        return;
    }
>>>>>>> Stashed changes

    const cities = {
        searchedCity,
    };

    const city = JSON.parse(localStorage.getItem("city")) || [];

    city.push(cities);

    localStorage.setItem("city", JSON.stringify(city));

    searchGyms(searchedCity);

    location.href = "landing.html";

    
});

<<<<<<< Updated upstream
// const fetch = require('node-fetch');
// move api funtion to landing js and create elements etc.

  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching gym data:', error);
    return null;
  }
}

=======
const searchInputVal = document.querySelector('.search-input').value;

const url = `http://api.yelp.com/v3/businesses/search/text=${searchInputVal}`
const apiKey = 'MM7LUMMMQTfGrSVJFjtclhfT4crehf4peA4jQCmnt2YbhWOZo9uAoqWrpop|pGqpo15/7531bE6W/vrGFjkgn7FFZHAkpg3pXyZIZmT1hfvRnMXpdX_-i_c9CZnY×'

fetch(url, {
    method: 'GET',
    headers: {
        'authorization': 'Bearer ${MM7LUMMMQTfGrSVJFjtclhfT4crehf4peA4jQCmnt2YbhWOZo9uAoqWrpop|pGqpo15/7531bE6W/vrGFjkgn7FFZHAkpg3pXyZIZmT1hfvRnMXpdX_-i_c9CZnY×}',
        'Accept': 'application/json'
    }
})
    .then(function (response) {
        if (!response.ok) {
            throw response.json('Network response not ok');
        }
        return response.json();
        
    })
console.log(response);
>>>>>>> Stashed changes
