let gameText =  document.getElementById("gameText");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");

let orderList = []; 
let inputList = []; 
let levelCount = 0;


const list = {
    1: green,
    2: red,
    3: yellow,
    4: blue
};

const audioList = {
    1: new Audio("audioFiles/green.mp3"),
    2:  new Audio("audioFiles/red.mp3"),
    3: new Audio("audioFiles/yellow.mp3"),
    4: new Audio("audioFiles/blue.mp3")
};
const lossSound = new Audio("audioFiles/lose.wav");

handleKeyPress();


function handleKeyPress(){
    document.addEventListener("DOMContentLoaded", ()=>{
        document.addEventListener("keydown", () => startGame(popSquare));
    })
}

function startGame(popSquare){
    document.removeEventListener('keydown', startGame); 
    popSquare();
}

function popSquare(){
    levelCount++;
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
    if(levelCount==0) return;
    inputList.push(key);

    audioList[key].play();
    
    const currentIndex = inputList.length - 1;
    if (inputList[currentIndex] !== orderList[currentIndex]) {
        gameOver();
        return;
    }

    if (inputList.length === orderList.length && inputList.length!=0) {
        
        inputList = []; 
        setTimeout(() => popSquare(), 600); 
    }
}

function gameOver(){
    lossSound.play();
    gameText.innerHTML = "Game Over! Press any key to Restart";
    orderList = [];
    inputList = [];
    levelCount = 0;
    handleKeyPress();
}
