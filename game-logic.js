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
     

    currentSquare.style.opacity = "0";
    
    setTimeout(() => {
        currentSquare.style.opacity = "1";
    }, 150);
}

function handleClick(key) {
    inputList.push(key);
    
    const currentIndex = inputList.length - 1;
    if (inputList[currentIndex] !== orderList[currentIndex]) {
        gameText.innerHTML = "Game Over! Press any key to Restart";
        orderList = [];
        inputList = [];
        levelCount = 1;
        handleKeyPress();
        return;
    }

    if (inputList.length === orderList.length && inputList.length!=0) {
        levelCount++;
        inputList = []; 
        popSquare(); 
    }
}

