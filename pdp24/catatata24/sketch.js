let scal = 1; // キャンバス全体の拡大（scal 倍）
let cwidth = 400*scal; // キャンバス（外枠）の大きさ
let bRectEdge = 20*scal;
let blackWidth = cwidth - bRectEdge*2;
let innerWidth = blackWidth/2;// キャンバス（内部の白部分）の大きさ
let innerEdge = bRectEdge + innerWidth/2;// 黒縁を除いた左端
let grids = 8; // キャンバスのピクセル数（一辺）
let px = innerWidth/grids; // 1ドットの長さ(px)

let drawnArea = [];

let flowerArray=[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0
];

function preload() {
  imggrid = loadImage("grid.png");
}

function setup() {
  canvas = createCanvas(cwidth, cwidth);
  // change canvas position
  canvas.parent('canvas');
  noStroke();
  fill(0);
  rect(bRectEdge, bRectEdge, blackWidth, blackWidth);
  fill(255);
  rect(innerEdge, innerEdge, innerWidth, innerWidth);
  
  for (let i =0; i<grids*grids; i++) {
    drawnArea.push(0);
  }
  canvas.style('width','80%');canvas.style('height','auto');// レスポンシブ対応
}

function draw() {
  for(let i =0; i<grids; i++) {// draw grids
    for(let j=0;j<grids;j++) {
      noFill();
      if(drawnArea[grids*j+i]%2==0){
        stroke(200,200,200);
        rect(i*px+innerEdge, j*px+innerEdge, px, px);
      } else {
        stroke(0);
        rect(i*px+innerEdge, j*px+innerEdge, px, px);
      }
    }
  }
  
  image(imggrid,innerEdge,innerEdge,innerWidth,innerWidth);
  /*
  stroke(150);
  for (let j=0;j<drawnArea.length;j++) {// display numbers
    row = int(j/grids);
    col = j%grids;
    x = innerEdge + col*px;
    y = innerEdge + row*px + px;
    text(j+1,x,y);
  }
  */
}


function mouseClicked() {
  for(let i =0; i<grids; i++) {
    if(mouseX > i*px +innerEdge && mouseX < (i+1)*px +innerEdge) {
      for(let j =0; j<grids; j++) {
        if(mouseY > j*px +innerEdge && mouseY < (j+1)*px + innerEdge) {
          if(drawnArea[grids*j+i]%2==0){
            fill(0);
            rect(i*px+innerEdge, j*px+innerEdge, px, px);
            drawnArea[grids*j+i]=1;
          } else {
            fill(255);
            rect(i*px+innerEdge, j*px+innerEdge, px, px);
            drawnArea[grids*j+i]=0;
          }
        }
      }
    }
  }
  if(arraysEqual(drawnArea, flowerArray)) {
    targetel = document.getElementById('tanuki');
    if(targetel) {
      targetel.style.display='flex';
      document.cookie = "pdp24_tanuki=saw;max-age=86400;";
    }
  } else {
      targetel = document.getElementById('tanuki');
    if(targetel) {
      targetel.style.display='none';
  }
}
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


