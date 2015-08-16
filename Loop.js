var gLoop;
var fps = 60;
var gamePaused = false;

function pauseGame() {
  if (!gamePaused) {
    gLoop = clearTimeout(gLoop);
    gamePaused = true;
  } 
  else if (gamePaused) {
    gLoop = setTimeout(GameLoop, speed);
    gamePaused = false;
  } 
}

function GameLoop() {
  clear(mainCanvas);
  step();
  gLoop = setTimeout(GameLoop, 1000/fps);
}

GameLoop();