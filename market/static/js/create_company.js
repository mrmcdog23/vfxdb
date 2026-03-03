
// script.js
// This file is sourced by index.html
// The button's onclick="doSomething()" calls this function

function openModal() {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("myModal").classList.add("showing");
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal").classList.remove("showing");
}

// Close modal if user clicks outside
window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}