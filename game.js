var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


var buttonColours = ["red", "blue", "green", "yellow"];


$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosencolour = $(this).attr("id");
  userClickedPattern.push(userChosencolour);
  playSound(userChosencolour);
  animatePress(userChosencolour);
  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}



function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("passed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
