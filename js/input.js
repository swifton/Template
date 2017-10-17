var pressed_keys = {};

function do_key_down(e) {
  var i = e.keyCode;
  //console.log(i);
  pressed_keys[i] = true;

  if (i == 37 && typeof left_key_down != "undefined") left_key_down();
  if (i == 39 && typeof right_key_down != "undefined") right_key_down();
  if (i == 38 && typeof up_key_down != "undefined") up_key_down();
  if (i == 40 && typeof down_key_down != "undefined") down_key_down();
  if (i == 32 && typeof space_down != "undefined") space_down();
  if (i == 8 && typeof backspace_down != "undefined") backspace_down();  // CAUTION: doesn't work in Mozilla.
  if (i == 27 && typeof escape_down != "undefined") escape_down();
  if (i == 87 && typeof w_down != "undefined") w_down();
  if (i == 65 && typeof a_down != "undefined") a_down();
  if (i == 83 && typeof s_down != "undefined") s_down();
  if (i == 68 && typeof d_down != "undefined") d_down();
  if (i == 81 && typeof q_down != "undefined") q_down();
  if (i == 69 && typeof e_down != "undefined") e_down();
}

function do_key_up(e) {
  var i = e.keyCode;
  pressed_keys[i] = false;

  if (i == 37 && typeof left_key_up != "undefined") left_key_up();
  if (i == 39 && typeof right_key_up != "undefined") right_key_up();
  if (i == 38 && typeof up_key_up != "undefined") up_key_up();
  if (i == 40 && typeof down_key_up != "undefined") down_key_up();
}

var mouse = {x: 0, y: 0};

function get_mouse_pos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

main_canvas.addEventListener('mousemove', function(e){
	mouse = get_mouse_pos(main_canvas, e); 
	if (typeof mouse_move != "undefined") mouse_move();
}, false);

main_canvas.addEventListener('mousedown', function(e) {
	var mouse_pos = get_mouse_pos(main_canvas, e); 
	if (typeof mouse_down != "undefined") mouse_down(mouse_pos.x, mouse_pos.y);
}, false);

main_canvas.addEventListener('mouseup', function(e) {
	var mouse_pos = get_mouse_pos(main_canvas, e); 
	if (typeof mouse_up != "undefined") mouse_up(mouse_pos.x, mouse_pos.y);
}, false);

window.addEventListener('mousewheel',function(event){
	var direction = Math.sign(event.wheelDeltaY); 
	if (typeof scroll != "undefined") scroll(direction); 
	return false;
}, false);

window.addEventListener("keydown", do_key_down, true);
window.addEventListener("keyup", do_key_up, true);



main_canvas.requestPointerLock = main_canvas.requestPointerLock || main_canvas.mozRequestPointerLock;
if (typeof lockable_pointer != "undefined" && lockable_pointer == true) main_canvas.onclick = function() {main_canvas.requestPointerLock();};
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
document.addEventListener('pointerlockchange', lock_change, false);
document.addEventListener('mozpointerlockchange', lock_change, false);

function lock_change() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    document.addEventListener("mousemove", update_mouse_position, false);
  } else {
    document.removeEventListener("mousemove", update_mouse_position, false);
  }
}