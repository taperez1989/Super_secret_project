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
