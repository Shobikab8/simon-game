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

function popSquare(){
    const num = Math.floor(Math.random()*4)+1;
    console.log(list[num])  
}
let levelCount = 1;
document.addEventListener("DOMContentLoaded", ()=>{
    document.addEventListener("keydown", (e) => startGame( e, popSquare))
})

async function startGame(event, callback){
    console.log("key pressed is "+event.key)
    gameText.innerHTML = "Level "+levelCount;
    document.removeEventListener('keydown', startGame);
    callback();
}

