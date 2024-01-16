var scoreList = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");

var scoreTable = JSON.parse(localStorage.getItem("scoreTable"));

var sortedScore = scoreTable.sort((a,b)=> {return b.score-a.score});

function renderScore() {
    scoreList.innerHTML = "";

    for (i=0; i < sortedScore.length; i++) {
        var li = document.createElement("li");
        li.textContent = sortedScore[i].initials + " - " + sortedScore[i].score;
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

