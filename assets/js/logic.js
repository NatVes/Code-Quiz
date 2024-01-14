var timer = document.getElementById("time");
var startQuiz = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questions = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var warning = document.querySelector("#feedback");
var allDone = document.querySelector("#end-screen");
var score = document.querySelector("#final-score");//change for array!
var submitBtn = document.querySelector("#submit");
var timeLeft = 0;
var stopTimer = false;

// Timer that counts down from 60
function countdown() {
    timeLeft = 59;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft >= 0 && stopTimer == false) {
        // Set the `textContent` of `timer` to show the remaining seconds
        timer.textContent = timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
        } else if (stopTimer == true) {            
            clearInterval(timeInterval);
        }
        else {
            clearInterval(timeInterval);
            questions.setAttribute("class", "hide");
            allDone.removeAttribute("class", "hide");
            score.textContent = 0; 
            timer.textContent = 0;           
        }
    }, 1000);

}

startQuiz.addEventListener("click", function(event) {
    
    startScreen.setAttribute("class", "hide");
    questions.removeAttribute("class", "hide");
    askQuestion(0);
    countdown();
});

function askQuestion (index) {
    if (index >= QA.length) {
        questions.setAttribute("class", "hide");
        allDone.removeAttribute("class", "hide");
        stopTimer = true; 
        localStorage.setItem("score", timer.textContent);
        score.textContent = localStorage.getItem("score");       
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
            if (this.textContent == QA[index].correctAnswer) {                
                warning.removeAttribute("class", "hide");                
                warning.textContent = "Correct!";
                // this.setAttribute("transitionDelay", "1s");
                // var correct = document.createElement("audio");
                // correct.setAttribute("src", "./sfx/correct.wav");                
                // this.appendChild(correct);
                // correct.play();
            } else {
                warning.removeAttribute("class", "hide");                
                warning.textContent = "Wrong!";
                timeLeft -= 10;
            }
            askQuestion(index+1);               
        });          
        choices.appendChild(choicesList);          
    }  
}

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    location.assign("highscores.html");
});

