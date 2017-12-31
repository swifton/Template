function graph(center_x, center_y, one_pix, min_x, max_x, min_y, max_y, x_label, y_label) {
	this.center_x = center_x;
	this.center_y = center_y;
	this.one_x = one_pix;
	this.one_y = one_pix;
	this.min_x = min_x;
	this.max_x = max_x;
	this.min_y = min_y;
	this.max_y = max_y;
	this.x_label = x_label || "";
	this.y_label = y_label || "";
	
	function draw_axes() {
		draw_arrow(this.center_x + this.min_x * this.one_x, this.center_y, this.center_x + this.max_x * this.one_x, this.center_y, 2, undefined, undefined, "black", 1);
		draw_arrow(this.center_x, this.center_y - this.min_y * this.one_y, this.center_x, this.center_y - this.max_y * this.one_y, 2, undefined, undefined, "black", 1);
		draw_label(this.x_label, this.center_x + this.max_x * this.one_x - 20, this.center_y + 20);
		draw_label(this.y_label, this.center_x + 10, this.center_y - this.max_y * this.one_y + 10);
	}
	this.draw_axes = draw_axes;
	
	this.draw_circle = function(x, y, color, radius) {
		if (radius == undefined) radius = 2;
		draw_filled_circle(this.transform_x(x), this.transform_y(y), radius, color);
		//console.log(this.transform_x(x), this.transform_y(y))
	}
	
	function draw_points(array_of_points, color, radius) {
		if (radius == undefined) radius = 2;
		for (var i = 0; i < array_of_points.length; i++) {
			draw_filled_circle(this.transform_x(array_of_points[i][0].value), this.transform_y(array_of_points[i][1].value), radius, color);
		}
	}
	this.draw_points = draw_points;
	
	function graph_draw_line(m, b, label) { // y = mx + b
		var label = label || '';
		var left_x = this.min_x;
		var right_x = this.max_x;
		var left_y = m * left_x + b;
		var right_y = m * right_x + b;
		
		if (right_y > this.max_y) {
			right_y = this.max_y;
			right_x = (right_y - b) / m;
		}
		else if (right_y < this.min_y) {
			right_y = this.min_y;
			right_x = (right_y - b) / m;
		}
		
		if (left_y > this.max_y) {
			left_y = this.max_y;
			left_x = (left_y - b) / m;
		}
		else if (left_y < this.min_y) {
			left_y = this.min_y;
			left_x = (left_y - b) / m;
		}
		
		draw_line(this.transform_x(left_x), this.transform_y(left_y), this.transform_x(right_x), this.transform_y(right_y), "black", 0.5);
		draw_label(label, this.transform_x(1), this.transform_y(m + b), "black", Math.atan(m));
	}
	this.draw_line = graph_draw_line;
	
	this.draw_vertical_line = function(x) {
		var label = label || '';
		var left_x = x;
		var right_x = x;
		var left_y = this.min_y;
		var right_y = this.max_y;
		draw_line(this.transform_x(left_x), this.transform_y(left_y), this.transform_x(right_x), this.transform_y(right_y), "black", 0.5);
		//draw_label(label, this.transform_x(1), this.transform_y(m + b), "black", Math.atan(m));
	}
	
	function highlight_point(x, y, color) {
		draw_circle(this.transform_x(x), this.transform_y(y), 4, color);
	}
	this.highlight_point = highlight_point;
	
	function arrow(x1, y1, x2, y2, end, color, thickness, label) {
		if (label == undefined) label = '';
		var thickness = thickness || 1;
		var x_start = this.transform_x(x1);
		var y_start = this.transform_y(y1);
		var x_end = this.transform_x(x2);
		var y_end = this.transform_y(y2);
		
		var arrow_lent = Math.pow(x_start - x_end, 2) + Math.pow(y_start - y_end, 2);
		var size;
		if (arrow_lent < 400) {
			size = Math.sqrt(arrow_lent) / 2;
		}
		
		draw_arrow(x_start, y_start, x_end, y_end, end, size, undefined, color, thickness);
		this.draw_label((x1 + x2) / 2, (y1 + y2) / 2, label);
	}
	this.draw_arrow = arrow;
	
	this.generate_plot = function(func) {
		var image = [];
		var one = Math.floor(this.one_x);
		var wid = one * (this.max_x - this.min_x);
		var heit = one * (this.max_y - this.min_y);
	
		for (var i = 0; i <  wid * heit; i++) {
			image.push(170);//51);
			image.push(170);
			image.push(170);
			image.push(255);
		}
		
		var old_val;
		
		function put_point(coord) {
			image[coord] = 0;
			image[coord + 1] = 0;
			image[coord + 2] = 0;
			image[coord + 3] = 255;
		}
	
		for (var i = 0; i < this.one_x * (this.max_x - this.min_x); i++) {
			var coord = 4 * (wid * (Math.floor((this.max_y - func[i]) * one)) + i);
			put_point(coord);
			
			if (old_val != undefined && Math.abs(Math.floor((this.max_y - func[i]) * one) - old_val) > 1) {
				
				var d = - Math.sign(Math.floor((this.max_y - func[i]) * one) - old_val);
				for (var j = 0; j < Math.abs(Math.floor((this.max_y - func[i]) * one) - old_val) - 1; j++) {
					put_point(coord + 4 * wid * j * d);
				}
			}
			
			old_val = Math.floor((this.max_y - func[i]) * one);
		}
		
		return image;		
	}
	
	this.draw_plot = function(image) {
		var one = Math.floor(this.one_x);
		var wid = one * (this.max_x - this.min_x);
		var heit = one * (this.max_y - this.min_y);
		draw_pixels(image, wid, heit, this.center_x + this.min_x * this.one_x, this.center_y - this.max_y * this.one_y);
	}
	
	this.draw_label = function(x, y, text, angle) {
		draw_label(text, this.transform_x(x), this.transform_y(y), "black", angle);
	}
		
	function transform_x(x) {
		return this.center_x + x * this.one_x;
	}
	this.transform_x = transform_x;
	
	function transform_y(y) {
		return this.center_y - y * this.one_y;
	}
	this.transform_y = transform_y;
	
	this.unproject_x = function(x) {
		return (x - this.center_x) / this.one_x;
	}
	
	this.unproject_y = function(y) {
		return - (y - this.center_y) / this.one_y;
	}
}