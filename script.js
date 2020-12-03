var highScoreEl = document.querySelector("#high-score");
var timerEl = document.querySelector("#timer");
var welcomeEl = document.querySelector(".welcome");
var startButton = document.querySelector("#start");
var questionsEl = document.querySelector(".questions");
var gameOverEl = document.querySelector(".game-over");
var answers = document.querySelector("#answers");


var interal;
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

function start() {
    startTimer();
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";
    displayQuestion();
}

function startTimer() {
    interal = setInterval(function () {
        totalSeconds--;
        timerEl.textContent = formatTime(totalSeconds);
        if (totalSeconds < 0) {
            alert("Game-over");
            clearInterval(interal);
            highScore();
        }
    }, 1000)
}

function formatTime(timeInSeconds) {
    var minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, 0);
    var seconds = String(timeInSeconds % 60).padStart(2, 0);
    return (`Time: ${minutes}:${seconds}`);
}

function displayQuestion() {
    var question = document.querySelector("#question");
    question.textContent = question1.question;
    for (var i = 0; i < question1.answers.length; i++) {
        var button = document.createElement("button");
        button.textContent = question1.answers[i];
        button.setAttribute("data-answer", question1.answers[i]);
        button.classList.add("answer-button", "btn", "btn-primary");
        button.addEventListener("click", function(e){
            if(question1.correctAnswer === e.target.getAttribute("data-answer")){
                alert("correct")
            }else{
                alert("wrong");
                totalSeconds -=20;
            }
        })
        answers.appendChild(button);
    }
}

startButton.addEventListener("click", start);