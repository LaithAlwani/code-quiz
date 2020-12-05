var scoresButton = document.querySelector("#scores-button");
var timerEl = document.querySelector("#timer");
var welcomeEl = document.querySelector(".welcome");
var startButton = document.querySelector("#start");
var questionsEl = document.querySelector(".questions");
var gameOverEl = document.querySelector(".game-over");
var answers = document.querySelector("#answers");
var answerStatus = document.querySelector("#answer-status");
var intials = document.querySelector("#intials");
var userScore = document.querySelector("#user-score");
var SubmitButton = document.querySelector("#submit-high-score");
var intialsList = document.querySelector("#intials-list");
var highScoreButtonsGroup = document.querySelector("#high-score-button-group");
var goBackEl = document.querySelector("#go-back");
var clearButton = document.querySelector("#clear-history");

var interval;
var score = 0;
var totalSeconds = 120;
var questionNumber = 0;
var highScoreArry;

//question object
var question = {
    question: String,
    answers: Array,
    correctAnswer: String
}
//Questions Data start
var question1 = {
    question: "What does Html stand for?",
    answers: [
        "Hypertext Markdown language",
        "hyepertext Markup language",
        "stands for nothing it's just called Html",
        "None of the above",
    ],
    correctAnswer: "hyepertext Markup language"

}

var question2 = {
    question: "What does CSS stand for?",
    answers: [
        "Car stuck in Sonw",
        "All answers are correct",
        "something Javascript uses",
        "Cascade Style Sheet",
    ],
    correctAnswer: "Cascade Style Sheet"

}

var question3 = {
    question: "what is the correct way in BootStrap classes to call a blue button",
    answers: [
        "blue button",
        "btn-blue",
        "btn btn-primary",
        "btn",
    ],
    correctAnswer: "btn btn-primary"

}
//Question Data Ends

var questionsArray = [question1, question2, question3]; // collection of questions

init();
// intialzes the high score array from local storage if any
function init() {
    highScoreArry = JSON.parse(localStorage.getItem("scores"));

    if (highScoreArry === null) {
        highScoreArry = [];
    }
}
//starts the quiz
startButton.addEventListener("click", start);

//starts the quiz
function start() {
    startTimer();
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";
    score = 0;
    questionNumber = 0;
    displayQuestion(questionNumber);
}

//starts Timer  
function startTimer() {
    totalSeconds = 120;
    interval = setInterval(function () {
        totalSeconds--;
        console.log(totalSeconds);
        timerEl.textContent = formatTime(totalSeconds);
        if (totalSeconds < 0) {
            alert("Game-over");
            totalSeconds = 0;
            gameOver();
        }
    }, 1000)
}
//formats the time to a 00:00 time format
function formatTime(timeInSeconds) {
    var minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, 0);
    var seconds = String(timeInSeconds % 60).padStart(2, 0);
    return (`Time left: ${minutes}:${seconds}`);
}

//displays the question to the user
function displayQuestion(num) {
    // if the number is less than the array's length display the question
    if (num < questionsArray.length) {
        var questionText = document.querySelector("#question-text");
        answers.textContent = "";
        questionText.textContent = `Question ${questionNumber + 1}: ${questionsArray[num].question}`;
        questionText.setAttribute("style", "font-size:20px")
        displayAnswers(questionNumber);
        questionNumber++;
    } else {
        gameOver();
    }
}

//displays the answers to the user
function displayAnswers(num) {
    //loop through the answers array
    for (var i = 0; i < questionsArray[num].answers.length; i++) {
        //create a button for each answer
        var button = document.createElement("button");
        //set attributes fot each button
        button.textContent = questionsArray[num].answers[i];
        button.setAttribute("data-answer", questionsArray[num].answers[i]);
        button.classList.add("answer-button", "btn");
        //add a click listener for each button
        button.addEventListener("click", function (e) {
            //disable all the answerbuttons after clicking one
            var allButtons = document.querySelectorAll(".answer-button");
            for (var i = 0; i < allButtons.length; i++) {
                allButtons[i].disabled = true;
            }
            //checking if the right answer was clicked
            if (questionsArray[num].correctAnswer === e.target.getAttribute("data-answer")) {
                answerStatus.textContent = "Correct Answer!"
                score++;
            } else {
                answerStatus.textContent = "Wrong Answer!"
                totalSeconds -= 20;

            }
            //delay to show the user if the answer was correct or wrong
            setTimeout(function () {
                displayQuestion(questionNumber);
                answerStatus.textContent = "";
            }, 1000)
        })
        answers.appendChild(button);
    }
}

//when the quiz ends the user is taking to the game over screen to put in the intials
function gameOver() {
    clearInterval(interval)
    questionsEl.style.display = "none";
    gameOverEl.style.display = "block";
    userScore.textContent = `Your score is: ${score} out of ${questionsArray.length}`;
}
//submit the intials and push to the high score array
SubmitButton.addEventListener("click", function () {
    if (intials.value === "") {
        alert("please enter intials")
    } else {
        highScoreArry.push(` Intials: ${intials.value} - score: ${score} `);
        gameOverEl.style.display = "none";
        intialsList.style.display = "block";
        displayHighScore();
        intials.value = "";
        storeDate();
    }
});

//display the high score array in the high score section
function displayHighScore() {

    intialsList.style.display = "block";
    highScoreButtonsGroup.style.display = "block";
    intialsList.textContent = "";
    //loop through the high score array  and display then on the screen
    for (var i = 0; i < highScoreArry.length; i++) {
        var hr = document.createElement("hr");
        var highScoreText = document.createElement("p");
        highScoreText.textContent = highScoreArry[i];
        intialsList.prepend(highScoreText, hr);
    }
}

scoresButton.addEventListener("click", function () {
    clearInterval(interval);
    displayHighScore();
    highScoreButtonsGroup.style.display = "block";
    questionsEl.style.display = "none";
    gameOverEl.style.display = "none";
    welcomeEl.style.display = "none";
})

//go back button to retry the quiz
goBackEl.addEventListener("click", goBack);
function goBack() {
    intialsList.style.display = "none";
    highScoreButtonsGroup.style.display = "none";
    welcomeEl.style.display = "block";
}

//clearing the intial history
clearButton.addEventListener("click", clearHistory);
function clearHistory() {
    var clearScore = confirm("Are you sure you want to clear all scores?")
    if (clearScore) {
        highScoreArry = [];
        localStorage.removeItem("scores");
        if (highScoreArry.length === 0) {
            intialsList.textContent = "";
        } else {
            return;
        }
    }

}
//store intial and scores to local storage
function storeDate() {
    localStorage.setItem("scores", JSON.stringify(highScoreArry));
}