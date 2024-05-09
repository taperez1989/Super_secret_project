const gymSearch = document.querySelector('.search-button');

gymSearch.addEventListener('click', function (event) {
    event.preventDefault();

    const cityName = document.querySelector('.search-input').value;

    if (cityName === '') {
        window.alert('Enter City');

        return;
    }

    location.href = "landing.html";
});