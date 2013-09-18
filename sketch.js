var gLoop;
var c = document.getElementById('c');
var ctx = c.getContext('2d');
var speed = 1000/4;
	
c.width = width;
c.height = height;

//Draw functions

var clear = function(cnv){
	cc = cnv.getContext('2d');
	cc.fillStyle = '#d0e7f9';
	cc.clearRect(0, 0, cnv.width, cnv.height);
	cc.beginPath();
	cc.rect(0, 0, cnv.width, cnv.height);
	cc.closePath();
	cc.fill();
}

function draw(){
};

// Initialization functions

function pauseGame() {
  if (!gamePaused) {
    gLoop = clearTimeout(gLoop);
    gamePaused = true;
  } else if (gamePaused) {
    gLoop = setTimeout(GameLoop, speed);
    gamePaused = false;
  }
}

// Field processing functions

function doKeyDown(e) {
	if (gamePaused == true) {return;}
	var i = e.keyCode;
	//console.log(i);
	updatePosition(0);
	if (i == 37){  // left
	}
	if (i == 39){  // right
	}
	if (i == 38){  // up
	}
	if (i == 40){  // down
	}
}

function GameLoop() {
	clear(c);
	draw();
	gLoop = setTimeout(GameLoop, speed);
}

window.addEventListener( "keydown", doKeyDown, true);

GameLoop();
