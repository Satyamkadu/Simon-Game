let gameSeq = [];
let userSeq = [];
let hScore = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let highScore  = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");


document.addEventListener("keypress",()=>{
    if(started==false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx= Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout(levelUp,1000);
        }
    } else {
        hScore.push(level*25);

        for(let i=0;i<hScore.length;i++){
            if(highScore < hScore[i]){
                highScore = hScore[i];
            }
        }
        h2.innerHTML = `<b>Your highest score is : ${highScore}</b>`;
        h3.innerHTML = `<b>Game Over!</b> <br> <b>Level ${level}</b> <br> Your score is <b>${level*25}</b><br> Press any key to start the game.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameseq = [];
    userSeq = [];
    level = 0;
}