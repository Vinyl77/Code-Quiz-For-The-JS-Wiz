// creating a variable for questions and answers.
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];
// Declared variables
var score = 0;
var questionIndex = 0;

// start the process of working code.
// Declared variables for elements within the HTML
var runTime = document.querySelector("#runTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#container");

// Seconds left is 15 seconds per question:
var seconds = 76;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulAnswer = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // it's set at zero, so we are checking for zero.
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            seconds--;
            runTime.textContent = "Time: " + seconds;

            if (seconds <= 0) {
                clearInterval(holdInterval);
                allFin();
                runTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// puts questions and choices on the page.
function render(questionIndex) {
    // Clears existing data
    questionsDiv.innerHTML = "";
    ulAnswer.innerHTML = "";
    // For loops to go through all the info in the array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulAnswer);
        ulAnswer.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare the player choice with the correct answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // this is if answer is correct
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // This is if answer is correct
        } else {
            // Will deduct -10 seconds off for wrong answers
            seconds = seconds - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines what question the user is currently at.
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append the result of the user to the page
        allFin();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score +  "OUT OF " + questions.length + " Correct! " + "You are AWESOME!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append the results page
function allFin() {
    questionsDiv.innerHTML = "";
    runTime.innerHTML = "";

    // Creating a Header
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Creating A Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // adds up time remaining and replaces it with a score.
    if (seconds >= 0) {
        var timeLeft = seconds;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeLeft;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("why?")

        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
            }
            console.log(finalScore);
            var totalScore = localStorage.getItem("totalScore");
            if (totalScore === null) {
               totalScore = [];
            } else {
                totalScore = JSON.parse(totalScore);
            }
            totalScore.push(finalScore);
            var newScore = JSON.stringify(totalScore);
            localStorage.setItem("totalScore", newScore);
            // takes you to the hall of fame page.
            window.location.replace("./hofscores.html");
        }
    });

}