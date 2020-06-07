/*--------------------  GLOBAL VARIABLES -------------------- */

var userClickedPattern = [];

// Create an empty array to store the color pattern
var gamePattern = [];

// Create an array that contains the colors of the game
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;

// Initiate a boolean to keep track if game has started
var started = false;

// Variable to keep track of the levels
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/*-------------------- FUNCTIONS -------------------- */

$(".btn").click(function () {
  // Set the variable to the ID of the button clicked on by user
  var userChosenColor = $(this).attr("id");

  // Add the name of the color clicked on by user to the userClickedPattern array
  userClickedPattern.push(userChosenColor);

  // Output the color to the console to verify
  console.log(userClickedPattern);

  // Play sound when user clicks on a color
  playSound(userChosenColor);

  // Add animation to the color clicked by the user
  animatePress(userChosenColor);

  // Check the last answer chosen by user
  checkAnswer(userClickedPattern.length - 1);
});

// Function that checks the user's answer with the game pattern's answer
function checkAnswer(currentLevel) {
  // Check the most recent user answer is the same as the game pattern's answer
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // If the answer is correct then checked if the sequence is finished
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Call the gameOver function
    gameOver();

    // Call startOver function to restart game after 1 second/1000 milliseconds
    setTimeout(function () {
      startOver();
    }, 1000);
  }
}

// Create the function to generate a random number between 0 and 3
function nextSequence() {
  var randomNum = Math.floor(Math.random() * 4);

  // Selects a random color
  randomChosenColor = buttonColors[randomNum];

  // Adds the color to the game pattern array
  gamePattern.push(randomChosenColor);
  console.log(randomChosenColor);

  // Select button with same id as randomChosenColor
  $("#" + randomChosenColor)
    .fadeOut(250)
    .fadeIn(250);

  // Play sound
  playSound(randomChosenColor);

  // Increment level value
  level++;

  // Set the userClickedPattern array to zero once the function is called
  userClickedPattern.length = 0;
}

function startOver() {

    // Reset values of level, gamePattern array, and started so the game can restart
  level = 0;
  gamePattern.length = 0;
    started = false;
    
    // Set the game title
  $("#level-title").text("Press any key to start over!");

  $(document).keypress(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}

function gameOver() {
  // Set the title to Game Over
  $("#level-title").text("GAME OVER MUTHAFUKKA!");

  // Create an audio variable for wrong.mp3 sound
  var wrongSound = new Audio("/sounds/wrong.mp3");

  // Play the wrong.mp3 audio when user clicks on the wrong sound
  wrongSound.play();

  // Add the game-over class to the body when user clicks wrong sound
  $("body").addClass("game-over");

  // Remove the game-over class from body after 200 milliseconds
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function playSound(name) {
  // Play audio on button click
  var audio = new Audio("/sounds/" + name + ".mp3");

  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
    //....and whatever else you need to do
  }, 100);
}
