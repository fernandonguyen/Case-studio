this.RedT = this.RedT || {};
(function() {
	// quản lý sự kiện
	RedT.Event = function(decorator){
		this.decorator        = decorator;
		this.preventDefault   = true;
		this.pointers         = {};
		//this.count           = 0;

		// Bàn phím
		this.regEventKeyboard = [];
		// danh sách phím được nhấn
		this.listKey          = {};

		// Cảm ứng
		this.regTouch         = [];
		this.idTouch          = {};

		// Chuột
		this.impacting        = null;

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
		this.decorator.canvas.addEventListener('mousedown',   this.mouse.bind(this), false);
		this.decorator.canvas.addEventListener('mousemove',   this.mouse.bind(this), false);
		this.decorator.canvas.addEventListener('mouseup',     this.mouse.bind(this), false);
		//this.decorator.canvas.addEventListener('mouseout',     this.mouse.bind(this), false);

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

		this.listKey[e.keyCode] = e;
		if (this.regEventKeyboard.length > 0) {
			let EventNode = this.regEventKeyboard[this.regEventKeyboard.length-1];
			let listKey = Object.values(this.listKey);
			listKey.forEach(function(evt){
				let type = evt.type;
				EventNode.setEvent(type, evt);
			});
		}
		if (e.type === 'keyup') {
			delete this.listKey[e.keyCode];
		}
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
			
			if (touch.target != this.decorator.canvas) {
				continue;
			}

			let id    = touch.identifier;

			if (type === 'touchstart') {
				this._handleStart(id, touch);
			} else if (type === 'touchmove') {
				this._handleMove(id, touch);
			} else if (type === 'touchend' || type == 'touchcancel') {
				this._handleEnd(id);
			}
		}
	}

	// 
	p.mouse = function(e){
		if (this.preventDefault){
			e.preventDefault && e.preventDefault();
		}
		let type = e.type;
		if (this.impacting !== null) {
			this.impacting.setEvent(type, e);
		}else{
			let check = false;
			let i, l = this.regTouch.length;
			let point = RedT.pointTouch(e);
			for(i = l-1; i >= 0; i--){
				let nodeEvent = this.regTouch[i];
				let hitTest = RedT.Intersect.pointInPolygon(point, nodeEvent.node.rectPoint());
				if(hitTest){
					this.impacting = nodeEvent;
					this.impacting.setEvent(type, e);
					break;
				}
			}
			if (check === false) {
				this.impacting = null;
			}
		}
		if (type === 'mouseup') {
			this.impacting = null;
		}
	}

	// Bắt đầu chạm
	p._handleStart = function(id, touch){
		let i, l = this.regTouch.length;
		let point = RedT.pointTouch(touch);
		for(i = l-1; i >= 0; i--){
			let nodeEvent = this.regTouch[i];
			let hitTest = RedT.Intersect.pointInPolygon(point, nodeEvent.node.rectPoint());
			if(hitTest){
				this.idTouch[id] = nodeEvent;
				nodeEvent.setEvent('touchstart', touch);
				break;
			}
		}
	}

	// Di chuyển
	p._handleMove = function(id, touch){
		let check = this.idTouch[id];
		if (check !== void 0) {
			check.setEvent('touchmove', touch);
		}
	}

	// Kết thúc
	p._handleEnd = function(id){
		delete this.idTouch[id];
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
