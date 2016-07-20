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


// Declare the object
var hangman = {
	numWins: 0,
	winLose: "",
	audio: "",

	numTriesLeft: 10,
	word: "",								// String holding the random word
	wordArray: [],							// Array holding the random word
	lettersGuessed: [],				    	// Array storing user's letter guesses
	wordGuessed: [],						// Array keeping user's guess at the word so far
	correctGuessCount: 0,					// Number of letters guessed correctly so far
	wordComplete : false
};

//
// ** Fresh game **
// 

function updatePic() {
	// Displaying the updated pic
	var pic = document.getElementById("picDisplay").src=("assets/images/" + hangman.word + ".jpg");
	document.getElementById("picDisplay").innerHTML = pic;
}

function setup() {
	//  Initialize game variables
	hangman.numTriesLeft = 10;
	hangman.wordArray = [];
	hangman.lettersGuessed = [];
	hangman.wordGuessed = [];
	hangman.correctGuessCount = 0;
	hangman.wordComplete = false;

	// Computer picks a random word from the Pokedex array
	hangman.word = Pokedex[Math.floor(Math.random()*Pokedex.length)];

	// Convert the random word into an array of characters
	hangman.wordArray = hangman.word.split("");
	console.log("\n" + hangman.wordArray);

	// Displaying the random word as blanks
	for (var i = 0; i < hangman.wordArray.length; i++) {
		hangman.wordGuessed.push("  _____");
	}
	document.getElementById("wordDisplay").innerHTML = hangman.wordGuessed;
	console.log(hangman.wordGuessed);
}


// Displaying the current game stats
function writeStats() {
	
	var stats = "<br>" +
	"-----------------------------------------------------------------------------" + "<br>" +
	hangman.winLose + "<br>" + 
	"Pokémon caught: " + hangman.numWins + "<br>" + 
	"Number of tries left: " + hangman.numTriesLeft + "<br>" + 
	"Letters guessed: " + hangman.lettersGuessed + "<br>" + 
	"-----------------------------------------------------------------------------";
	document.getElementById("statsDisplay").innerHTML = stats;
}


function initialSetup() {
	setup();
	updatePic();
	writeStats();
}


//
// ** Play the game **
//


// Capture user input
document.onkeyup = function(event) {

	// Validates and changes the user's letter input to uppercase
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

	// Bad guess only...
	if (goodGuess == false) {
		hangman.numTriesLeft--;
	}

	// Good or bad guess
	hangman.lettersGuessed.push(userInput);
	writeStats();
	console.log(userInput + " numTriesLeft: " + hangman.numTriesLeft + " wordComplete: " + hangman.wordComplete);
	console.log(hangman.wordGuessed + " correctGuessCount: " + hangman.correctGuessCount);

	// Checks to see if the game is over yet
	if ((hangman.numTriesLeft == 0) || (hangman.wordComplete == true)) {
		gameOver();
	}
}

//
// ** Game over!  Determine if the user won or lost, and then immediately reset for a new game **
//

function gameOver() {
	if (hangman.audio != "") {					// If a sound file still might be playing, pause it
		hangman.audio.pause();
	}

	if (hangman.numTriesLeft == 0) {            // User lost!
		hangman.winLose = "You did NOT catch your last Pokémon!  " + hangman.word + " ran away.";
		hangman.audio = new Audio('assets/sounds/defeat.mp3');
	} else if (hangman.wordComplete == true){   // User won!
		hangman.winLose = "Hooray!  You caught your last Pokémon, " + hangman.word + "!!";
		hangman.numWins++;
		hangman.audio = new Audio('assets/sounds/victory.mp3');
	}
	hangman.audio.play();
	initialSetup();
}
