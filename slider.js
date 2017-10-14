function slider(left_x, left_y, lent, position, variable, min, max, name) {
	this.left_x = left_x;
	this.left_y = left_y;
	this.lent = lent;
	this.position = (variable.value - min) * lent / (max - min);
	this.sliding = false;
	this.variable = variable;
	this.min = min;
	this.max = max;
	this.name = "" || name;
	
	function slide() {
		this.position = mouse.x - left_x;
		if (this.position < 0) {this.position = 0;}
		if (this.position > this.lent) {this.position = this.lent;}
		this.variable.value = this.min + (this.position / this.lent) * (this.max - this.min);
	}
	this.slide = slide;
	
	function draw() {
		if (this.sliding) {
			this.slide();
		}
		rectangle([left_x, left_y], this.lent + 10, 10);
		rectangle([left_x + this.position, left_y - 10], 10, 30);
		
		draw_label(this.name, this.left_x, this.left_y - 10, "red");
	}
	this.draw = draw;
	
	function update() {
		this.position = (this.variable.value - this.min) * this.lent / (this.max - this.min);
	}
	this.update = update;
	
	function start_sliding(x, y) {
		if ((x > this.left_x + this.position) && (x < this.left_x + this.position + 10) && (y > this.left_y - 10) && (y < this.left_y + 10)) {
			this.sliding = true;
		}
	}
	this.start_sliding = start_sliding;
	
	function stop_sliding(x, y) {
		if (this.sliding) {
			this.sliding = false;
			this.slide();
			return true;
		}
		return false;
	}
	this.stop_sliding = stop_sliding;
}