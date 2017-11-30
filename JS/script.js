const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight - 10;
canvas.width = window.innerWidth - 10;

const players = [
  player1 = {
    x: 10,
    y: 100,
    height: 100,
    width: 20,
    up: false,
    down: false,
    score: 0
  },
    player2 = {
        x: canvas.width - 30,
        y: 100,
        height: 100,
        width: 20,
        up: false,
        down: false,
        score: 0,
    },
    ball = {
        x: 50,
        y: 100,
        height: 7,
        width: 7,
        xDir: 1,
        yDir: 1,
        speed: 5
    }
];

function drawer(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
    ctx.font = '40px Arial';
    ctx.fillText(player1.score, 780, 100);
    ctx.fillText(player2.score, 1000, 100);
    gic_drawer();
}

function updater(){
    if(ball.x >= canvas.width - ball.width){
        ball.xDir = -1;
    }else if(ball.x <= 0){
        ball.xDir = 1;
    }

    if(ball.y >= canvas.height - ball.height){
        ball.yDir = -1;
    }else if(ball.y <= 0){
        ball.yDir = 1;
    }

    lost_checker();
    keyboard_movement_detector();
    collisionChecker();

    ball.x = ball.x + ball.xDir * ball.speed;
    ball.y = ball.y + ball.yDir * ball.speed;
}
function render(){
    drawer();
    updater();


    requestAnimationFrame(render);
}

render();
const upKey = 38;
const downKey = 40;
const w = 87;
const s = 83;

document.addEventListener('keydown', function(event) {
    if(event.keyCode === upKey) {
        player1.up = true;
    }else if(event.keyCode === downKey) {
        player1.down = true;
    }

    if(event.keyCode === w) {
        player2.up = true;
    }else if(event.keyCode === s) {
        player2.down = true;
    }
}, false);

document.addEventListener('keyup', function(event) {
    if(event.keyCode === upKey) {
        player1.up = false;
    }else if(event.keyCode === downKey) {
        player1.down = false;
    }

    if(event.keyCode === w) {
        player2.up = false;
    }else if(event.keyCode === s) {
        player2.down = false;
    }
}, false);

function collisionChecker(){
    if(ball.x <= 30 && ball.y >= player1.y && ball.y <= player1.y + player1.height){
        ball.xDir = 1;
        document.getElementById('point').play();
    }

    if(ball.x >= canvas.width - 30 && ball.y >= player2.y && ball.y <= player2.y + player2.height){
        ball.xDir = -1;
        document.getElementById('point').play();
    }
}

function keyboard_movement_detector(){
    if(player1.up === true && player1.y >= 0){
        player1.y = player1.y - 10;
    }

    if(player1.down === true && player1.y <= canvas.height - player1.height){
        player1.y = player1.y + 10;
    }

    if(player2.up === true && player2.y >= 0){
        player2.y = player2.y - 10;
    }

    if(player2.down === true && player2.y <= canvas.height - player2.height){
        player2.y = player2.y + 10;
    }
}

function lost_checker(){
    if(ball.x <= 0){
        document.getElementById('die').play();
        player2.score ++;
        restart();
    }

    if(ball.x >= canvas.width - ball.width){
        document.getElementById('die').play();
        player1.score ++;
        restart();
    }
}

function restart(){
    ball.x = 900;
    ball.y = 450;
}

function gic_drawer(){
    ctx.fillRect(900, 0, 2, canvas.height);
}


