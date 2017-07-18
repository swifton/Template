function add(p1, p2) {
  return [p1[0] + p2[0], p1[1] + p2[1]];
}

function sub(p1, p2) {
  return add(p1, [-p2[0], -p2[1]]);
}

function pOnCir(center, radius, angle) {
  return add(center, [radius * Math.cos(angle), -radius * Math.sin(angle)]);
}

function print(output) {
  console.log(output);
}

function randomInteger(min, max) { // Including min, excluding max
	return (min + Math.floor(Math.random() * (max - min)));
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
