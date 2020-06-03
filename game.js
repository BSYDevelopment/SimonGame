let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let isStarted = false;
let level = 0;


$("body").keypress(function () {
    if (isStarted === false) {
        isStarted = true;
        setTimeout(function () {
            nextSequence();
        }, 300);
    }

});



$(".btn").on("click", function () {
    if (isStarted === true) {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(this);
        checkAnswer(userClickedPattern.length - 1);
    }
});


function nextSequence() {
    $("#level-title").text("Level " + level);
    level++;
    let randomNumber = Math.floor(Math.random() * 4);
    let colorSelected = buttonColors[randomNumber];
    playSound(colorSelected);
    $("#" + colorSelected).fadeOut(300).fadeIn(300);
    gamePattern.push(colorSelected);

}

function playSound(sound) {
    let audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        isStarted = false;
        gamePattern = [];
        level = 0;
        userClickedPattern = [];
    }
}