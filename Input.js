function downKeyDown() {}
function upKeyDown() {}
function leftKeyDown() {}
function rightKeyDown() {}
function someKeyDown() {}

function downKeyUp() {}
function upKeyUp() {}
function leftKeyUp() {}
function rightKeyUp() {}
function someKeyUp() {}


function doKeyDown(e) {
if (gamePaused == true) {return;}
  var i = e.keyCode;
  //console.log(i);
  someKeyDown();

  if (i == 37) leftKeyDown();
  if (i == 39) rightKeyDown();
  if (i == 38) upKeyDown();
  if (i == 40) downKeyDown();
}

function doKeyUp(e) {
  if (gamePaused == true) {return;}
  var i = e.keyCode;
  //console.log(i);
  someKeyUp();

  if (i == 37) leftKeyUp();
  if (i == 39) rightKeyUp();
  if (i == 38) upKeyUp();
  if (i == 40) downKeyUp();
}

function clickReporter(e) {
  var mousePos = getMousePos(mainCanvas, e);
  mouseClick(mousePos.x, mousePos.y);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var mouse = {x: 0, y: 0};
function mouseMove() {}

mainCanvas.addEventListener('mousemove', function(e){mouse = getMousePos(mainCanvas, e); mouseMove()}, false);
mainCanvas.addEventListener('mousedown', clickReporter, false);
window.addEventListener("keydown", doKeyDown, true);
window.addEventListener("keyup", doKeyUp, true);
