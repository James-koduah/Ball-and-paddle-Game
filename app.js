const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 450;
let canW = canvas.width;
let canH = canvas.height;
let speed = 6;

let rightpress = false;
let leftpress = false;
let uppress = false;
let downpress = false;

document.addEventListener('keydown', handlekeyDown)
document.addEventListener('keyup', handlekeyUp)


 


let x,y,dy,dx,interval,paddleY,paddleX,paddleW;
let radius=30;
let example;
setvariables()


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
    }
    if (e.key === 'ArrowDown'){
        downpress = true;
    }
}
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



drawCircle();
drawPaddle();


function detectcollision(){
    if(x + dx >canW || x + dx < 0){
        dx = -dx;
    }
    
    if (y + dy > (canH - example) && y + dy < (paddleY + radius)){
        if(x + dx > paddleX && x + dx < (paddleX + paddleW )){
        dy = -dy
        }
    }
    if(y + dy >canH || y + dy < 0){
        dy = -dy;
    } 
}

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
        detectcollision();
        gameOver()
        x = x + dx;
        y += dy;
        ctx.clearRect(0,0,canvas.width,canvas.height)
        drawCircle();
        drawPaddle();
        let yy = document.getElementById('ii')
        yy.innerHTML = `Speed : ${speed}`
    },speed);
    }
}


function gameOver(){
    if(y === canH){
        clearInterval(interval);
         setvariables()
         interval=null
     }
}

function drawCircle(){
    ctx.beginPath();
    ctx.arc(x,y,15,0,2 * Math.PI,false)
    ctx.fillStyle = "rgb(14,209,69)";
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

function drawPaddle(){
    
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleW,radius)
    ctx.fillStyle = "rgb(14,209,69)";
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

function speedup(){
    if(speed > 1){
        speed = speed - 1;
    }
    let yy = document.getElementById('ii')
    yy.innerHTML = `Speed : ${speed}`
}
function speeddown(){
    if(speed >= 1){
        speed = speed + 1;
    }
    let yy = document.getElementById('ii')
    yy.innerHTML = `Speed : ${speed}`
}

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