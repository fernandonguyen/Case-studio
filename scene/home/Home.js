
this.Home = this.Home || {};

(function(Home){
	Home.isLoadAsset = false;
	Home.Game        = null;
	Home.init = function() {
		this.offset = RedT.v2();
		if (this.Game === null) {
			// Game / camera
			this.Game = new RedT.Node({name:'camera', _anchorX: 0, _anchorY: 0, width:RedT.decorator.canvas.width, height:RedT.decorator.canvas.height});

			// background
			this.background = new RedT.Node({
				x: -297.5,
				y: -400,
				_anchorX: 0,
				_anchorY: 0,
			});
			let sprite = new RedT.Sprite(RedT.decorator.resources['home_background']);
			this.background.addComponent(sprite);

			// ground
			this.ground = new RedT.Node({
				x: -899,
				y: -240,
				_anchorX: 0,
				_anchorY: 0,
			});
			let sprite_ground = new RedT.Sprite(RedT.decorator.resources['home_ground']);
			this.ground.addComponent(sprite_ground);

			this.Game.addChild(this.background, this.ground);

			// X tối đa
			this.maxX = 0;
			// X tối thiểu
			this.minX = -(RedT.decorator.resources['home_ground'].width-RedT.decorator.canvas.width);
		}
		RedT.decorator.Game = this.Game;

		// Quay camera
		this.regCamera();
	};
	Home.regCamera = function() {
		this.Game.on('mousedown',  this.onMouseStart, this);
		this.Game.on('mousemove',  this.onMouseMove,  this);
		this.Game.on('mouseup',    this.onMouseEnd,   this);
	}

	Home.onMouseStart = function(e) {
		this.moveCamera = !0;
		let point = RedT.pointTouch(e);
		this.offset.x = point.x-this.ground._x;
		this.offset.y = point.y-this.ground._y;
	}
	Home.onMouseMove  = function(e) {
		if (this.moveCamera) {
			let point = RedT.pointTouch(e);
			let x = point.x-this.offset.x;
			let y = point.y-this.offset.y;
			if(y < -240){
				y = -240;
			}
			if(y > 240){
				y = 240;
			}

			if(x > this.maxX){
				x = this.maxX;
			}
			if(x < this.minX){
				x = this.minX;
			}
			this.ground.x = x;
			this.ground.y = y;

			let backgroundScaleX = Math.abs(this.ground.x/(this.maxX-this.minX));
			let backgroundScaleY = (this.ground.y+240)/480;

			this.background.x = -(backgroundScaleX*595);
			this.background.y = backgroundScaleY*400-400;
		}
	}
	Home.onMouseEnd   = function(e) {
		this.moveCamera = !1;
		console.log('0');
	}

})(Home);
