var highScoreEl = document.querySelector("#high-score");
var timerEl = document.querySelector("#timer");
var welcomeEl = document.querySelector(".welcome");
var startButton = document.querySelector("#start");
var questionsEl = document.querySelector(".questions");
var gameOverEl = document.querySelector(".game-over");
var answers = document.querySelector("#answers");
var answerStatus = document.querySelector("#answer-status");
var scoreEl = document.querySelector("#score");
var highscoreButton = document.querySelector("#high-score-button");
var highScoresList = document.querySelector("#high-scores-list");


var interval;
var score = 0;
var totalSeconds = 120;

var question = {
    question: String,
    answers: Array,
    correctAnswer: String
}

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

var questionsArray = [question1, question2, question3];

var questionNumber = 0;

function start() {
    startTimer();
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";
    score = 0;
    questionNumber = 0;
    displayQuestion(questionNumber);
}


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

function formatTime(timeInSeconds) {
    var minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, 0);
    var seconds = String(timeInSeconds % 60).padStart(2, 0);
    return (`Time left: ${minutes}:${seconds}`);
}

function displayQuestion(num) {
    if (num < questionsArray.length) {
        var questionEl = document.querySelector("#question");
        answers.textContent = "";
        questionEl.textContent = `Question ${questionNumber + 1}: ${questionsArray[num].question}`;
        questionEl.setAttribute("style", "font-size:20px")
        displayAnswers(questionNumber);
        questionNumber++;
    } else {
        gameOver();
    }
}

function displayAnswers(num) {
    for (var i = 0; i < questionsArray[num].answers.length; i++) {
        var button = document.createElement("button");
        button.textContent = questionsArray[num].answers[i];
        button.setAttribute("data-answer", questionsArray[num].answers[i]);
        button.classList.add("answer-button", "btn", "btn-primary");
        button.addEventListener("click", function (e) {
            var allButtons = document.querySelectorAll(".answer-button");
            for(var i=0;i<allButtons.length;i++){
                allButtons[i].disabled = true;
            }
            if (questionsArray[num].correctAnswer === e.target.getAttribute("data-answer")) {
                answerStatus.textContent = "Correct Answer!"
                score++;
            } else {
                answerStatus.textContent = "Wrong Answer!"
                totalSeconds -= 20;

            }
            setTimeout(function () {
                displayQuestion(questionNumber);
                answerStatus.textContent = "";
            },500)
        })
        answers.appendChild(button);
    }
}
var intials = document.querySelector("#intials");
var highScoreArrya;
function gameOver() {
    clearInterval(interval)
    questionsEl.style.display = "none";
    gameOverEl.style.display = "block";
    scoreEl.textContent = `Your score is: ${score} out of ${questionsArray.length}`;


}

highscoreButton.addEventListener("click", function () {
    if (intials.value === "") {
        alert("please enter intials")
    } else {
        highScoreArrya.push(` ${intials.value} ${score} `);
        console.log(highScoreArrya);

        gameOverEl.style.display = "none";
        highScoresList.style.display = "block";
        displayHighScore();
        intials.value = "";
        storeDate();
    }
});
var highScoreButtons = document.querySelector("#high-score-buttons");

function displayHighScore() {
    console.log(highScoreArrya);
    highScoresList.style.display = "block";
    highScoreButtons.style.display = "block";
    highScoresList.textContent = "";
    for (var i = 0; i < highScoreArrya.length; i++) {
        var hr = document.createElement("hr");
        var highScoreText = document.createElement("p");
        highScoreText.textContent = highScoreArrya[i];
        highScoresList.prepend(highScoreText, hr);
    }
    
}

var goBackEl = document.querySelector("#go-back");
    goBackEl.addEventListener("click", function () {
        highScoresList.style.display = "none";
        highScoreButtons.style.display = "none";
        welcomeEl.style.display = "block";
    });


startButton.addEventListener("click", start);

highScoreEl.addEventListener("click", function(){
    clearInterval(interval);
    displayHighScore();
    highScoreButtons.style.display = "block";
    questionsEl.style.display = "none";
    gameOverEl.style.display = "none";
    welcomeEl.style.display = "none";
})

var clearButton = document.querySelector("#clear-history");
clearButton.addEventListener("click", function(){
    highScoreArrya = [];
    localStorage.removeItem("scores");
    if(highScoreArrya.length ===0){
        highScoresList.textContent = "";
    }
})

function storeDate(){
    localStorage.setItem("scores", JSON.stringify(highScoreArrya) );
}

function init(){
    highScoreArrya = JSON.parse(localStorage.getItem("scores")) ;
    console.log(highScoreArrya);
    if(highScoreArrya === null){ 
        highScoreArrya = []; 
    }
    
}

init();