this.RedT = this.RedT || {};
(function() {
	// quản lý sự kiện
	RedT.Event = function(decorator){
		this.decorator        = decorator;
		this.preventDefault   = true;
		this.pointers         = {};
		//this.count           = 0;

		this.regEventKeyboard = [];

		// 
		this.regTouch         = [];
		this.idTouch          = {};

		this.init();
	}

	let p = RedT.Event.prototype;

	p.init = function(){
		// sự kiện cảm ứng
		this.decorator.canvas.addEventListener('touchstart',  this.touch.bind(this), false);
		this.decorator.canvas.addEventListener('touchmove',   this.touch.bind(this), false);
		this.decorator.canvas.addEventListener('touchend',    this.touch.bind(this), false);
		this.decorator.canvas.addEventListener('touchcancel', this.touch.bind(this), false);

		// Sự kiện chuột
		this.decorator.canvas.addEventListener('mousestart',  this.mouse.bind(this), false);
		this.decorator.canvas.addEventListener('mousemove',   this.mouse.bind(this), false);
		this.decorator.canvas.addEventListener('mouseend',    this.mouse.bind(this), false);
		this.decorator.canvas.addEventListener('mousecancel', this.mouse.bind(this), false);

		// sự kiện nhấn
		document.body.addEventListener('keydown', this.keyboard.bind(this), false);
		document.body.addEventListener('keyup',   this.keyboard.bind(this), false);
	}

	// sự kiện nhấn phím
	// lấy ra lần đăng ký sự kiện nhấn gần đây nhất
	p.keyboard = function(e){
		if (this.preventDefault){
			e.preventDefault && e.preventDefault();
		}
		if (this.regEventKeyboard.length > 0) {
			let EventNode = this.regEventKeyboard[this.regEventKeyboard.length-1];
			if (EventNode !== void 0) {
				EventNode.setEvent(e);
			}
		}
	}

	// tọa độ trên khung canvas
	p.pointTouch = function(e){
		let pointCanvas = this.decorator.canvas.getBoundingClientRect();
		return {
			x: e.clientX-pointCanvas.left,
			y: e.clientY-pointCanvas.top,
		};
	}

	//
	p.touch = function(e){
		if (this.preventDefault){
			e.preventDefault && e.preventDefault();
		}
		let touches = e.changedTouches;
		let type    = e.type;
		for (let i= 0, l=touches.length; i<l; i++) {
			let touch = touches[i];
			let id    = touch.identifier;
			//console.log(this.pointTouch(touch), touch.pageX, touch.pageY);
			/**
			if (touch.target != this.decorator.canvas) { continue; }
			if (type == 'touchstart') {
				this._handleStart(this.decorator, id, e, touch.pageX, touch.pageY);
			} else if (type == 'touchmove') {
				this._handleMove(this.decorator, id, e, touch.pageX, touch.pageY);
			} else if (type == 'touchend' || type == 'touchcancel') {
				this._handleEnd(this.decorator, id, e);
			}
			*/
		}
	}

	// 
	p.mouse = function(e){
		if (this.preventDefault){
			e.preventDefault && e.preventDefault();
		}
		//console.log(e);
        //console.log(this.pointTouch(e));
	}

	//
	p._handleStart = function(){
	}

	//
	p._handleMove = function(){
	}
	//
	p._handleEnd = function(){
	}

	p.add = function(type, EventNode){
		if (type === 'keydown' || type === 'keyup') {
			if (this.regEventKeyboard.indexOf(EventNode) === -1) {
				this.regEventKeyboard.push(EventNode);
			}
		}else{
			if (this.regTouch.indexOf(EventNode) === -1) {
				this.regTouch.push(EventNode);
			}
		}
	}
})();
