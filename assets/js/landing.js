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
// Get the modal
let modal = document.getElementById("myModal");


// Get the button that opens the modal
let btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let taskContainer = document.getElementById("taskContainer");
let taskId = 0;

// When the user clicks the button, open the modal
btn.onclick = function () {
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'openModal') {
            modal.style.display = "block";
        }
    });
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Ninja API for workout data fetch
const workoutSearchEntry = document.querySelector('.workout-entry'); //replace with respective HTML class/ID
const workoutSubmit = document.querySelector('#workout-submit'); //replace with HTML
const apiWorkoutKey = 'qn/zcJQkQfpyU7iVcOwjfg==jdIi92gLftIqjh63';

//API call to populate workouts based on search entry/muscle group
function getNinjaApi(event) {
    event.preventDefault();
    //fetch request
    const requestNinjaUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${workoutSearchEntry.value}&limit=10&appid=${apiWorkoutKey}`;

    fetch(requestNinjaUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        })
}