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
      let workoutResult = [];

      for (let i = 0; i < data.length; i++) {
        let workoutName = data[i].name;
        let workoutMuscle = data[i].muscle;
        let workoutEquipment = data[i].equipment;
        let workoutInstruction = data[i].instructions;

        // create an object for extracted workout data
        let singleWorkoutData = {
          name: workoutName,
          muscle: workoutMuscle,
          equipment: workoutEquipment,
          instructions: workoutInstruction
        };

        // push object 'singleWorkoutData' into the array 'workoutResult'
        workoutResult.push(singleWorkoutData);
        console.log('SINGLE workout card', singleWorkoutData);
      }

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
      console.log('this is my data as an array', workoutResult); //checks if generated array holds data
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

// target cards in HTML
const card = document.querySelector('.card');

// Event listener for workoutSubmit button
workoutSubmit.addEventListener('click', (event) => {
  getNinjaApi(event);

  if (workoutSearchEntry.value.trim() !== '') {
    card.style.display = 'block';
  }
});