function down_key_down() {}
function up_key_down() {}
function left_key_down() {}
function right_key_down() {}
function some_key_down() {}
function space_down() {}
function escape_down() {}
function w_down() {}
function a_down() {}
function s_down() {}
function d_down() {}
function q_down() {}
function e_down() {}

function down_key_up() {}
function up_key_up() {}
function left_key_up() {}
function right_key_up() {}
function some_key_up() {}


function do_key_down(e) {
  var i = e.keyCode;
  //console.log(i);
  some_key_down();

  if (i == 37) left_key_down();
  if (i == 39) right_key_down();
  if (i == 38) up_key_down();
  if (i == 40) down_key_down();
  if (i == 32) space_down();
  if (i == 27) escape_down();
  if (i == 87) w_down();
  if (i == 65) a_down();
  if (i == 83) s_down();
  if (i == 68) d_down();
  if (i == 81) q_down();
  if (i == 69) e_down();
}

function do_key_up(e) {
  var i = e.keyCode;
  //console.log(i);
  some_key_up();

  if (i == 37) left_key_up();
  if (i == 39) right_key_up();
  if (i == 38) up_key_up();
  if (i == 40) down_key_up();
}

function mouse_click(x, y) {}

function click_reporter(e) {
  var mouse_pos = get_mouse_pos(main_canvas, e);
  mouse_click(mouse_pos.x, mouse_pos.y);
}

function get_mouse_pos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var mouse = {x: 0, y: 0};
function mouse_move() {}

main_canvas.addEventListener('mousemove', function(e){mouse = get_mouse_pos(main_canvas, e); mouse_move()}, false);
main_canvas.addEventListener('mousedown', click_reporter, false);
window.addEventListener("keydown", do_key_down, true);
window.addEventListener("keyup", do_key_up, true);
