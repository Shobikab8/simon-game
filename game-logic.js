let gameText =  document.getElementById("gameText");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");
const list = {
    1: green,
    2: red,
    3: yellow,
    4: blue
};
let orderList = [];
let inputList = [];
let levelCount = 1;
handleKeyPress();

const greenSound = new Audio("audioFiles/green.mp3");
const redSound = new Audio("audioFiles/red.mp3");
const yellowSound = new Audio("audioFiles/yellow.mp3");
const blueSound = new Audio("audioFiles/blue.mp3");
const lossSound = new Audio("audioFiles/lose.wav");

const audioList = {
    1: greenSound,
    2: redSound,
    3: yellowSound,
    4: blueSound
};

function handleKeyPress(){
    document.addEventListener("DOMContentLoaded", ()=>{
        document.addEventListener("keydown", () => startGame(popSquare));
    })
}

function startGame(callback){
    document.removeEventListener('keydown', startGame);
    callback();
}

function popSquare(){
    gameText.innerHTML = "Level "+levelCount;
    const num = Math.floor(Math.random()*4)+1;
    const currentSquare = list[num];
    orderList.push(num);
    audioList[num].play();
    currentSquare.style.opacity = "0";
    
    setTimeout(() => {
        currentSquare.style.opacity = "1";
    }, 150);
}

function handleClick(key) {
    inputList.push(key);
    const currentSquare = list[key];
    const currentColor = window.getComputedStyle(currentSquare).backgroundColor;
    currentSquare.style.backgroundColor = "gray";
    
    setTimeout(() => {
        currentSquare.style.backgroundColor = currentColor;
    }, 150);

    audioList[key].play();
    const currentIndex = inputList.length - 1;
    if (inputList[currentIndex] !== orderList[currentIndex]) {
        gameOver();
        return;
    }

    if (inputList.length === orderList.length && inputList.length!=0) {
        levelCount++;
        inputList = []; 
        setTimeout(() => popSquare(), 1000); 
    }
}

function gameOver(){
    lossSound.play();
    gameText.innerHTML = "Game Over! Press any key to Restart";
    orderList = [];
    inputList = [];
    levelCount = 1;
    handleKeyPress();
}
