let gameText =  document.getElementById("gameText");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");

let orderList = []; // Sequence generated by the game
let inputList = []; // Sequence entered by the player
let levelCount = 0;
let gameInProgress = false;

// Mapping numbers to squares and sounds
const list = {
    1: green,
    2: red,
    3: yellow,
    4: blue
};

const audioList = {
    1: new Audio("audioFiles/green.mp3"),
    2: new Audio("audioFiles/red.mp3"),
    3: new Audio("audioFiles/yellow.mp3"),
    4: new Audio("audioFiles/blue.mp3")
};
const lossSound = new Audio("audioFiles/lose.wav");

addStartGameListener();

// Add the event listener to start the game
document.addEventListener("DOMContentLoaded", () => {
    addStartGameListener();
});

function addStartGameListener() {
    document.addEventListener("keydown", startGameOnKeyPress, { once: true });
}

function startGameOnKeyPress() {
    // Only allow starting a new game
    if (!gameInProgress) { 
        gameInProgress = true;
        popSquare();
    }
}

function popSquare(){
    levelCount++;
    gameText.innerHTML = "Level "+levelCount;

    // Selecting a random square and adding to the sequence
    const num = Math.floor(Math.random()*4)+1;
    orderList.push(num);
    audioList[num].play();

    // Pop the selected square
    const currentSquare = list[num];
    currentSquare.style.opacity = "0";
    setTimeout(() => {
        currentSquare.style.opacity = "1";
    }, 150);
}

function handleClick(key) {
    if(!gameInProgress) return; // Ignore clicks if the game hasn't started

    inputList.push(key);
    audioList[key].play();
    
    // Check if the input matches the sequence
    const currentIndex = inputList.length - 1;
    if (inputList[currentIndex] !== orderList[currentIndex]) {
        gameOver();
        return;
    }

    // If the sequence is completed, proceeding to the next level
    if (inputList.length === orderList.length && inputList.length!=0) {
        inputList = []; 
        setTimeout(() => popSquare(), 600); 
    }
}

function gameOver(){
    lossSound.play();
    gameText.innerHTML = "Game Over! Press any key to Restart";
    orderList = []; //Reset game sequence list
    inputList = [];
    levelCount = 0;
    gameInProgress = false;

    // Temporarily change the background color
    document.documentElement.style.setProperty("--bg-color", "red");
    setTimeout(() => {
        document.documentElement.style.setProperty("--bg-color", "rgb(16, 35, 69)");
    }, 150);

    addStartGameListener(); // Restart game
}
