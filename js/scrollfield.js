function scrollfield(x, y, wid, heit, func) {
  this.x = x;
  this.y = y;
  this.wid = wid;
  this.heit = heit;
  this.func = func;
  this.color = "yellow";
  this.visible = true;

  this.draw = draw;
  function draw(value_to_display, offset_x, offset_y) {
	if (offset_x == undefined) offset_x = 0;
	if (offset_y == undefined) offset_y = 0;
	
	if (this.visible) {
		rectangle([offset_x + this.x, offset_y + this.y], this.wid, this.heit, "black");
		draw_label(value_to_display, offset_x + this.x + 1, offset_y + this.y + this.heit - 2, this.color);
	}
  }

  this.scroll = scroll;
  function scroll(x, y, dir, offset_x, offset_y) {
	if (offset_x == undefined) offset_x = 0;
	if (offset_y == undefined) offset_y = 0;
	
	if (this.visible) {
		if ((x > offset_x + this.x) && (x < offset_x + this.x + this.wid) && (y > offset_y + this.y) && (y < offset_y + this.y + this.heit)) {
			this.func(dir);
		}
	}
  }
}