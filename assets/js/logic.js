var timer = document.getElementById("time");

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

countdown()