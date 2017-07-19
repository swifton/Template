var fps = 60;
if (game_paused == undefined) var game_paused = false;

function pause_game() {
  game_paused = !game_paused;
  if (!game_paused) game_loop();
}

function game_loop() {
  if (!game_paused) setTimeout(game_loop, 1000 / fps);
  //clear(mainCanvas);
  step();
}


if (realtime) {
	game_loop();
}
