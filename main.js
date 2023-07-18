

/*this JS is only for defining random balls on a screen without a evilcircle.
if you want a script of a two player game that includes evilcircle, please open
advance-main.js form the branch*/



const canvas=document.querySelector("canvas");
//this gives the idea that we are developing a 2d picture using the canvas function
const ctx=canvas.getContext("2d");
//these lines define the viewport of the canvas element 
const width=canvas.width=window.innerWidth;
const height=canvas.height=window.innerHeight;

/*this function helps to return a random variable for the ball size
if you give it a minimum and maximum ball size*/
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

/*this function return a random color of rgb value*/
function randomRGB(){
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}


class Ball {
    constructor(x, y, velX, velY, color, size) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
      }
      
    //it updates the position of the ball and makes it bounce of the edges
    update() {
        if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
        }
      
        if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
      
        if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
        }
      
        if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
      }
      collisionDetection(){
        for(const ball of balls){
            if(this!==ball){
                const dx=this.x-ball.x;
                const dy=this.y-ball.y;
                const distance=Math.sqrt(dx*dx+dy*dy);
            
            if(distance<this.size+ball.size){
                this.color=randomRGB();
                ball.color=randomRGB();
            }
        }
    }
}
  }
  const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

  function loop() {
    ctx.fillStyle = "rgba(0, 0, 0,0.25)";
    ctx.fillRect(0, 0, width, height);
  
    for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetection();
    }
  
    requestAnimationFrame(loop);
  }
  
  loop();
  