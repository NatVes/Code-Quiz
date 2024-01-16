var timer = document.getElementById("time");
var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questions = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var feedback = document.querySelector("#feedback");
var allDone = document.querySelector("#end-screen");
var scoreDisplay = document.querySelector("#final-score");
var submitBtn = document.querySelector("#submit");
var initials = document.querySelector("#initials");
var timeLeft = 0;
var stopTimer = false;
const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

var scoreTable = [];

//Check if local storage contains anything and add it to the scoreTable array
checkAdd();

function startQuiz() {
    startScreen.setAttribute("class", "hide");
    questions.removeAttribute("class", "hide");
}

function countdown() {
    timeLeft = 59;
    var timeInterval = setInterval(function () {
        
        if (timeLeft >= 0 && stopTimer == false) {        
        timer.textContent = timeLeft;        
        timeLeft--;
        } else if (stopTimer == true) {
            //Stop timer when there are no more questions            
            clearInterval(timeInterval);
            if (timeLeft<0) {
                scoreDisplay.textContent = 0;
                timer.textContent = 0;
            } else {
                scoreDisplay.textContent = timeLeft;
                timer.textContent = timeLeft;
            }                        
        }
        else {
            //Stop timer and finish the quiz when timeLeft=0
            clearInterval(timeInterval);
            endQuiz();            
            scoreDisplay.textContent = 0; 
            timer.textContent = 0;           
        }
    }, 1000);
}

function askQuestion (index) {
    if (index >= QA.length) {
        endQuiz();
        stopTimer = true;         
        scoreDisplay.textContent = timer.textContent;       
        return;
    }    
        
    questionTitle.textContent = QA[index].question;
    choices.innerHTML = "";
    var choicesList =  document.createElement("ol");
    for (answer in QA[index].answers) {
        var button = document.createElement("button");
        var li = document.createElement("li");
        li.textContent = QA[index].answers[answer]; 
        button.appendChild(li);
        choicesList.appendChild(button);
        button.addEventListener("click", function() {
            //Check if the answer is correct and continue the quiz
            if (this.textContent == QA[index].correctAnswer) {  
                showFeedback("Correct!");
                //Feedback will disappear after 0.5sec                             
                setTimeout(function() {showFeedback("");}, 500);
                correctSound.play();
            } else {
                timeLeft -= 10;
                showFeedback("Wrong!");
                setTimeout(function() {showFeedback("");}, 500);
                incorrectSound.play();               
            }
            
            askQuestion(index+1);               
        });          
        choices.appendChild(choicesList);          
    }  
}

function showFeedback (message) {
    feedback.removeAttribute("class", "hide");                
    feedback.textContent = message;    
}

function endQuiz () {
    questions.setAttribute("class", "hide");
    allDone.removeAttribute("class", "hide");
}

function storeUserData () {
    localStorage.setItem("scoreTable", JSON.stringify(scoreTable));
}

function checkAdd() {
    // Get stored data from localStorage
    // Parsing the JSON string to an object
    var storedData = JSON.parse(localStorage.getItem("scoreTable"));
    // If stored data were retrieved from localStorage, update the scoreTable array to it
    if (storedData !== null) {
        scoreTable = storedData;
    }
}

startBtn.addEventListener("click", function() {    
    startQuiz();
    askQuestion(0);
    countdown();
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    var userScore =  {
        initials: initials.value.toUpperCase().trim(),
        score: scoreDisplay.textContent,
    };  
    
    if (initials.value.trim() === "") {
        feedback.textContent = "Enter your initials.";
        initials.value = "";
        return;
    }  

    scoreTable.push(userScore);
    initials.value = "";
    storeUserData();  

    window.location.href = "./highscores.html";      
});




