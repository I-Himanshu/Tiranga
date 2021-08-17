alert("MouseOver on PARTICLES To See Effect");
var canvas, ctx, cangle, newflag;
var PARTICLES = [];
var chakraDataArray = [
  [],
  []
];
chakra = {};
var mouse = {
  x: undefined,
  y: undefined,
  r: 80
}
cangle = 1;
var flag = {
  x: 30,
  y: 40,
  h: 50,
  w: 250
}
function init() {
  canvas = document.querySelector(".canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx = canvas.getContext("2d");
  ctx.translate(0, 0);
  PARTICLES =[];
  chakraDataArray =[[]]
  draw();
  createParticles();
  animate();
}
window.addEventListener("load", init)
window.addEventListener("resize", init)
function mousemove(e) {
  if(e.x){
      mouse.x = e.x;
      mouse.y = e.y;
  }else{
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  }
}

function mouseend() {
  mouse.x = undefined;
  mouse.y = undefined;
}
window.addEventListener("touchmove", mousemove);
window.addEventListener("mouseover", mousemove);

window.addEventListener("touchend", mouseend);
window.addEventListener("mouseout", mouseend);

function random(min, max) {
  return min + Math.random()*(max-min);
}

class Rect {
  constructor(x, y, color = "black") {
    this.x = x;
    this.y = y;
    this.w = flag.w;
    this.h = flag.h;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    for (var i = this.x; i < this.x + this.w; i += 7) {
      for (var j = this.y; j < this.y + this.h; j += 7) {
        PARTICLES.push(new Particle(i, j, this.color,1.3,true))
      }
    }
  }
}
class Flag {
  constructor(x, y) {
    this.red = new Rect(x, y, "#FF9933");
    this.white = new Rect(this.red.x, this.red.y + this.red.h, "#ffffff");
    this.green = new Rect(this.white.x, this.white.y + this.white.h, "#138808");
  }
  drawStrips() {
    this.red.draw();
    this.white.draw();
    this.green.draw();
  }
  chakra() {
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 1;
    let cy = this.white.y + (this.white.h/2);
    let cx = this.white.x + this.white.w/2;
    let cr = this.white.h/2;
    chakra = {
      cx: cx,
      cy: cy,
      cr: cr
    };
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, 6.29);
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    ctx.translate(cx, cy);
    cangle += 0.3*Math.PI/180;
    ctx.rotate(cangle);
    for (let i = 0; i < 24; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -cr);
      ctx.stroke()
      ctx.closePath()
      ctx.rotate(15 * Math.PI / 180)
    }
    ctx.restore();
  }
  stick() {
    let x = this.red.x-5;
    let y = this.red.y-20;
    for (var j = y; j < y+550; j += 3) {
       for (var i = x; i < x+8; i += 3) {
       
       let color = `rgb(${160},${30},${80})`;
        PARTICLES.push(new Particle(i, j, color))
        
      }
    }
  }
}
function draw() {
  newflag = new Flag( flag.x, flag.y);
  newflag.drawStrips()
  newflag.stick();
  newflag.chakra();
}

class Particle {
  constructor(x, y, color = "#FF9933", size = 1.3,wave = false) {
    this.x = x;
    this.y = y;
    this.startX = this.x;
    this.startY = this.y;
    this.size = size*5;
    this.color = color;
    this.sangle = 2;
    this.wave = wave;
    this.mouseExtR = random(1,10);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.fill();
    ctx.closePath();
  }
  update() {
      if(this.wave){
        let sin = Math.sin(this.x/30 + this.sangle * Math.PI / 180);
        this.y += sin*0.5;
        this.sangle += 3;
        this.x += sin/8;
    }
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let forceX = dx/distance;
    let forceY = dy/distance;
    if (distance < mouse.r + this.mouseExtR) {
      this.x += forceX;
      this.y += forceY;
    } else {
      if (this.x != this.startX) {
        var farX = this.x - this.startX;
        this.x -=  farX/50;
      }
      if (this.y != this.startY) {
        var farY = this.y - this.startY;
        this.y -= farY/50;
      }
    }
    
  }
  destroy() {
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height);
  }
}


function createParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var R_DATA = [];
  var W_DATA = [];
  var G_DATA = [];
  ctx.strokeStyle = "#0000FF";
  ctx.fillStyle = "#FF0000";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("I", 100, 40);
  pixelManipulation(ctx.getImageData(0, 0, canvas.width, canvas.height), "#FF9933");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText("L O V E", 100, 60); pixelManipulation(ctx.getImageData(0, 0, canvas.width, canvas.height), "#FFFFFF");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  
  ctx.save();
  ctx.font = "50px Arial";
  //makeChakra(100, 52, 6);
  ctx.scale(1,1);
  ctx.fillText("♥️", 100, 60);
  var chakraData = pixelManipulation(ctx.getImageData(0, 0, canvas.width, canvas.height), "blue", 0.3,scale=1,plusX=-140,plusY=310);
  ctx.restore();
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  
  ctx.fillText("INDIA", 100, 83);
  pixelManipulation(ctx.getImageData(0, 0, canvas.width, canvas.height), "#00FF00");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /*
For Amazing Chakra
*/
  ctx.save();
  ctx.font = "10px Arial";
  makeChakra(chakra.cx, chakra.cy, flag.h/2);
  ctx.restore();
  var chakraData = pixelManipulation(ctx.getImageData(0, 0, canvas.width, canvas.height), "blue", 0.5); ctx.clearRect(0, 0, canvas.width, canvas.height);


  

  for (var i = 0; i < chakraData.length; i++) {
    chakraDataArray[0].push(new Particle(0 + chakraData[i][0]*1, 0+ chakraData[i][1]*1, "#0000FF",0.5,true))
  }
  for(var j=0;j<30;j++){
    for(var i=0;i<canvas.width;i+=10){
        PARTICLES.push(new Particle(
            i
            ,
            canvas.height+2-2*j,
            "blue",
            1,
            true
        ))
    }
  }
  for (var i = 0; i < PARTICLES.length; i++) {
    PARTICLES[i].destroy()
  }
}



function makeChakra(cx, cy, cr) {
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(cx, cy, cr, 0, 6.29);
  ctx.stroke();
  ctx.closePath();
  ctx.save();
  ctx.translate(cx, cy);
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -cr);
    ctx.stroke()
    ctx.closePath()
    ctx.rotate(30 * Math.PI / 180)
  }
  ctx.restore();
}
function pixelManipulation(imageData, color = "#FF9933", size = 1.3,scale=3.9,plusX=150,plusY=150) {
  let data = []
  for (var x = 0; x < imageData.height; x+=2) {
    for (var y = 0; y < imageData.width; y+=2) {
      let pixel_i = (y*4*imageData.width) + (4*x);
      let r = imageData.data[pixel_i];
      let g = imageData.data[pixel_i+1];
      let b = imageData.data[pixel_i+2];
      let a = imageData.data[pixel_i+3];
      if (r+g+b > 200) {
        PARTICLES.push(new Particle(x*scale - plusX + 0, y*scale + plusY, color, size));
        data.push([x, y])
      }
    }
  }
  return data
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < PARTICLES.length; i++) {
    PARTICLES[i].draw();
    PARTICLES[i].update();
  }
  let num = 0;
  for (var i = 0; i < chakraDataArray[num].length; i++) {
    chakraDataArray[num][i].draw();
    chakraDataArray[num][i].update();
  }
  requestAnimationFrame(animate);
}
