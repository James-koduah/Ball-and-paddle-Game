const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 450;
let canW = canvas.width;
let canH = canvas.height;
//Speed sets the refresh interval to the number of miliseconds always at a default of six.(i.e sets the speed of the game)
//The speed variable can be increased by the speedup button and decreased by the speeddown button;
let speed = 6;
let playerscore = 0;
//For re-application in various parts of the code the variables are given set values in setvariables() function.
//This is so that when the are changed in any part of the code they can simply be reset to their original value. 
let x,y,dy,dx,interval,paddleY,paddleX,paddleW;
let radius=30;
let example;
let rightpress = false;
let leftpress = false;
let uppress = false;
let downpress = false;
let brickH = 20;
let brickW = 60;
let brickX = 100;
let brickY = 35;
let bz = 1;



setvariables();
drawCircle();
drawPaddle();
keyboardnavigation();
drawBricks();


//Starts and runs the game.
function startgame(){
    if (!interval){
    interval = setInterval(() => {
        if(rightpress){
            paddleX = paddleX + 3;
            
        }
        if(leftpress){
            paddleX = paddleX - 3;
        }
        if(uppress){
            paddleY -= 3;
            example += 3
        }
        if(downpress){
            paddleY += 3;
            example -= 3
        }
        x = x + dx;
        y += dy;
        brickY += bz;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        detectcollision();
        gameOver()
        drawCircle();
        drawPaddle();
        drawBricks();
        score();
        let yy = document.getElementById('ii')
        yy.innerHTML = `Speed : ${speed}`
    },speed);
    
    }
}

//Controls the paddle movement.
function keyboardnavigation(){
    document.addEventListener('keydown', handlekeyDown)
    document.addEventListener('keyup', handlekeyUp)
    //keydown means when a button is pressed.
    //As long as a button is pressed the designated variable has a value of true.
    function handlekeyDown(e){
        if(e.key === 'ArrowRight'){
        rightpress = true
        }
        if(e.key === 'ArrowLeft'){
            leftpress = true;
            }
        if (e.key === 'Enter'){
            startgame();
        }
        if (e.key === 'ArrowUp'){
            uppress = true;
            startgame();
        }
        if (e.key === 'ArrowDown'){
            downpress = true;
        }
    }

    //keyup means when a button is released.
    //As long as a keyboard button is not being pressed the designated variable has a value of false.
    function handlekeyUp(e){
        if(e.key === 'ArrowRight'){
            rightpress = false
            }
        if(e.key === 'ArrowLeft'){
            leftpress = false
            }
        if (e.key === 'ArrowUp'){
            uppress = false;
        }
        if (e.key === 'ArrowDown'){
            downpress = false;
        }
}
}


//As the name suggests this function is used to control the behaviour of the ball if it hits a certain part of the canvas.
function detectcollision(){
    //In the setinterval animation dx is constantly added to x.
    //If x + dx is greater than or less than the canvas width it should bounce back.
    //If dx is positive the ball will move right and if dx is negative the ball will move left.
    //This means dx will become opposite value.
    if(x + dx >canW || x + dx < 0){
        dx = -dx;
    }
    
    //If the ball hits the top of the paddle it bounces back up.
    //canH is the canvas height. 
    //example is the y point of the paddle calculated from the bottom of the canvas
    //
    if (y + dy > (canH - example) && y + dy < (paddleY + radius)){
        if(x + dx > paddleX && x + dx < (paddleX + paddleW )){
        dy = -dy
        }
    }

    //If the ball hits the side of the paddle it bounces back.
    if (x + dx >= (paddleX) && x + dx <= (paddleX + paddleW)){
        if(y + dy > paddleY && y + dy < (paddleY + radius )){
            dy = -dy
            dx = -dx
        }
    }
    
    //In the setinterval animation dy is constantly added to y.
    //If y + dy is greater than or less than the canvas height it should bounce back.
    //If dy is positive the ball will move down and if dy is negative the ball will move up.
    //This means dy will become opposite value.
    if(y + dy >canH || y + dy < 0){
        dy = -dy;
    } 
}

//The obstacles and their functionality.
function drawBricks(){
    
    //The number of bricks.
    for(let i = 0; i <= 3 ; i++){
        ctx.beginPath();
        ctx.rect((brickX * i) ,brickY,brickW,brickH)
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke()
        ctx.closePath();
        brickcollision(i);
    }
    

    function brickcollision(i){
        if (y + dy < (brickY + brickH)  && y + dy > brickY){
            if(x + dx > (brickX * i) && x + dx < ((brickX * i) + brickW )){
            dy = -dy
            }
        }
        if (x + dx >= (brickX * i) && x + dx <= ((brickX * i) + brickW)){
            if(y + dy > brickY && y + dy < (brickY + brickH )){
                dy = -dy
                dx = -dx
            }
        }
        if (brickY + bz >250 || brickY + bz < 35){
            bz = -bz
        }
        
    }
    
    
}

//When the ball touches the bottom of the canvas.
function gameOver(){
    let sce = document.getElementById('yy');
    if(y === canH){
        clearInterval(interval);
         setvariables()
         interval=null
         if (playerscore > 0){
            playerscore -= 5;
            sce.innerHTML = `Score : ${playerscore} (-5)`
        }
     }
     
     
}

//For the ball.
function drawCircle(){
    ctx.beginPath();
    ctx.arc(x,y,20,0,2 * Math.PI,false)
    ctx.fillStyle = "wheat";
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

//For the paddle.
function drawPaddle(){
    
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleW,radius)
    ctx.fillStyle = "rgb(14,209,69)";
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

//To speed up the game.
function speedup(){
    if(speed > 1){
        speed = speed - 1;
    }
    let yy = document.getElementById('ii')
    yy.innerHTML = `Speed : ${speed}`
}

//To reduce the speed of the game.
function speeddown(){
    if(speed >= 1){
        speed = speed + 1;
    }
    let yy = document.getElementById('ii')
    yy.innerHTML = `Speed : ${speed}`
}


function score(){
    let scor = document.getElementById('yy')
    if(y + dy <= 0){
        playerscore += 1;
        scor.innerHTML = `Score : ${playerscore}`
    }
}

//To reset the variables after they have been changed during the game.
function setvariables(){
    x=canW/2;
    y = canH - 50 ;
    dx = 2;
    dy = -2;
    example = 25;
    paddleW = 90;
    paddleX = canW/2 - paddleW/2
    paddleY = canH - example;
}