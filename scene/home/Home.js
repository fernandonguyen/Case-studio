
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
			this.background = new HomeBackground;

			// ground
			this.ground     = new Ground;

			this.Game.addChild(this.background, this.ground);

			this.ground._onChangerX = this._onChangerX.bind(this);
			this.ground._onChangerY = this._onChangerY.bind(this);

			// Test
			this.player = new Player;

			this.ground.addChild(this.player);

			this.luc_bg = new RedT.Node({x:RedT.decorator.canvas.width/2, y:RedT.decorator.canvas.height-30});
			this.luc_bg.addComponent(new RedT.Sprite(RedT.decorator.resources['luc_bg']));

			this.luc_fire_bg = new RedT.Node({x:19, y:1});
			this.luc_fire_bg.sprite = new RedT.Sprite(RedT.decorator.resources['luc_fire_bg'])
			this.luc_fire_bg.addComponent(this.luc_fire_bg.sprite);
			this.luc_bg.addChild(this.luc_fire_bg);
			this.luc_fire_bg.sprite.mask = 0;
			this.Game.addChild(this.luc_bg);

			// X tối đa
			this.maxX = 0;
			// X tối thiểu
			this.minX = -(RedT.decorator.resources['home_ground'].width-RedT.decorator.canvas.width);
		}
		RedT.decorator.Game = this.Game;

		// kích hoạt va chạm
		RedT.decorator.PhysicsManager.gravity.y = 0.3;
		RedT.decorator.PhysicsManager.enabled   = true;
		RedT.decorator.CollisionManager.enabled = true;

		// Quay camera
		this.regCamera();
	};
	Home.regCamera = function() {
		this.Game.on('mousedown', this.onMouseStart, this);
		this.Game.on('mousemove', this.onMouseMove,  this);
		this.Game.on('mouseup',   this.onMouseEnd,   this);
	}

	Home.onMouseStart = function(e) {
		let point = RedT.pointTouch(e);
		this.offset.x = point.x-this.ground._x;
		this.offset.y = point.y-this.ground._y;
	}
	Home.onMouseMove  = function(e) {
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
	}

	Home.onMouseEnd = function(e) {}

	Home._onChangerX = function(){
		let backgroundScaleX = Math.abs(this.ground.x/(this.maxX-this.minX));
		this.background.x = -(backgroundScaleX*595);
	}
	Home._onChangerY = function(){
		let backgroundScaleY = (this.ground.y+240)/480;
		this.background.y = backgroundScaleY*400-400;
	}

})(Home);
