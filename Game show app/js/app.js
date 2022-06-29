// Variables
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase ul");
const startGame = document.querySelector(".btn__reset");
const overlay = document.querySelector(".start");
const youWin = document.querySelector(".title");
const ul = document.querySelector("ul");
let missed = 0;

// Added custom background
document.body.style.backgroundImage = "url('/images/background.jpg')";

// Disabled scroll
function noscroll() {
	window.scrollTo(0, 0);
}
window.addEventListener("scroll", noscroll);

// An array named phrases storing at least five strings
const phrases = [
	"ice cream",
	"dream big",
	"nutty professor",
	"avocado is a fruit",
	"homer simpson",
	"salted caramel",
	"get rich or die trying",
	"yolo",
];

// Event listener to button with id btn_reset
startGame.addEventListener("click", () => {
	// Style of overlay to none
	overlay.style.display = "none";
});

// Return a random phrase from an array and generate a random number from 1 and length of the array
function getRandomPhraseAsArray(arr) {
	const randomNumber = Math.floor(Math.random() * phrases.length);
	// assigns index value of array to variable randomPhrase
	let randomPhrase = arr[randomNumber];
	// returns randomPhrase split the phrase into a new array of characters
	return randomPhrase.split("");
}

// This function loops through an array of characters and adds it to the display
const randomPhrase = getRandomPhraseAsArray(phrases);
function addPhraseToDisplay(arr) {
	for (let i = 0; i < arr.length; i++) {
		const li = document.createElement("li");
		li.textContent = arr[i];
		phrase.appendChild(li);
		if (arr[i] === " ") {
			li.classList.add("space");
		} else {
			li.classList.add("letter");
		}
	}
}
addPhraseToDisplay(randomPhrase);

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.tagName === "BUTTON" && e.target.className != "chosen") {
		const button = e.target;
		e.target.className = "chosen";
		e.target.setAttribute("disabled", "");
		const lettersMatch = checkLetter(button);
		if (lettersMatch === null) {
			const tries = document.querySelectorAll("img");
			tries[missed].setAttribute("src", "images/lostHeart.png");
			missed++;
		}
	}
	checkWin();
});

// Check if the letter is in the phrase
const ListLetters = document.querySelectorAll(".letter");
function checkLetter(arr) {
	let lettersMatch = null;
	for (let i = 0; i < ListLetters.length; i++) {
		const li = ListLetters[i];
		if (li.textContent === arr.textContent) {
			li.classList.add("show");
			li.style.transition = "all .8s ease";
			lettersMatch = arr.textContent;
		}
	}
	return lettersMatch;
}

// Check if the game has been won or lost
function checkWin() {
	const show = document.querySelectorAll(".show");
	const letters = document.querySelectorAll(".letter");
	if (letters.length === show.length) {
		overlay.style.display = "flex";
		overlay.className = "win";
		youWin.textContent = "Congratulations, You Win!";
		startGame.textContent = "Restart?";
	} else if (missed > 4) {
		overlay.style.display = "flex";
		overlay.className = "lose";
		youWin.textContent = "Better Luck Next Time!";
		startGame.textContent = "Restart?";
	}
	restartGame();
}

// Restarts game
function restartGame() {
	startGame.addEventListener("click", (e) => {
		ul.style.display = "none";
		location.reload();
	});
}
