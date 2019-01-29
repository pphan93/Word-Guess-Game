var guessWord = "homework";
var guessedRight = [];
var wordLength;
var guessesLeft;
var lettersLeft;
var lettersGuessed = [];
var lettersGuessIncorrect = [];
var textOutput;
var failMessage;
var correctMessage;
var inputLetter
var randomnum;
var category;
var win = 0;
var loss = 0;
var lossSound = "https://d3qhmae9zx9eb.cloudfront.net/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01.mp3"
var winSound = "https://d3qhmae9zx9eb.cloudfront.net/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01.mp3"
var lossImage = "https://sayingimages.com/wp-content/uploads/good-fail-meme.png"
var correct = document.getElementById('myList');
var artists = ["Martin-Garrix",
    "Alan-Walker",
    "Marshmello",
    "Illenium",
    "Kygo",
    "The-Chainsmokers",
    "Adele",
    "Drake",
    "The-Weeknd",
    "Taylor-Swift"]
var type_artists = ["EDM Artist",
    "EDM Artist",
    "EDM Artist",
    "EDM Artist",
    "EDM Artist",
    "EDM Artist",
    "Pop Artist",
    "Hip Hop Artist",
    "R&B Artist",
    "Pop Artist"]
//var gameOver = false;

failMessage = "YOU FAILED!";
correctMessage = "YOU WIN";



var i = 0

//var hangman = {
//    wordLength: guessWord.length,
//    failMessage: "YOU FAILED!",
//    correctMessage: "YOU WIN",
//    guessesLeft: 13,
//}

//guessWord = guessWord.toUpperCase();

initGame();

console.log("testing: " + lettersLeft);

document.body.onkeyup = function (event) {

    if (guessesLeft !== 0 && lettersLeft !== 0) {
        inputLetter = String.fromCharCode(event.keyCode);
        textOutput = guessCheck(inputLetter);
        OutputStatus();
        //var inputLetter = prompt("Type in a letter to guess: ");
        gameOver(guessesLeft, lettersLeft);
    }

}


function OutputStatus() {
    //document.getElementById("kp").innerHTML = inputLetter;
    //document.getElementById("wordBox").innerHTML = textOutput;
    document.getElementById("guessedL").innerHTML = lettersGuessIncorrect;
    document.getElementById("guessRemaining").innerHTML = "You have " + guessesLeft + " lives.";
}


function resultOuput() {
    if (guessesLeft === 0) {
        timer();
        loss = loss + 1;
        var idclass = document.getElementById("status");
        idclass.setAttribute('class', 'clear text-danger')
        document.getElementById("lossScore").innerHTML = "<h3>" + loss + "</h3>"
        document.getElementById("imageSRC").src = lossImage
        var audio = new Audio(lossSound);
        audio.play();
        return document.getElementById("status").innerHTML = failMessage;

    }

    else if (lettersLeft === 0) {
        timer();
        win = win + 1;
        var idclass = document.getElementById("status");
        idclass.setAttribute('class', 'clear text-success')
        document.getElementById("winScore").innerHTML = "<h3>" + win + "</h3>"
        document.getElementById("videoSRC").src = "https://www.youtube.com/embed/gCYcHz2k5x0?rel=0"
        var audio = new Audio(winSound);
        audio.play();
        return document.getElementById("status").innerHTML = correctMessage;
        //document.getElementById("wordBox").innerHTML = textOutput;
    }
}


function gameOver(guessesLeft, lettersLeft) {
    if (guessesLeft === 0 || lettersLeft === 0) {
        return resultOuput();
    }
}


function initGame() {
    guessesLeft = 8;
    guessedRight = [];
    lettersGuessIncorrect = [];
    lettersGuessed = [];
    myList.innerHTML = '';

    getWord();
    wordLength = guessWord.length;
    wordReady(wordLength);

    var classClear = document.getElementsByClassName("clear");
    for (var i = 0; i < classClear.length; i++) {
        classClear[i].innerHTML = "";
        classClear[i].classList.remove("text-danger", "text-success")
    }

    console.log("initial: " + guessWord)
    console.log("initial: " + wordLength);
    //classClear.innerHTML = ""
    // document.body.innerHTML = "";
    //document.getElementById("wordBox").innerHTML = "";
}

function getWord() {
    randomnum = Math.floor(Math.random() * artists.length);
    category = type_artists[randomnum]
    guessWord = artists[randomnum];
    console.log("Artist: " + guessWord + " Type: " + category)
    guessWord = guessWord.toUpperCase();
}

function wordReady(wordLength) {
    //wordHolder = document.getElementById('hold');


    console.log("SPace: " + wordLength)
    lettersLeft = wordLength;

    for (i = 0; i < wordLength; i++) {
        //correct.setAttribute('id', 'my-word');

        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (guessWord[i] === "-") {
            //guessedRight[i] = "-";
            guess.innerHTML = "-";
            lettersLeft = lettersLeft - 1;
        }
        else {
            //guessedRight[i] = '_';
            guess.innerHTML = "_";
        }

        guessedRight.push(guess);
        //wordHolder.appendChild(correct);
        correct.appendChild(guess);
    }
    console.log("guess INIT: " + guess);
    console.log(guessedRight);
    /*else {
        while (findSpace != -1) {
            guessedRight[findSpace] = " ";
            foundPosition = guessWord.indexOf(inputLetter, findSpace + 1)
            lettersLeft = lettersLeft - 1;
        }
    }*/
}


function timer() {
    var timeleft = 3;
    var downloadTimer = setInterval(function () {
        document.getElementById("countdown").innerHTML = "Restarting in " + timeleft + " seconds remaining";
        timeleft -= 1;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            initGame();
            //document.getElementById("countdown").innerHTML = "Finished"
        }
    }, 1000);
}


function guessCheck(inputLetter) {
    console.log("Guessed RIght While BEG: " + guessedRight);
    console.log("guessCHeckInput: " + inputLetter);
    var foundPosition = guessWord.indexOf(inputLetter)

    console.log("foundPosition: " + foundPosition)
    var foundPositionLGC = lettersGuessed.indexOf(inputLetter)

    if (foundPositionLGC === -1) {
        lettersGuessed.unshift(inputLetter);

        if (foundPosition === -1) {


            guessesLeft = guessesLeft - 1;
            lettersGuessIncorrect.unshift(inputLetter);
        }

        while (foundPosition != -1) {
            guessedRight[foundPosition].innerHTML = inputLetter;
            foundPosition = guessWord.indexOf(inputLetter, foundPosition + 1)
            lettersLeft = lettersLeft - 1;
            console.log("Guessed RIght While: " + guessedRight);
        }
    }

    console.log("letterGuessed: " + lettersGuessed);
    console.log("letterGuessedIncorrect: " + lettersGuessIncorrect);
    console.log(guessedRight.toString());
    console.log(lettersLeft);
    console.log("GuessLeft: " + guessesLeft);
    console.log(guessedRight);
    return guessedRight;
}
