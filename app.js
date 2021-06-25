const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'white';

const speed = 3.5;
let score = 0;
let time = 60;
setInterval(() => {time -= 1}, 1000)

class Player {
  constructor() {
    this.x = (canvas.width / 2) - 45;
    this.y = (canvas.height) - 20;
    this.xVel = 0;
    this.width = 90;
    this.height = 10;
  }

  draw() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.stroke();
  }

  update() {

    if(this.x > canvas.width){
      this.x = -(this.width);
    }

    if(this.x < -(this.width)){
      this.x = canvas.width;
    }

    this.x = this.x + this.xVel;
    this.draw()
  }
}

class Ball {
  constructor(x, y) {
    this.x = canvas.width / 2;
    this.y = 20;
    this.xVel = 0;
    this.yVel = 0;
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, false)
    ctx.fillStyle = 'red';
    ctx.fill()
    ctx.closePath()
  }

  update() {

    if(this.x > canvas.width - 20) {
      this.xVel *= -1;
    }

    if(this.x < 20){
      this.xVel *= -1;
    }

    if(this.y < 0){
      this.yVel *= -1;
    }

    this.yVel += 0.05;

    this.x += this.xVel;
    this.y += this.yVel;
    this.draw()
  }
}

class Block {
  constructor(x, y) {
    this.x = Math.random() * canvas.width;
    this.y = (Math.random() * canvas.height - 150);
    this.width = 20;
    this.height = 20;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  update() {
    this.draw();
  }
}

window.addEventListener('touchstart', (e) => {
  if(e.touches[0].clientX > canvas.width / 2){
    player.xVel +=1;
  } else if (e.touches[0].clientX < canvas.width / 2){
    player.xVel -= 1;
  }
})

const player = new Player;
const ball = new Ball;
const blocks = [];

for(let i = 0; i < 50; i++){
  const block = new Block;
  blocks.push(block);
}

function endgame(){

  if(score < 5){
  alert(`Score: ${score} - beginners stuff! Press OK to play again.`);
  }

  if(score > 5 && score < 10){
  alert(`Score: ${score} - meh! Press OK to play again.`);
  }

  if(score > 10 && score < 20){
  alert(`Score: ${score} - getting there! Press OK to play again.`);
  }

  if(score > 20 && score < 40){
  alert(`Score: ${score} - good stuff! Press OK to play again.`);
  }

  if(score > 40){
  alert(`Score: ${score} - pro! Press OK to play again.`);
  }

  console.log('hi');
  document.location.reload();

}

function animate() {

  if(ball.y < canvas.height - 20){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update();
    ball.update();
    blocks.forEach((block) => block.update())

    if(
      // conditions
      (Math.abs(ball.y - player.y) < 15)
      &&
      ((ball.x > (player.x))
      &&
      (ball.x < (player.x + (player.width))))
      ){
      ball.yVel *= -1;
      ball.xVel += player.xVel;
    }

    blocks.forEach((block) => {

      let blockIndex = blocks.indexOf(block);

      let xDistance = Math.abs(block.x - ball.x);
      let yDistance = Math.abs(block.y - ball.y);
      let distance = Math.sqrt(((xDistance)**2) + ((yDistance)**2))

      if(
          distance < 30
        ){
        blocks.splice(blockIndex, 1);
        score += 1;
      }

    })

    ctx.font = "15px Arial";
    ctx.fillText("Score: " + score, 10, 50);
    ctx.fillText("Time: " + time, 10, 80);

  } else {
    endgame();
  }

}

animate();









