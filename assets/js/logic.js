var timer = document.getElementById("time");
var startQuiz = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questions = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");

// Timer that counts down from 60
function countdown() {
    var timeLeft = 60;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft >= 0) {
        // Set the `textContent` of `timer` to show the remaining seconds
        timer.textContent = timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
        } 
    }, 1000);
}

startQuiz.addEventListener("click", function(event) {
    // event.preventDefault();
    startScreen.setAttribute("class", "hide");
    questions.removeAttribute("class", "hide");
    askQuestion(0);
    countdown();
});

function askQuestion (index) {
    if (index >= QA.length) {
        return;
    }    
        
    questionTitle.textContent = QA[index].question;
    choices.innerHTML = "";
    var choicesList =  document.createElement("ol");
    for (answers in QA[index].answers) {
        var button = document.createElement("button");
        var li = document.createElement("li");
        li.textContent = QA[index].answers[answers]; 
        button.appendChild(li);
        choicesList.appendChild(button);
        button.addEventListener("click", function() {
            askQuestion(index+1);               
        });  
        
        choices.appendChild(choicesList);   
        
    }  
}


