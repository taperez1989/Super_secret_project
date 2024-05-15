const gymSearch = document.querySelector('.search-button');

gymSearch.addEventListener('click', function (event) {
    event.preventDefault();

    const searchedCity = document.querySelector('.search-input').value;

    if (searchedCity === '') {
        window.alert('Enter City');

        return;
    }

    const cities = {
        searchedCity,
    };

    const city = JSON.parse(localStorage.getItem("city")) || [];

    city.push(cities);

    localStorage.setItem("city", JSON.stringify(city));

    searchGyms(searchedCity);

    location.href = "landing.html";

    
});

// const fetch = require('node-fetch');
// move api funtion to landing js and create elements etc.
