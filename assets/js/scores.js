var scoreList = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");

var scoreTable = JSON.parse(localStorage.getItem("scoreTable"));

function renderScore() {
    scoreList.innerHTML = "";

    for (i=0; i < scoreTable.length; i++) {
        var li = document.createElement("li");
        li.textContent = scoreTable[i].initials + " - " + scoreTable[i].score;
        scoreList.appendChild(li);
    }
}

clearBtn.addEventListener("click", function() {    
    localStorage.clear();
    while (scoreList.hasChildNodes()) {
        scoreList.removeChild(scoreList.firstChild);
    }    
});

renderScore();

