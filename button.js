function button(label, x, y, buttonWid, buttonHeit, func, params, toggle, label2) {
  this.label = label;
  this.x = x;
  this.y = y;
  this.buttonWid = buttonWid;
  this.buttonHeit = buttonHeit;
  this.toggle = toggle;
  this.toggled = false;
  this.label2 = label2;
  this.func = func;
  this.params = params;
  this.visible = true;
  this.color = "yellow"

  this.draw = draw;
  function draw(offset_x, offset_y) {
	if (offset_x == undefined) offset_x = 0;
	if (offset_y == undefined) offset_y = 0;
	
	if (this.visible) {
		rectangle([offset_x + this.x, offset_y + this.y], this.buttonWid, this.buttonHeit, "black");
		var labelToDraw = this.toggled?this.label2:this.label;
		draw_label(labelToDraw, offset_x + this.x + 1, offset_y + this.y + this.buttonHeit - 2, this.color);
	}
  }

  this.press = press;
  function press(pressX, pressY, offset_x, offset_y) {
	if (offset_x == undefined) offset_x = 0;
	if (offset_y == undefined) offset_y = 0;
	
	if (this.visible) {
		if ((pressX > offset_x + this.x) && (pressX < offset_x + this.x + this.buttonWid) && (pressY > offset_y + this.y) && (pressY < offset_y + this.y + this.buttonHeit)) {
		  if (this.toggle) {
			this.toggled = !this.toggled;
			this.draw();
		  }

		  if (this.params == undefined) {
			this.func();
		  }
		  else {
			this.func(params);
		  }
		}
	}
  }
}

// TODO: Unfinishied
function buttonTable(startX, startY, wid) {
  this.buttons = [];
  this.startX = startX;
  this.startY = startY;

  this.align = align;
  function align() {
    var buttonHeit = 20;
  }

  this.press = press;
  function press() {
    for (i = 0; i < buttons.length; i++) buttons[i].press();
    // buttons.map(this.press); or something. think about it carefully. look at the docs and add thisArg
  }
}