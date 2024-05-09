(function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();


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