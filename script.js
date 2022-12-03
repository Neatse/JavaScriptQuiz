var mainPage = document.querySelector("#main-page");
var scorePage = document.querySelector("#score-page");

var scoreBtn = document.querySelector("#score-btn");
var timerText = document.querySelector("#timer");

var homeContainer = document.querySelector("#home-container");
var startBtn = document.querySelector("#start-btn");

var questionContainer = document.querySelector("#question-container");
var question = document.querySelector("#question");
var optionBtn = document.querySelector("#optionBtn");
var optionBtn1 = document.querySelector("#option1");
var optionBtn2 = document.querySelector("#option2");
var optionBtn3 = document.querySelector("#option3");
var optionBtn4 = document.querySelector("#option4");
var questions = [
    {
        question: "Commonly used data types do not include:",
        option1: "1. Strings",
        option2: "2. Booleans",
        option3: "3. Numbers",
        option4: "4. Alerts",
        answer: "4. Alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        option1: "1. quotes",
        option2: "2. curly brackets",
        option3: "3. parentheses",
        option4: "4. square brackets",
        answer: "2. curly brackets"
    },
    {
        question: "Arrays in Javascript can be enclosed with _____ when being assigned to varibles.",
        option1: "1. numbers and scripts",
        option2: "2. other arrays",
        option3: "3. booleans",
        option4: "4. all of the above",
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed with _______ when being assigned to variables.",
        option1: "1. quotes",
        option2: "2. commas",
        option3: "3. curly brackets",
        option4: "4. parenthesis",
        answer: "1. quotes"
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger.",
        option1: "1. JavaScript",
        option2: "2. Termnial/bash",
        option3: "3. for loops",
        option4: "4. console.log",
        answer: "1. JavaScript"
    }
]

var completeContainer = document.querySelector("#complete-container");
var playerScore = document.querySelector("#score");
var initials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit-btn");

var scoreList = document.querySelector("#score-list");
var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn");

var footerContainer = document.querySelector("#footer-container");
var resultText = document.querySelector("#result-text");

var counter;
var score;
var initial;
//set starting timer
var time = 75;
//set time penalty on wrong choice
var penalty = 10;

scoreBtn.addEventListener("click", viewScore);
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);
backBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", resetScore);

function setTime() {
    var timerInterval = setInterval(function () {
        time--;
        timerText.innerHTML = "Time: " + time;
        if (time === 0) {
            clearInterval(timerInterval);
            quizComplete();
        } else if (time < 0) {
            clearInterval(timerInterval);
            timerText.innerHTML = "Time: 0";
            quizComplete();
        } else if (counter === questions.length) {
            clearInterval(timerInterval);
            timerText.innerHTML = "Time: 0";
        }
    }, 1000);
};

function startQuiz() {
    homeContainer.style.display = "none";
    counter = 0;
    score = 0;
    setTime();
    setQuiz();
}

function setQuiz() {

    if (counter != questions.length) {
        questionContainer.style.display = "unset";
        question.innerHTML = questions[counter].question;
        optionBtn1.innerHTML = questions[counter].option1;
        optionBtn2.innerHTML = questions[counter].option2;
        optionBtn3.innerHTML = questions[counter].option3;
        optionBtn4.innerHTML = questions[counter].option4;

        optionBtn1.addEventListener("click", checkAns);
        optionBtn2.addEventListener("click", checkAns);
        optionBtn3.addEventListener("click", checkAns);
        optionBtn4.addEventListener("click", checkAns);

    } else {
        quizComplete();
    }
}

function checkAns(e) {
    footerContainer.style.display = "unset";
    if (e.target.outerText === questions[counter].answer) {
        resultText.innerHTML = "Correct!";
        score += 1;
        counter += 1;
    } else {
        resultText.innerHTML = "Wrong!"
        time = time - penalty;
        score += -1;
        counter += 1;
    }
    setQuiz();
}

function quizComplete() {
    questionContainer.style.display = "";
    completeContainer.style.display = "unset";
    playerScore.innerHTML = "Your final score is " + score + ".";
}

function saveScore() {
    var highScoreList = JSON.parse(localStorage.getItem("highScores"));
    if (highScoreList == null) {
        var highScoreList = [];
        var newScore = new Object();
        newScore.initials = initials.value;
        newScore.score = score;
        highScoreList.push(newScore);
        var rankedScore = highScoreList.sort(({ score: a }, { score: b }) => b - a);
        localStorage.setItem("highScores", JSON.stringify(rankedScore));
    }
    else {
        var highScore = new Object();
        highScore.initials = initials.value;
        highScore.score = score;
        highScoreList.push(highScore);
        var rankedScore = highScoreList.sort(({ score: a }, { score: b }) => b - a);
        localStorage.setItem("highScores", JSON.stringify(rankedScore));
    };
    resetQuiz();
}

function resetQuiz() {
    homeContainer.style.display = "";
    questionContainer.style.display = "";
    completeContainer.style.display = "";
    footerContainer.style.display = "";
    initials.value = "";
    counter = 0;
    score = 0;
    initial = "";
    time = 60;
}

function viewScore() {
    resetQuiz();
    mainPage.style.display = "none";
    scorePage.style.display = "unset";
    var highScoreList = JSON.parse(localStorage.getItem("highScores"));
    if (highScoreList == null) {
        highScoreList = [];
    } else {
        for (var i = 0; i < highScoreList.length; i++) {
            var li = document.createElement("li");
            var text = document.createTextNode((i + 1) + ". " + highScoreList[i].initials + " - " + highScoreList[i].score);
            li.appendChild(text);
            scoreList.appendChild(li);
        }
    }
}

function resetScore() {
    while (scoreList.firstChild) scoreList.removeChild(scoreList.firstChild)
    localStorage.clear();
}

function goBack() {
    while (scoreList.firstChild) scoreList.removeChild(scoreList.firstChild)
    mainPage.style.display = "";
    scorePage.style.display = "none";
}