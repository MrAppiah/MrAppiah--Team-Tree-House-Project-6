// Variables
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let missed = 0;
const startGame = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const tries = document.querySelectorAll("li.tries");

// An array named phrases storing at least five strings
const phrases = [
	"get rich or die trying",
	"dream big",
	"life is too short",
	"avocado is a fruit",
	"football is the biggest sport in the world",
];

// Event listener to button with id btn_reset
startGame.addEventListener("click", () => {
	// Style of overlay to none
	overlay.style.display = "none";
});

// Return a random phrase from an array and generate a random number from 1 and length of the array
function getRandomPhraseArray(arr) {
	let randomNumber = Math.floor(Math.random() * arr.length);
	// assigns index value of array to variable randomPhrase
	let randomPhrase = arr[randomNumber];
	// returns randomPhrase split the phrase into a new array of characters
	return randomPhrase.split("");
}

const phraseArray = getRandomPhraseArray(phrases);

// This function loops through an array of characters and adds it to the display.
function addPhraseToDisplay(arr) {
	for (let i = 0; i < phrases.length; i++) {
		let li = document.createElement("li");
		li.textContent = arr[i];
		ul.append(li);
		if (phrases[i].trim().length === 0) {
			li.className = "space";
		} else {
			li.className = "letter";
		}
	}
}

// Check if the letter is in the phrase
function checkLetter(button) {
	const letters = document.querySelectorAll(".letter");
	let lettersMatch = null;

	for (let i = 0; i < letters.length; i++) {
		if (letters[i] === arr) {
			letters[i].className = "show";
			lettersMatch = letters[i];
			return lettersMatch;
		} else {
			return null;
		}
	}
}

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		e.target.className = "chosen";
		e.target.disabled = true;
		let lettersMatch = checkLetter(e.target.textContent);

		if (lettersMatch === null) {
			tries[missed].firstElementChild.src = "images/lostHeart.png";
			missed++;
		}
	}
	checkWin();
});

// Check if the game has been won or lost
function checkWin() {
	const show = document.querySelectorAll("show");
	const letters = document.querySelectorAll("letter");
	if (letters.length === show.length) {
		overlay.classList.add("win");
		overlay.children[0].textContent = "SUCCESS!";
		overlay.children[1].textContent = "Restart?";
		overlay.style.display = "flex";
	} else if (missed >= 5) {
		overlay.classList.add("lose");
		overlay.children[0].textContent = "FAILED!";
		overlay.children[1].textContent = "Restart?";
		overlay.style.display = "flex";
	}
}
