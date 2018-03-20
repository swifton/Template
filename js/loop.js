var frame_ms_lent = 16;

var target_loop_timeout = Math.floor(frame_ms_lent); // Consider making it exactly 60 fps and tweaking the backend accordingly.
var corrected_loop_timeout = target_loop_timeout; 
var previous_loop_call_time = 0;
if (game_paused == undefined) var game_paused = false; // This clearly shouldn't work. But I never used it, so who knows.

function pause_game() {
  game_paused = !game_paused;
  if (!game_paused) launch_game_loop();
}

// TODO: Pause automatically when the tab becomes inactive
function game_loop() { // Assumes that the step() function takes less than target_loop_timeout
  var current_time = performance.now();
  var real_loop_timeout = current_time - previous_loop_call_time;
  previous_loop_call_time = current_time;
  corrected_loop_timeout = target_loop_timeout + (corrected_loop_timeout - real_loop_timeout);
  if (corrected_loop_timeout < 1) corrected_loop_timeout = 1; // TODO: I don't fully understand all corner cases. Like what happens if you change tabs. 
  
  if (!game_paused) setTimeout(game_loop, corrected_loop_timeout);
  step();
}

function launch_game_loop() {
	previous_loop_call_time = performance.now();
	setTimeout(game_loop, corrected_loop_timeout);
}

if (typeof manual_start == "undefined" || !manual_start) launch_game_loop();