const playBoard = document.querySelector(".tableBoard");
const scoreCount= document.querySelector(".score");
const scoreMax= document.querySelector(".maxScore");

let gameOver= false;
let speedX= 0, speedY=0;
let foodY, foodX;
let snakeY = 15, snakeX = 15;
let snakeTail =[];
let setIntervalId ;
let score=0;

let maxScore= localStorage.getItem("maxScore")||0;
scoreMax.innerHTML = `Max Score:  ${maxScore}`;

const gameOverAct = () => {
    
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();

}
const foodPosition = () => {
    foodY = Math.floor(Math.random() * 30) + 1;
    foodX = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (e) => { 
    console.log(e);
    if(e.key==="ArrowUp" || e.key==="w" ){
        if(speedY != 1){
        speedX= 0;
        speedY= -1;}
    }else if(e.key==="ArrowDown" || e.key==="s"){
        if(speedY != -1){
        speedX= 0;
        speedY= 1;}

    }else if(e.key==="ArrowLeft" || e.key==="a"){
        if(speedX != 1){
        speedX= -1;
        speedY= 0;}
    }else if(e.key==="ArrowRight" || e.key==="d"){
       if(speedX != -1){
        speedX= 1;
        speedY= 0;}
    } 
    // initGame();
}

const initGame = () => {
   if(gameOver) return gameOverAct();
     
    let htmlMarkUp = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX===foodX && snakeY===foodY){
        foodPosition();
        snakeTail.push([foodX,foodY]);
        score++;
        
        maxScore = score>= maxScore ? score : maxScore;
        localStorage.setItem("maxScore", maxScore);
        scoreCount.innerHTML = `Score: ${score}`;
        scoreMax.innerHTML = `Max Score:  ${maxScore}`;
    } 
        
    for(let i = snakeTail.length - 1; i > 0; i--){
        snakeTail[i]=snakeTail[i - 1]; 
    }
    
    snakeTail[0]=[snakeX,snakeY];



    snakeX += speedX;
    snakeY += speedY;
    
    
    
    
    if(snakeX <= 0||snakeX > 30||snakeY <= 0||snakeY > 30){
        gameOver= true;
    }
    
   


    for(let i=0; i < snakeTail.length;i++){
        htmlMarkUp += `<div class="snakeHead" style="grid-area: ${snakeTail[i][1]} / ${snakeTail[i][0]}"></div>`;
       
        if(i !== 0 && snakeTail[0][1] === snakeTail[i][1] && snakeTail[0][0] === snakeTail[i][0]){
        gameOver= true;
    }
    

}

     
 
    playBoard.innerHTML = htmlMarkUp;
    
}
foodPosition();
// initGame();
setIntervalId= setInterval(initGame,125);
document.addEventListener("keydown", changeDirection);