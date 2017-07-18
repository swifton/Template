var fps = 60;
if (gamePaused == undefined) var gamePaused = false;

function pauseGame() {
  gamePaused = !gamePaused;
  if (!gamePaused) GameLoop();
}

function GameLoop() {
  if (!gamePaused) setTimeout(GameLoop, 1000/fps);
  //clear(mainCanvas);
  step();
}


if (realtime) {
	GameLoop();
}
