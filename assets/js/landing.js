// (function() {
//     var burger = document.querySelector('.burger');
//     var menu = document.querySelector('#'+burger.dataset.target);
//     burger.addEventListener('click', function() {
//         burger.classList.toggle('is-active');
//         menu.classList.toggle('is-active');
//     });
// })();

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