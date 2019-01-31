var guessWord; //For storing the word for guessing
var guessedRight = []; //Storing the correct guessed letter to output on screen
var wordLength; //number for number of letters - use for initial the letter left and output the correct dashes and for guessedright array
var guessesLeft; //track remaining lives until player lose
var lettersLeft; //track how many letters until player win - guessed all the letters correct
var lettersGuessed = []; //Keep track of all the letter guessed by player
var lettersGuessIncorrect = []; //keep track of all the incorrect letters guessed to output to screen and for letter left
var inputLetter; //store key that player typed
var randomnum; //storing generated random number from the countryName array - get random country name from array
var win = 0; //winning score
var loss = 0; //loss score
var i = 0

var hangman = {
    alertAudio: document.createElement("audio"),
    //backgroundAudio: document.createElement("audio"),
    failMessage: "YOU FAILED!",
    correctMessage: "YOU WIN",
    lettersList: document.getElementById('lettersList'),
    lossSound: "https://d3qhmae9zx9eb.cloudfront.net/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01.mp3",
    winSound: "https://d3qhmae9zx9eb.cloudfront.net/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01.mp3",
    lossImage: "https://sayingimages.com/wp-content/uploads/good-fail-meme.png",
    backgroundMusic: "https://www.bensound.org/bensound-music/bensound-memories.mp3",
    initialImage: "assets/images/namesofcountries.jpg",
    outputImage: function (image) {
        document.getElementById("imageSRC").src = image
    },
    countryName: [
        "Afghanistan",
        "Australia",
        "Bahamas",
        "Bulgaria",
        "Belgium",
        "Cambodia",
        "Canada",
        "China",
        "Costa-Rica",
        "Czech-Republic",
        "Denmark",
        "France",
        "Germany",
        "Italy",
        "India",
        "Japan",
        "Korea",
        "Liechtenstein",
        "Malaysia",
        "Norway",
        "Vietnam",
        "Thailand",
        "Singapore"],
    countryIso: [
        "af",
        "au",
        "bs",
        "bg",
        "be",
        "kh",
        "ca",
        "cn",
        "cr",
        "cz",
        "dk",
        "fr",
        "de",
        "it",
        "in",
        "jp",
        "kr",
        "li",
        "my",
        "no",
        "vn",
        "th",
        "sg"],

    //reset everything to default - reset lives, reset to default image, get new word, remove word letter    
    initGame: function () {
        guessesLeft = 8;
        guessedRight = [];
        lettersGuessIncorrect = [];
        lettersGuessed = [];
        this.lettersList.innerHTML = '';
        this.outputImage(this.initialImage);
        this.getWord();
        wordLength = guessWord.length;
        this.wordReady(wordLength);

        //get all the html element with class "clear" and remove it from screen (innerHTML - Change the HTML content) 
        var classClear = document.getElementsByClassName("clear");
        for (var i = 0; i < classClear.length; i++) {
            //remove content
            classClear[i].innerHTML = "";
            //remove class for color of text
            classClear[i].classList.remove("text-danger", "text-success")
        }

        console.log("initial: " + guessWord)
        console.log("initial: " + wordLength);
    },

    //randomly generate a number using .random to get a random word from countryName array and upper case it
    getWord: function () {
        randomnum = Math.floor(Math.random() * this.countryName.length);
        guessWord = this.countryName[randomnum];
        console.log("Artist: " + guessWord)
        guessWord = guessWord.toUpperCase();
    },

    //create an html li (list) depend on word and out the ' _ _ _ _ _'
    wordReady: function (wordLength) {
        console.log("SPace: " + wordLength)
        lettersLeft = wordLength;

        for (i = 0; i < wordLength; i++) {
            //create a li
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (guessWord[i] === "-") {
                //Ignore the - (spaces) of the word so user dont have guesses space or -
                guess.innerHTML = "-";
                lettersLeft = lettersLeft - 1;
            }
            else {
                guess.innerHTML = "_";
            }
            //store the li html code and text to arrays for change the _ to correct letter
            guessedRight.push(guess);
            //add the html code between the id lettersList
            this.lettersList.appendChild(guess);
        }
        console.log("guess INIT: " + guess);
        console.log(guessedRight);
    },
    playSound: function(sound,loop,volume){
        this.alertAudio.setAttribute("src",sound);

        this.alertAudio.play();
        this.alertAudio.loop = loop;
        this.alertAudio.volume = volume;
    },

    playBackground: function(sound,loop,volume){
        var backgroundAudio= document.getElementById("audioB");
        console.log(backgroundAudio.src)

        if (backgroundAudio.src !== sound ){
            backgroundAudio.src = sound; 
        }

        if (backgroundAudio.paused) {
            backgroundAudio.play();
            backgroundAudio.loop = loop;
            backgroundAudio.volume = volume;
        }
        else{
            backgroundAudio.pause();
        }
    },

    //output the result of the round to the screen
    resultOuput: function () {
        if (guessesLeft === 0) {
            this.timer();
            loss = loss + 1;

            //get id status to add a class to div for different color of the text depend on result
            var idclass = document.getElementById("status");
            idclass.setAttribute('class', 'clear text-danger');
            document.getElementById("lossScore").innerHTML = "<h3>" + loss + "</h3>";
            //change the image source to fail image
            document.getElementById("imageSRC").src = this.lossImage;
            //play an fail audio
            this.playSound(this.lossSound,false,.5);
            return document.getElementById("status").innerHTML = this.failMessage;

        }
        //similiar to above - out put country image, play a winning sound, and message
        else if (lettersLeft === 0) {
            this.timer();
            win = win + 1;
            var idclass = document.getElementById("status");
            idclass.setAttribute('class', 'clear text-success')
            document.getElementById("winScore").innerHTML = "<h3>" + win + "</h3>"
            this.outputImage("http://flagpedia.net/data/flags/normal/" + this.countryIso[randomnum] + ".png");
            //play an fail audio
            this.playSound(this.winSound,false,.5);
            return document.getElementById("status").innerHTML = this.correctMessage;
        }
    },

    //check if either user lose or win before output the result to screen
    gameOver: function (guessesLeft, lettersLeft) {
        if (guessesLeft === 0 || lettersLeft === 0) {
            return this.resultOuput();
        }
    },

    //Wait 3 seconds before restarting the game
    timer: function () {
        var timeleft = 3;
        var downloadTimer = setInterval(function () {
            document.getElementById("countdown").innerHTML = "Restarting in " + timeleft + " seconds remaining";
            timeleft -= 1;
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                hangman.initGame();
            }
        }, 1000);
    },

    //output guessed incorrect letters and how many lives left
    OutputStatus: function () {
        document.getElementById("guessedL").innerHTML = "Guessed Letters:" + lettersGuessIncorrect;
        document.getElementById("guessRemaining").innerHTML = "You have " + guessesLeft + " lives.";
    },
    guessCheck: function (inputLetter) {
        console.log("Guessed RIght While BEG: " + guessedRight);
        console.log("guessCHeckInput: " + inputLetter);

        //correct letter guesses
        var foundPosition = guessWord.indexOf(inputLetter)

        console.log("foundPosition: " + foundPosition)

        //all letter guesses
        var foundPositionLGC = lettersGuessed.indexOf(inputLetter)

        //check if letter has been input from player, if not then continues to next step
        //to prevent the counter going down for either correct or incorrect guesses
        if (foundPositionLGC === -1) {
            lettersGuessed.unshift(inputLetter);

            //if letter doesnt match word then store to array for output and subtract from guessesLeft
            if (foundPosition === -1) {
                guessesLeft = guessesLeft - 1;
                lettersGuessIncorrect.unshift(inputLetter);
            }

            //if letter match the letter in word then store it in guessedRight array to output to screen,
            //subtract letter left, and repeat until no letter match (this will capure if word contains more than one of same letter)
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
}

//hangman.playSound(hangman.backgroundMusic,true,.2);

hangman.initGame();
console.log("testing: " + lettersLeft);

document.body.onkeyup = function (event) {
    inputLetter = event.key.toUpperCase(event.keyCode);
    
    if (inputLetter === "ENTER") {
        hangman.playBackground(hangman.backgroundMusic,true,.2);
    }
    else{

        if (guessesLeft !== 0 && lettersLeft !== 0) {
            hangman.guessCheck(inputLetter);
            hangman.OutputStatus();
            hangman.gameOver(guessesLeft, lettersLeft);
        }
    }
}