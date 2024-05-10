const apiUrl = 'https://places.ls.hereapi.com/places/v1/discover/here';
const apiKey = 'Fk5s-l66WnXrM9wD_DrgKEEIWbHHyqKEZkvafd4M208';

async function fetchGyms(city) {
    try {
        const url = `${apiUrl}?at=${city}&apiKey=${apiKey}&cat=gyms-fitness-centers`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch gym data from the API');
        }

        const data = await response.json();
        return data.results.items;
    } catch (error) {
        console.error('Error fetching gym data:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const gymsList = document.getElementById('gymsList');

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city === '') {
            alert('Please enter a city name.');
            return;
        }

        try {
            const gymsData = await fetchGyms(city);
            if (gymsData && gymsData.length > 0) {
                gymsList.innerHTML = '';

                gymsData.forEach(gym => {
                    const gymItem = document.createElement('div');
                    gymItem.classList.add('gym-item');
                    gymItem.textContent = `${gym.title} - ${gym.vicinity}`;
                    gymsList.appendChild(gymItem);
                });
            } else {
                gymsList.innerHTML = '<p>No gyms found in this city.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching gym data. Please try again later.');
        }
    });
});
