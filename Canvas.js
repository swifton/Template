var main_canvas = document.getElementById('canvas');
var main_context = main_canvas.getContext('2d');

function resize_canvas(canvas) {
  var canvas = canvas || main_canvas;
  var canvas_wid = window.innerWidth;
  var canvas_heit = window.innerHeight;
  canvas.width = canvas_wid;
  canvas.height = canvas_heit;
}

function clear_canvas(canvas, color) {
  var canvas = canvas || main_canvas;
  context = canvas.getContext('2d');
  context.fillStyle = color || '#333333';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.closePath();
  context.fill();
}

function draw_line(x1, y1, x2, y2, color, thickness, context) {
  var context = context || main_context;
  var color = color || "black";
  context.beginPath();
  context.lineWidth = thickness || 2;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.stroke();
}

function draw_label(label, x, y, context) {
  var context = context || main_context;
  context.fillStyle = "blue";
  context.font = "bold 20px Arial";
  context.fillText(label, x, y);
}

function draw_image(x, y, source, angle, context) {
  var context = context || main_context;
  context.save();
  context.translate(x, y); 
  context.rotate(angle);
  var img = new Image();
  img.src = "images/" + source + ".png";
  context.drawImage(img, 0, 0); 
  context.restore();
}

function draw_circle(x, y, r, color, thickness, context) {
  var context = context || main_context;
  context.beginPath();
  context.strokeStyle = color || "black";
  context.lineWidth = thickness || 2;
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();
}

function draw_filled_circle(x, y, r, color, thickness, context) {
  var context = context || main_context;
  context.beginPath();
  context.fillStyle = color || "black";
  //context.lineWidth = thickness || 2;
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fill();
}


function draw_opaque_rectangle(x1, y1, dx, dy, color, context) {
  var context = context || main_context;
  context.beginPath();
  context.fillStyle = color || 'black';
  context.fillRect(x1, y1, dx, dy);
  context.fill();
}

function draw_opaque_rectangle_optimized(x1, y1, dx, dy, color, context) {
  main_context.fillStyle = color || 'black';
  main_context.fillRect(x1, y1, dx, dy);
}

function draw_pixel(x, y, color, context) {
	var context = context || main_context;
	var imgData = context.createImageData(1,1);
	imgData.data[0] = color[0];
	imgData.data[1] = color[1];
	imgData.data[2] = color[2];
	imgData.data[3] = color[3];
	context.putImageData(imgData, x, y);
}

function draw_pixels(x, y, color, context) {
	var context = context || main_context;
	var imgData = context.createImageData(1,1);
	imgData.data[0] = color[0];
	imgData.data[1] = color[1];
	imgData.data[2] = color[2];
	imgData.data[3] = color[3];
	context.putImageData(imgData, x, y);
}
