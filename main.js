let ball, paddle;
let no_of_bricks;
let nrows = 5, bricks = [];
let score = 0;
function preload(){
 img = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzpfS9UkYfsbODx5LgSeI6Ehaci7JyS6vXkD-FKimYeBwMWXyt");
}
function setup(){
    img.loadPixels();
    c = createCanvas(windowWidth, windowHeight);
    c.position(0, 0);
    
    //create a ball object
    ball = new Ball();

    //create a paddle object
    paddle = new Paddle();

    //create the bricks object
    no_of_bricks = Math.floor(width/100);
    for(var i = 0 ; i < nrows; i++){
        for(var j = 0 ; j < no_of_bricks; j++){
            let padding = (width - no_of_bricks * 100) / 2;
            bricks.push(new Brick(j * 100 + padding, i * 40 + 50));
        }
    }
}

function draw(){
    //background(0);
    image(img, 0, 0, width, height);
    
    //ball
    ball.display();
    ball.move();
    ball.bounce(paddle);
    
    //score
    drawScore();

    //bricks
    for(var i = 0 ; i < bricks.length; i++){
        if(bricks[i].status == 1){
            bricks[i].show();
            if(ball.collision(bricks[i])){
                ball.dy *= -1;
                bricks[i].status = 0;
            }
        }
    }

    //paddle
    paddle.display();
    paddle.update();
}

function drawScore(){
    textSize(25);
    fill(255);
    text('Score: ' + score, 10, 30);
    if(score == no_of_bricks * nrows){
        textSize(50);
        fill(0, 255, 0);
        text('You Win', width/2-100, height/2+30);
        noLoop(); //stop rendering
    }
}

function Brick(x, y){
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 40;
    this.color1 = random(0, 255);
    this.color2 = random(0, 255);
    this.color3 = random(0, 255);
    this.status = 1;

    this.show = function(){
        strokeWeight(2);
        stroke(0);
        fill(this.color1, this.color2, this.color3);
        rect(this.x, this.y, this.w, this.h);
    }
}

function Ball(){
    this.x = width/2;
    this.y = height/2;
    this.r = 15;
    this.dx = 2;
    this.dy = -2;
    this.color = '#ffffff';

    this.move = function(){
        this.x += this.dx;
        this.y += this.dy;
    }

    this.bounce = function(other){
        if(this.x + this.r > width || this.x - this.r < 0){
            this.dx *= -1;
        }
        if(this.y - this.r < 0){
            this.dy *= -1;
        }
        //collision of ball with paddle
        if(this.y + other.h > height){
            if(this.x + this.r >= other.x && this.x - this.r <= other.x + other.w){
                this.dy *= -1;
            }
            else{
                textSize(50);
                fill(255, 0, 0);
                text('Game Over', width/2-120, 300);
                noLoop();  //stop rendering
            }
        }
    }

    this.display = function(){
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.r*2);
    }
    
    //collision of ball with bricks
    this.collision =  function(other){
        if(this.x + this.r >= other.x && this.x - this.r <= other.x + other.w && this.y >= other.y && this.y <= other.y + other.h){
            score++;
            return true;
        }
        return false;
    }

}

function Paddle(){
    this.x = width/2;
    this.y = height-18;
    this.w = 120;
    this.h = 18;
    this.color = "#2196ef";

    this.update = function(){
        if(mouseX + this.w >= width){
            this.x = width-this.w;
        }
        else{
            this.x = mouseX;
        }
    }

    this.display = function(){
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }
}
