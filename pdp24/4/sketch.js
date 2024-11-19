let scal = 2;

let cwidth, cheight;

// sin wave
let swidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 300.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let dvel;
let yvalues; // Using an array to store height values for the wave

// noise for floating
noise_x = Math.random();
noise_y = Math.random();


function preload () {
  front = loadImage("front.png");
  frontkid = loadImage("front-kid.png");
  backsmall = loadImage("back1x.png");
  //backkoi = loadImage("back-koi1x.png");
  backkoi = loadImage("back-koi-white.png");
  midkoi = loadImage("mid-koi.png");
  koi = loadImage("koi.png");
  kite = loadImage("kite.png");
  sky = loadImage("sky.png");
  //frontwokid = loadImage("front-wo-kid.png");
  
  cat1 = loadImage("cat1.png");
  cat2 = loadImage("cat2.png");
  cat3 = loadImage("cat3.png");
  cat4 = loadImage("cat4.png");
  catFrame = [cat1, cat2, cat3, cat4];
}

function setup() {
  cwidth = front.width/4*scal;
  cheight = front.height/4*scal;
  
  canvas = createCanvas(cwidth,cheight);
  // change canvas position
  canvas.parent('canvas');
  background(153, 212,255);
  
  // sin wave
  swidth = cwidth+scal;
  dx = (TWO_PI / period) * scal;// 周期はscal / period 
  dvel = map(random(),0,1,0.01,0.05);// map(random(), 0, 1, 0, 1)/2;// 二つ目のサインカーブの周期を変える
  yvalues = new Array(floor(swidth / scal));
  
  count = 0;
  
  frameRate(24);
}

function draw() {
  image(sky, 0, 0, cwidth, cheight);
  
  if(count%11==0){
    rhcolor = [255,255,255,100];
    rhr = int(random(15,30))*scal;
    rh_x = int(random(cwidth)/scal)*scal;
    rh_y = int(random(cheight)/scal)*scal;
    makeRhombus(rh_x, rh_y, rhr,rhcolor);
    count=0;
  }
  count++;
  
  fill(153, 212,255, 150);
  noStroke();
  // sine curve 
  yvalues = calcWave(yvalues, amplitude, dx, 0.01);
  renderWave( int(cheight/2/scal)*scal, yvalues );
  yvalues = calcWave(yvalues, amplitude, dvel, 0.005);
  renderWave( int( (cheight/2-90) /scal)*scal, yvalues );
  
  
  image(backsmall, 0, 0, cwidth, cheight);
  
  koi_x = map(noise(noise_x), 0, 1, -10*scal, 0);
  koi_y = map(noise(noise_y), 0, 1, -20*scal, 0);
  koiback_x = map(noise(noise_x-0.5), 0, 1, -10*scal, 0);
  koiback_y = map(noise(noise_y/3-0.5), 0, 1, -10*scal, 0);
  koimid_x = map(noise(noise_x/2-0.1), 0, 1, -15*scal, 0);
  koimid_y = map(noise(noise_y-0.1), 0, 1, -15*scal, 0);
  
  image(backkoi, koiback_x,koiback_y, cwidth, cheight);
  image(midkoi, koimid_x, koimid_y, cwidth, cheight);
  
  
  // sin curve in the middle 
  fill(255,255,255,100);
  yvalues = calcWave(yvalues, amplitude, dx, 0.005);
  renderWave( int((cheight/2+150)/scal)*scal, yvalues );
  
  //image(kite, 0, 0, cwidth, cheight); // 子供を表示させるとき
  //image(frontkid, 0, 0, cwidth, cheight); // 子供を表示させるとき
  image(front, 0, 0, cwidth, cheight);// 子供表示で不要
  
  // sin curve in front
  fill(255,255,255,100);
  yvalues = calcWave(yvalues, amplitude, dvel, 0.0001);
  renderWave( int((cheight/2-60)/scal)*scal, yvalues );
  
  image(koi, koi_x, koi_y, cwidth, cheight);
  
  noise_x +=0.02;
  noise_y +=0.01;
  
  //cat
  d = new Date();
  catcount = d.getMilliseconds();
  if(second()%3==0){ // 子供を表示させるときはここをfalse
    if(catcount < 400) {
      image(catFrame[0], 0, 0, cwidth, cheight);
    } else if (catcount < 600) {
      image(catFrame[1], 0, 0, cwidth, cheight);
    } else if (catcount < 800) {
      image(catFrame[2], 0, 0, cwidth, cheight);
    } else {
      image(catFrame[3], 0, 0, cwidth, cheight);
    } 
  } else {
    image(catFrame[1], 0, 0, cwidth, cheight);
  }
  //noLoop();
}




function calcWave(array, h, _dx, velocity) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += velocity;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < array.length; i++) {
    array[i] = sin(x) * h;
    x += _dx;
  }
  return array;
}

function renderWave(center, array) {
  //noStroke();
  //fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x++) {
    rect(x * scal, center + array[x], scal, scal);
  }
}


function makeRhombus (x, y, r, color) {// xyは左上、rは大きさ、colorは透過色込み
  //rectr = int(random(2, 15))*2-1;// 奇数で出力
  for (i = 0; i < r; i++) {
      ii = i*2+1;
      j = (r - ii)/2;
      l = r - j*2;
      noStroke();
      fill(color[0],color[1],color[2], color[3]);
      for (k = 0; k<l; k++) {
          rect(x+j*scal+k*scal, y+i*scal, scal, scal);
          if(i!=r-1){
              rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
          }
      }
    }
}

function keyPressed() {// save as gif
  if (key === 'g') {
    //saveGif('mySketch', 5);
  }
  if (key === 'f') {
    saveFrames('frame', 'png', 5, 22);
    //saveCanvas();
  }
  if (key === 's') {
    saveCanvas();
  }
}
