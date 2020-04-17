
this.RedT = this.RedT || {};
(function() {
	RedT.Touch = function(decorator){
		this.decorator = decorator;
		this.preventDefault = true;
	}
	let p = RedT.Touch.prototype;
	p.touch = function(e){
		if (!stage) { return; }
		if (stage.__touch.preventDefault) { e.preventDefault&&e.preventDefault(); }
		var touches = e.changedTouches;
		var type = e.type;
		for (var i= 0,l=touches.length; i<l; i++) {
			var touch = touches[i];
			var id = touch.identifier;
			if (touch.target != stage.canvas) { continue; }
 
			if (type == "touchstart") {
				this._handleStart(stage, id, e, touch.pageX, touch.pageY);
			} else if (type == "touchmove") {
				this._handleMove(stage, id, e, touch.pageX, touch.pageY);
			} else if (type == "touchend" || type == "touchcancel") {
				this._handleEnd(stage, id, e);
			}
		}
	}
	p.enable = function(){
		this.decorator.canvas.addEventListener('touchstart',  this.touch, false);
		this.decorator.canvas.addEventListener('touchmove',   this.touch, false);
		this.decorator.canvas.addEventListener('touchend',    this.touch, false);
		this.decorator.canvas.addEventListener('touchcancel', this.touch, false);
	}
})();
