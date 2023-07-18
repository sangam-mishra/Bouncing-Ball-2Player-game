/*This JS file is for a two player setup in the bouncing ball game*/

//this variable is to store the ball count
const para=document.querySelector("#ballCount");
//displays the score of player 1
const player1=document.querySelector("#player1");
//displays the score for player 2
const player2=document.querySelector("#player2");
//this will show the restults in center after the game ends
const flash=document.querySelector("#result");
//keeps count for total balls
let totalCount=0;


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
//this is a universal class that we made coz both circles and evilcircle has this common property
class Shape{

    constructor(x, y, velX, velY){

        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

//these class define the random balls
class Ball extends Shape {

    constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY);
  
      this.color = color;
      this.size = size;
      this.exists = true;
    }
    //it creates them
    draw() {
        //used to start drawing
        ctx.beginPath();
        ctx.fillStyle = this.color;
        //we are drawing a circle here
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
      //if collision is detected we will change the color of the balls
      collisionDetection(){
        for(const ball of balls){
            if(!(this===ball) && ball.exists){
                //this algo is used to find distance between the two circles(evilball and normal ball)
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
//we are defining a evilcircle class here
  class evilCircle extends Shape{
    constructor(x,y){
        super(x,y,50,50);
        this.color=color;
        this.size=10;
        this.score=0;

       
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle=this.color;
        ctx.lineWidth=3;
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
        ctx.stroke();
    }
    checkBounds(){
        if(this.x + this.size >= width){
            this.x=width-this.size;
        }
        if(this.x - this.size <= 0){
            this.x=0+this.size;
        }
        if(this.y + this.size >= height){
            this.y=height-this.size;
        }
        if(this.y - this.size <= 0){
            this.y=0+this.size;
        }
    }
    collisionDetection(){
        for(const ball of balls){
            if(ball.exists){
                const dx=this.x-ball.x;
                const dy=this.y-ball.y;
                const distance=Math.sqrt(dx*dx + dy*dy);

                if(distance <= this.size + ball.size){
                    ball.exists=false;
                    totalCount--;
                    this.score++;
                }
            }
        }
    }

  }
  

//making an array of balls to handel data properly
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
  totalCount++;
  

}
//initializing player 1's evilcircle
const evilcircle= new evilCircle(
    random(0,width),
random(0,height),
 color="white",
 window.addEventListener("keydown",(e)=>{
    switch(e.key){
        case("a"):
        evilcircle.x -= evilcircle.velX;
        break;
        
        case("w"):
        evilcircle.y -= evilcircle.velY;
        break;

        case("d"):
        evilcircle.x += evilcircle.velX;
        break;

        case("s"):
        evilcircle.y+=evilcircle.velY;
        break;
    }

}));
//initializing player 2's evilcircle
const evilcircle2=new evilCircle(
    random(0,width),
    random(0,height),
    color="red",
    window.addEventListener("keydown",(e)=>{
        switch(e.key){
            case("ArrowLeft"):
                evilcircle2.x-=evilcircle2.velX;
                break;
            case("ArrowRight"):
            evilcircle2.x+=evilcircle2.velX;
            break;
            case "ArrowUp":
                evilcircle2.y -= evilcircle2.velY;
                break;
            case "ArrowDown":
                evilcircle2.y += evilcircle2.velY;
                break;  
        }
    })
    );  

//Most important function that renders and refresh each frame

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0,0.25)";
    ctx.fillRect(0, 0, width, height);


  
    for (const ball of balls) {
        if(ball.exists){
      ball.draw();
      ball.update();
      ball.collisionDetection();
    }
}
evilcircle.draw();
evilcircle.checkBounds();
evilcircle.collisionDetection();
player1.textContent="Player 1:"+evilcircle.score;
evilcircle2.draw();
evilcircle2.checkBounds();
evilcircle2.collisionDetection();
player2.textContent="Player 2:"+evilcircle2.score;

para.textContent = "Ball Count:" + totalCount;
if(totalCount===0){
    if(evilcircle.score>evilcircle2.score){
        flash.textContent="Player 1 WINS";
    }
    else if(evilcircle.score<evilcircle2.score){
        flash.textContent="Player 2 WINS";
    }
    else{
        flash.textContent="It's a DRAW";
    }
}

  //this makes it a recursive function and renders it properly for a smooth experience
    requestAnimationFrame(loop);
  }
  
  loop();
  