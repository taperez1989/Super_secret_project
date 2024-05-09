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
    modal.style.display = "block";
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
const workoutSubmit = document.querySelector('.workout-submit'); //replace with HTML
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