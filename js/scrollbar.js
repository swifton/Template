function scrollbar(variable, left_top_x, left_top_y, wid, heit, min, max, is_vertical, has_area, left_top_x_area, left_top_y_area, wid_area, heit_area, scroll_step) {
	this.variable = variable;
	this.left_top_x = left_top_x;
	this.left_top_y = left_top_y; 
	this.wid = wid; 
	this.heit = heit; 
	this.min = min; 
	this.max = max; 
	this.is_vertical = is_vertical; 
	this.has_area = has_area; 
	this.left_top_x_area = left_top_x_area; 
	this.left_top_y_area = left_top_y_area; 
	this.wid_area = wid_area; 
	this.heit_area = heit_area;
	this.scrolling = false;
	this.scroll_step = scroll_step;
	
	if (is_vertical) {
		this.lent = this.heit;
	}
	else {
		this.lent = this.wid;
	}

	function scroll() {
		if (this.scrolling) {
			if (this.is_vertical) {
				this.position = mouse.y - left_top_y; // TODO: stop accessing the mouse position from here. Same for sliders.
			}
			else {
				this.position = mouse.x - left_top_x;
			}
		}
		
		if (this.position < 0) {this.position = 0;}
		if (this.position > this.lent) {this.position = this.lent;}
		this.variable.value = this.min + (this.position / this.lent) * (this.max - this.min);
	}
	this.scroll = scroll;
	
	function draw() {
		if (this.scrolling) {
			this.scroll();
		}
		
		
		rectangle([left_top_x, left_top_y], this.wid, this.heit);
		
		if (this.max - this.min > 0) {
			if (this.is_vertical) {
				rectangle([left_top_x, left_top_y + this.position], this.wid, 30);
			}
			else {
				rectangle([left_top_x + this.position, left_top_y], 30, this.heit);
			}
		}
	}
	this.draw = draw;
	
	function update() {
		this.position = (this.variable.value - this.min) * this.lent / (this.max - this.min);
	}
	this.update = update;
	
	function start_scrolling(x, y) {
		if (this.is_vertical) {
			if ((x > this.left_top_x) && (x < this.left_top_x + this.wid) && (y > this.left_top_y + this.position) && (y < this.left_top_y + this.position + 30)) {
				this.scrolling = true;
			}
		}
		else {
			if ((x > this.left_top_x + this.position) && (x < this.left_top_x + this.position + 30) && (y > this.left_top_y) && (y < this.left_top_y + this.heit)) {
				this.scrolling = true;
			}
		}
	}
	this.start_scrolling = start_scrolling;
	
	function stop_scrolling(x, y) {
		if (this.scrolling) {
			this.scrolling = false;
			this.scroll();
			return true;
		}
		return false;
	}
	this.stop_scrolling = stop_scrolling;
	
	function scroll_wheel(direction) { // TODO: don't take mouse.x and mouse.y here
		if (this.has_area && mouse.x > this.left_top_x_area && mouse.y > this.left_top_y_area && mouse.x < this.left_top_x_area + this.wid_area && mouse.y < this.left_top_y_area + this.heit_area) {
			this.position += direction * this.scroll_step;
			this.scroll();
		}
	}
	this.scroll_wheel = scroll_wheel;
	
	this.update();
}