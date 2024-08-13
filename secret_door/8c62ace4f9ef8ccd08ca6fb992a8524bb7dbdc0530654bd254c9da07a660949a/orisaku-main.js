let scal = 2;
let cwidth,cheight;
let org_x = 5*scal,org_y = 7*scal;
let count=0;
let btflyImgs = [];
let btflyLocs = [];
let dice;

let currentTime;

let alpha,beta,gamma;

// OS detection
let ua = window.navigator.userAgent.toLowerCase();
let isIOS = false;

// drastic sin curve
let xspacing = scal; // Distance between each horizontal location
let w; // Width of entire wave
let psi = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave


// 加速度センサーイベント処理
window.addEventListener("deviceorientation", function (e) {
    // alpha, beta, gammaの値を取得
    alpha = e.alpha;
    beta = e.beta;
    gamma = e.gamma;

    //傾き
    //const movePosition = new MovePosition(alpha, beta, gamma);
    //movePosition.setImgPositon();

}, false);


function preload () {
    imgbk = loadImage("btfly-bk.png");
    sasakia = loadImage("oomurasaki.png");
    for(let i =0;i<8;i++) {
        j = i+1;
        let img = loadImage(`bt${j}.png`);
        btflyImgs.push(img);
    }
    font = loadFont('../x12y16pxMaruMonica.ttf');
}

function setup () {
    cwidth = imgbk.width/4*scal;
    cheight = imgbk.height/4*scal;
    canvas = createCanvas(cwidth,cheight);

    // change canvas position
    canvas.parent('canvas');

    background(208,233,234);
    dice = int(random(0,btflyImgs.length));

    textSize(16);
    textAlign(RIGHT);

    // OS detection
    if(ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
        isIOS = true;
    }

    // drastic sine curve
    dx = (TWO_PI / period) * xspacing;
    w =  cwidth + xspacing;
    yvalues = new Array(floor(w / xspacing)); 
    sinHeight = cheight/5;
    amplitude = sinHeight;

    // layer
    layer = createGraphics(cwidth,cheight);
    layer.background(255,255,255,0);
}

function draw () {
    currentTime = new Date();
    currentMonth = currentTime.getMonth();
    currentDay = currentTime.getDay();
    currentHour = currentTime.getHours();
    currentMin = currentTime.getMinutes();

    /**
     * Get mouse distance from the center of sketch
    */

    if(!isIOS){
        dX = mouseX - (width / 2.0)+gamma*20;
        dY = mouseY - (height / 2.0)+beta*20;
    } else {
        dX = mouseX - (width / 2.0);
        dY = mouseY - (height / 2.0);
    }

    // sin curve 
    noStroke();
    //fill(177,237,253,100);
    fill(208,233,234,100);
    calcWave();

    for (let x = 0; x < yvalues.length; x++) {
        drasticx = int(x*xspacing/scal)*scal;
        drasticy = int(yvalues[x]/scal)*scal;
    
        rect(drasticx, drasticy+cheight/2, scal, scal);
        rect(drasticx, drasticy+cheight*1/9, scal, scal);
        rect(drasticx, drasticy+cheight*8/9, scal, scal);
    }

    // for rhombus
    rhombusr = 16*scal;
    rhombusx = int(random(-rhombusr, cwidth)/scal)*scal;
    rhombusy = int(random(-rhombusr, cheight)/scal)*scal;
    rcolors = [255,255,255,100];
    if(count==6){
        makeRhombus(rhombusx, rhombusy, rhombusr, rcolors);
        count=0;
    }
    count++;

    // mask with rectangle
    fill(208,233,234);
    rect(0,0,10*scal,cheight);
    rect(0, cwidth-10*scal, cwidth, 10*scal);
    rect(cwidth-10*scal, cheight/2, 10*scal, cheight/2);

    push();
    translate(dX / 80, dY / 80);
    image(imgbk,0,0,cwidth,cheight);
    pop();

    image(btflyImgs[dice],mouseX,mouseY,btflyImgs[dice].width/4*scal,btflyImgs[dice].height/4*scal);

    // layer
    push();
    image(layer, dX/50, dY/50);
    pop();

    push();
    translate(dX/40, dY/40);
    image(sasakia,0,0,cwidth,cheight);
    pop();

    textFont("Pixelify Sans");

    //fill(255);
    //stroke('#AE662C');
    //text('OTAKARA discovered!', cwidth-10,cheight-28);
    fill('#EDB979');
    //textFont(font);
    text(int(alpha) + '/' + int(beta) + '/' + int(gamma) + '/' + currentMonth + '/' + currentDay +' '+currentHour + ':' + currentMin, cwidth-10, cheight-12);

}

function calcWave() {
    psi += 0.01;// 波の速さはここ
  
    // For every x value, calculate a y value with sine function
    let x = psi;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(x) * amplitude;
      x += dx;
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
  
  function mouseClicked() {
    int_x = int(mouseX/scal)*scal;
    int_y = int(mouseY/scal)*scal;
    if(gamma && beta) {
        int_x =  int((mouseX+gamm*20)/scal)*scal;
        int_y = int((mouseY+beta*20)/scal)*scal;
    }
    layer.image(btflyImgs[dice], int_x, int_y, btflyImgs[dice].width/4*scal, btflyImgs[dice].height/4*scal);
    dice = int(random(0, btflyImgs.length));

  }

