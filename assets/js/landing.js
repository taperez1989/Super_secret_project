document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});

// Ninja API for workout data fetch
const workoutSearchEntry = document.getElementById('muscle-group');
const workoutSubmit = document.getElementById('workout-submit');
let workoutResult = [];

//API call to populate workouts based on search entry/muscle group
const getNinjaApi = (event) => {
  event.preventDefault();

  //fetch request
  const requestNinjaUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${workoutSearchEntry.value}&limit=10`;
  let options = {
    method: 'GET',
    headers: { 'x-api-key': 'qn/zcJQkQfpyU7iVcOwjfg==jdIi92gLftIqjh63' }
  }

  fetch(requestNinjaUrl, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('this is my list of data', data);

      for (let i = 0; i < data.length; i += 2) {
        let workoutName = data[i].name;
        let workoutMuscle = data[i].muscle;
        let workoutEquipment = data[i].equipment;
        let workoutInstruction = data[i].instructions;
        let workoutID = Math.floor(Math.random() * 1000); //this assigns unique ID to filter out to remove/delete workout cards 

        // create an object for extracted workout data
        let singleWorkoutData = {
          name: workoutName,
          muscle: workoutMuscle,
          equipment: workoutEquipment,
          instructions: workoutInstruction,
          id: workoutID
        };

        // push object 'singleWorkoutData' into the array 'workoutResult'
        workoutResult.push(singleWorkoutData);
        console.log('SINGLE workout card', singleWorkoutData);
        renderCard(workoutName, workoutMuscle, workoutEquipment, workoutInstruction, workoutID); //call render function within loop

      }; // close for loop
      console.log('workout result', workoutResult);
    })


    
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};


// currently working on rendering the gym locations, we got stuck on for loop section, I dont think its firing
const searchedCity = JSON.parse(localStorage.getItem('city'));
const gymArr = [];

// API function for gym locator from index html
async function searchGyms(searchedCity) {
  const apiUrl = 'https://local-business-data.p.rapidapi.com/search';
  const apiKey = '1986133d37msh0f78bf40eb38ca0p1b1749jsnde57de8a2450';
console.log(searchedCity);
  const queryParams = new URLSearchParams({
    query: `Gyms in ${searchedCity[searchedCity.length-1].searchedCity}`,
    limit: 10,
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
  
    console.log(result);
    
   
    for (let i = 0; i < result.data.length; i += 2) {
      const data = result.data[i]
  
      renderGyms(data);

    }
  }
  catch (error) {
    console.error('Error fetching gym data:', error);
    return null;
  }
};
searchGyms(searchedCity);

// render function to generate cards with gym data and delete button functionality
function renderGyms(gym) {

  const cardGym = document.createElement('div');
  const gymContainer = document.querySelector('.gym-results');

  // Add Bulma's card class to style the card
 gymContainer.classList.add('card');
  // centers content horizontally
 gymContainer.classList.add('mx-auto');
  // sets padding on top of location name
 gymContainer.classList.add('px-4')
  // sets min width
 gymContainer.style.width = 'auto';
  // sets min height
 gymContainer.style.minHeight = '1170px';

  // create elements for gym details
  const cardGymContent = document.createElement('div');
  cardGymContent.classList.add('card-content');

  cardGymContent.style.maxHeight = '200px';
  // allows a vertical scrolling feature
  cardGymContent.style.overflowY = 'auto';

  const name = document.createElement('p');
  // add bulma css style to cards
  name.classList.add('title', 'is-4', 'pt-6');

  const number = document.createElement('p');
  number.classList.add('subtitle', 'is-6');

  const address = document.createElement('p');
  address.classList.add('content');
  address.style.width='100%'

  const mapLocation = document.createElement('p');
  mapLocation.classList.add('content');

  // set content for elements
  name.textContent = gym.name;
  number.textContent = "Phone Number: " + gym.phone_number;
  address.textContent = "Address: " + gym.address;
  mapLocation.textContent = gym.place_link;

  gymContainer.append(name, number, address);
};





// render function to generate cards with workout data and delete button functionality
function renderCard(workoutName, workoutMuscle, workoutEquipment, workoutInstruction, workoutID) {

  const card = document.createElement('div');
  const workoutContainer = document.querySelector('.workout-results');

  // Add Bulma's card class to style the card
  card.classList.add('card');
  // centers content horizontally
  card.classList.add('mx-auto');
  // sets max width
  card.style.maxWidth = '400px';

  // create elements for workout details
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  cardContent.style.maxHeight = '200px';
  // allows a vertical scrolling feature
  cardContent.style.overflowY = 'auto';

  const exercise = document.createElement('p');
  // add bulma css style to cards
  exercise.classList.add('title', 'is-4');

  const muscle = document.createElement('p');
  muscle.classList.add('subtitle', 'is-6');

  const equipment = document.createElement('p');
  equipment.classList.add('subtitle', 'is-6');

  const instruction = document.createElement('p');
  instruction.classList.add('content');

  // create button to remove workout cards 
  const deleteWorkoutButton = document.createElement('button');
  deleteWorkoutButton.classList.add('button', 'is-danger', 'is-dark', 'is-normal');
  console.log(workoutName, workoutMuscle, workoutEquipment, workoutInstruction, workoutID);

  // set content for elements
  exercise.textContent = workoutName;
  muscle.textContent = "Muscle: " + workoutMuscle;
  equipment.textContent = "Equipment: " + workoutEquipment;
  instruction.textContent = workoutInstruction;
  deleteWorkoutButton.textContent = 'Delete';
  deleteWorkoutButton.dataset.id = workoutID; // this assigns unique ID to each card's delete button


  // append elements to card
  cardContent.append(exercise, muscle, equipment, instruction, deleteWorkoutButton);
  card.append(cardContent);

  workoutContainer.append(card);

  //function to remove workout card
  deleteWorkoutButton.addEventListener('click', (event) => {
    let cardIdToRemove = parseInt(event.target.dataset.id);
    workoutResult = workoutResult.filter(card => card.id !== cardIdToRemove);
    console.log(workoutResult);
    //remove targeted card's HTML element
    event.target.closest('.card').remove();
  });
};


// target cards in HTML
const card = document.querySelector('.card');

// Event listener for workoutSubmit button
workoutSubmit.addEventListener('click', (event) => {
  getNinjaApi(event);

  if (workoutSearchEntry.value.trim() !== '' && card !== null) {
    card.classList.add('card');
  }

  //this may need to be MOVED since some elements might be out of scope
  // Close the modal after processing the API response (copied from first part of modal...)
  function closeModal($el) {
    $el.classList.remove('is-active');
  }
  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }
  closeAllModals();
  console.log('this is my data as an array', workoutResult);//checks if generated array holds data
});
