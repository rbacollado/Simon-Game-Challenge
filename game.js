
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;


$(document).keypress(function() {
    if (!start){
        $("#level-title").html("Level " + level);
        nextSequence();
        start = true;
    }
  });

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel] ){
        if (userClickedPattern.length === gamePattern.length){
            console.log("success");
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }else{
        //Wrong Answers
        console.log("wrong");
        playSound("wrong");
       
        $("body").addClass( "game-over" );
        //Delay Function
        var delayInMilliseconds = 300; 
        setTimeout(function() {
            $("body").removeClass( "game-over" );
        }, delayInMilliseconds);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }
  }

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

$( ".btn" ).click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });

function animatePress(currentColour){
    $( "#" + currentColour ).addClass( "pressed" );

    //Delay Function
    var delayInMilliseconds = 100; 
    setTimeout(function() {
        $( "#" + currentColour ).removeClass( "pressed" );
    }, delayInMilliseconds);
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}

function playSound(name_sound) {
    var audio = new Audio("sounds/" + name_sound + ".mp3");
    audio.play();
}
