// Declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retrieves all the scores from local storage
var totalScore = localStorage.getItem("totalScore");
totalScore = JSON.parse(totalScore);

if (totalScore !== null) {

    for (var i = 0; i < totalScore.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = totalScore[i].initials + " " + totalScore[i].score;
        highScore.appendChild(createLi);

    }
}
// Event listener takes you back to the start page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});