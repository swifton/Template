var mainCanvas = document.getElementById('canvas');
var mainContext = mainCanvas.getContext('2d');

function resizeCanvas(canvas) {
  var canvas = canvas || mainCanvas;
  var wid = window.innerWidth - 10;
  var heit = window.innerHeight - 16;
  canvas.width = wid;
  canvas.height = heit;
}

function clear(canvas) {
  var canvas = canvas || mainCanvas;
  context = canvas.getContext('2d');
  context.fillStyle = '#d0e7f9';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.closePath();
  context.fill();
}

function drawLine(x1, y1, x2, y2, color, context) {
  var context = context || mainContext;
  var color = color || "black";
  context.beginPath();
  context.lineWidth = 2;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.stroke();
}

function drawLabel(label, x, y, context) {
  var context = context || mainContext;
  context.fillStyle = "blue";
  context.font = "bold 20px Arial";
  context.fillText(label, x, y);
}

function drawImage(x, y, source, angle, context) {
  var context = context || mainContext;
  context.save();
  context.translate(x - radius, y - radius); 
  context.rotate(angle);
  var img = new Image();
  img.src = "images/" + source + ".png";
  context.drawImage(img, -radius, -radius); 
  context.restore();
}

