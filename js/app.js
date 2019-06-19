"use strict";
// parent class
var parent1 = document.getElementById("deck");
console.log(parent1);
/*
 * Create a list that holds all of your cards
 */
var child1 = document.getElementsByClassName("card");
var childList = [].slice.call(child1);
console.log(childList);
let status = false;
// time declaration
var time;
var sec, min, hours;
// timearea declaration
var timeArea = document.getElementById("time");
var moves = 0;
// declaration of movesSection
var movesSection = document.getElementById("moves");
var childStore = [];
var starCount = 3;
var starDiv = [...document.getElementsByClassName("fa-star")];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	// while loop declaration
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
// reload function declaration
function reload() {
	window.location.reload();
}
window.onload = inceptGame();
// inceptGame declaration
function inceptGame() {
	var shufflededCards = shuffle(childList);
	for (var i in shufflededCards) {
		parent1.append(shufflededCards[i]);
	}
}
// for in loop
for (var i in childList) {
	childList[i].addEventListener("click", clickedCard);
}
// clickedCard function declaration
function clickedCard() {
	if (status == false) {
		startTimer();
		status = true;
	}
	this.classList.add("card", "open", "show");
	childStore.push(this);
	if (childStore.length == 2) {
		// console.log(childStore[0].children[0].classList.item(1));
		moves = moves + 1;
		movesSection.innerHTML = moves;
		starRating();
		if (childStore[0].type == childStore[1].type) {
			console.log("matched");
			childStore[0].classList.add("match", "disable");
			childStore[1].classList.add("match", "disable");
			if (matchedcard.length == 16) {
				clearInterval(time);
				// sweetalert2
				swal.fire({
					title: "Congrats!!!",
					html: 'you have earned<strong style="color:#ff9f33;text.shadow:3px 3px 3px #000">' + starCount + ' <i class="fa fa-star"> </i> </strong> <br> and you finished this game with the time of <br>' + hours + ' hours:' + min + ' min:' + sec + 'sec: <br>' + moves + 'moves:',
					confirmButtonText: '<i class="fa fa-thumbs-up"></i> restart',
				}).then(() => {
					document.location.reload();
				});
			}
			childStore = [];
		} else {
			childStore[0].classList.add("unmatch");
			childStore[1].classList.add("unmatch");
			childStore.map((card) => {
				setTimeout(() => {
					// console.log(childStore[0]);
					card.classList.remove("unmatch", "open", "show", "disable");
				}, 200);
			})
			childStore = [];
		}
	}
}
var matchedcard = document.getElementsByClassName("match");
// timer functionality
function startTimer() {
	sec = 0;
	min = 0;
	hours = 0;
	time = setInterval(() => {
		sec = sec + 1;
		if (sec == 59) {
			sec = 0;
			min = min + 1;
		}
		if (min == 60) {
			min = 0;
			hours = hours + 1;
		}
		timeArea.innerHTML = hours + " :: " + min + " :: " + sec;
	}, 1000)
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// starRating function
function starRating() {
	if (moves >= 12 && moves <= 18) {
		starCount = 2;
		starDiv[2].style.display = "none";
	}
	if (moves >= 18) {
		starCount = 1;
		starDiv[1].style.display = "none";
	}
}
