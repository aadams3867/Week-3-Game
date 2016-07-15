// Array holds all the words that can be guessed in the game
var Pokedex = [
		"BULBASAUR",
		"CHARMANDER",
		"SQUIRTLE",
		"CATERPIE",
		"WEEDLE",
		"PIDGEY",
		"RATTATA",
		"SPEAROW",
		"EKANS",
		"PIKACHU",
		"SANDSHREW",
		"NIDORAN",
		"CLEFAIRY",
		"VULPIX",
		"JIGGLYPUFF",
		"ZUBAT",
		"ODDISH",
		"VENONAT",
		"DIGLETT",
		"MEOWTH",
		"PSYDUCK",
		"MANKEY",
		"GROWLITHE",
		"POLIWAG",
		"ABRA",
		"MACHOP",
		"BELLSPROUT",
		"TENTACOOL",
		"GEODUDE",
		"PONYTA",
		"SLOWPOKE",
		"MAGNEMITE",
		"FARFETCHD",
		"DODUO",
		"SEEL",
		"GRIMER",
		"SHELLDER",
		"GASTLY",
		"ONIX",
		"DROWZEE",
		"KRABBY",
		"VOLTORB",
		"EXEGGCUTE",
		"CUBONE",
		"HITMONLEE",
		"HITMONCHAN",
		"LICKITUNG",
		"KOFFING",
		"RHYHORN",
		"CHANSEY",
		"TANGELA",
		"KANGASKHAN",
		"HORSEA",
		"GOLDEEN",
		"STARYU",
		"MRMIME",
		"SCYTHER",
		"JYNX",
		"ELECTABUZZ",
		"MAGMAR",
		"PINSIR",
		"TAUROS",
		"MAGIKARP",
		"LAPRAS",
		"DITTO",
		"EEVEE",
		"PORYGON",
		"OMANYTE",
		"KABUTO",
		"AERODACTYL",
		"SNORLAX",
		"ARTICUNO",
		"ZAPDOS",
		"MOLTRES",
		"DRATINI",
		"MEWTWO"
];

// Declare a global variable
// var numWins = 0;

// Declare the object
var hangman = {
	numWins: 0,
	winLose: "",

	numTriesLeft: 10,
	wordArray: [],
	lettersGuessed: [],				    	// Stored guesses
	wordGuessed: [],						// User's guess at the word so far
	correctGuessCount: 0,
	wordComplete : false
};

//
// ** Fresh game **
// 

function setup() {
	//  Game variables are initialized
	hangman.numTriesLeft = 10;
	hangman.wordArray = [];
	hangman.lettersGuessed = [];                // Stored guesses
	hangman.wordGuessed = [];  					// User's guess at the word so far
	hangman.correctGuessCount = 0;
	hangman.wordComplete = false;

	// Computer picks a random word from the Pokedex array
	var word = Pokedex[Math.floor(Math.random()*Pokedex.length)];

	// Convert the random word into an array of characters
	hangman.wordArray = word.split("");
	console.log("\n" + hangman.wordArray);

	// Displaying the pic
/*	var pic = document.getElementById("picDisplay");
	function changeImage() {
		pic.setAttribute("src", "assets/images/" + word + ".jpg");
	}*/

	// Displaying the word as blanks
	for (var i = 0; i < hangman.wordArray.length; i++) {
		hangman.wordGuessed.push("  _____");
	}
	document.getElementById("wordDisplay").innerHTML = hangman.wordGuessed;
	console.log(hangman.wordGuessed + " " + hangman.wordComplete);
}


// Displaying the current game stats
function writeStats() {
	
	var stats = "<br>" +
	"---------------------------------------------------------" + "<br>" +
	hangman.winLose + "<br>" + 
	"Pokémon caught: " + hangman.numWins + "<br>" + 
	"Number of tries left: " + hangman.numTriesLeft + "<br>" + 
	"Letters guessed: " + hangman.lettersGuessed + "<br>" + 
	"---------------------------------------------------------";
	document.getElementById("statsDisplay").innerHTML = stats;
}


function initialSetup() {
	setup();
	writeStats();
}


//
// ** Play the game **
//


// Capture user input
document.onkeyup = function(event) {

	// Validates and changes the user input to uppercase
	var userInput = String.fromCharCode(event.keyCode);

	var validLetters = /^[A-Za-z]+$/;
	if (userInput.match(validLetters) == null) {
		alert("Have you ever played Hangman before?  Please type a letter.");
		return;
	}

	userInput = userInput.toUpperCase();

	// Checks to see if the user entered the same letter already
	for (var i=0; i<hangman.lettersGuessed.length; i++) {
		if (userInput === hangman.lettersGuessed[i]) {
			alert("Oops, you already guessed that letter!  Please try again.");
			return;
		}
	}

	// Declare / reset goodGuess variable
	var goodGuess = 0;
		
	// Checks to see if the user's letter guess is in the random word
	for (var i=0; i<hangman.wordArray.length; i++) {
		if (userInput === hangman.wordArray[i]) {			
			hangman.wordGuessed[i] = userInput;
			goodGuess = true;
			hangman.correctGuessCount++;
			document.getElementById("wordDisplay").innerHTML = hangman.wordGuessed;
			// Did they just win the game?
			if (hangman.correctGuessCount == hangman.wordArray.length) {
				hangman.wordComplete = true;
			}
		}
	}

	// Bad guess...
	if (goodGuess == false) {
		hangman.numTriesLeft--;
	}

	// Good or bad guess
	hangman.lettersGuessed.push(userInput);

	// Checks to see if the game is over yet
	if ((hangman.numTriesLeft > 0) && (hangman.wordComplete == false)) {
		console.log("numTriesLeft: " + hangman.numTriesLeft + " " + userInput + " " + hangman.wordComplete);
		console.log(hangman.wordGuessed);
		writeStats();
	} else {
		gameOver();
	}
}

//
// ** Determine if the game was won or lost, and then immediately reset for a new game **
//

function gameOver() {
	if (hangman.numTriesLeft == 0) {           // Game lost
		hangman.winLose = "You did NOT catch your last Pokémon!  It ran away.";
	} else if (hangman.wordComplete == true){  // Game won!
		hangman.winLose = "Hooray!  You caught your last Pokémon!!";
		hangman.numWins++;
	}
	initialSetup();
}
