
this.Home = this.Home || {};

(function(Home){
	Home.isLoadAsset    = false;
	Home.Game           = null;
	Home.isPlay         = false;
	Home.cameraStop     = true;
	Home.player         = null;
	Home.controllCamere = false;

	Home.init = function() {
		this.offset = RedT.v2();
		if (this.Game === null) {
			// Game / camera
			this.Game = new RedT.Node({name:'camera', _anchorX: 0, _anchorY: 0, width:RedT.decorator.canvas.width, height:RedT.decorator.canvas.height});

			// background
			this.background = new HomeBackground;

			// ground
			this.ground = new Ground;

			// Tạo hộp giới hạn bao quanh bản đồ
			this.limitGround();

			this.Game.addChild(this.background, this.ground);

			// Được gọi ki position thay đổi
			this.ground._onChangerX = this._onChangerX.bind(this);
			this.ground._onChangerY = this._onChangerY.bind(this);

			// tạo người chơi
			this.createPlayer();

			// X tối đa
			this.maxX = 0;
			// X tối thiểu
			this.minX = -(RedT.decorator.resources['home_ground'].width-RedT.decorator.canvas.width);

			// Quay camera xem vị trí của các nhân vật
			setTimeout(function(){
				Home.ground.runAction(
					RedT.moveTo(0.7, RedT.v2(-1780, -200)),
					RedT.delayTime(1),
					RedT.moveTo(1.5, RedT.v2(-180, -200)),
					RedT.delayTime(0.5),
					RedT.callFunc(function(){
						this.player     = this.player1;
						this.cameraStop = false;
						this.isPlay     = true;
						this.player.onPlay();
						this.player1.bg_HP_line.active = true;
						this.player2.bg_HP_line.active = true;
					}, this),
				);
			}.bind(this), 1000);

			// Tạo âm thanh cho game
			this.Media();
		}
		RedT.decorator.Game = this.Game;

		// kích hoạt va chạm
		RedT.decorator.PhysicsManager.gravity.y = 0.3;
		RedT.decorator.PhysicsManager.enabled   = true;
		RedT.decorator.CollisionManager.enabled = true;

		// Event
		this.regEvent();
	};
	Home.regEvent = function() {
		this.Game.on('mousedown', this.onMouseStart, this);
		this.Game.on('mousemove', this.onMouseMove,  this);
		this.Game.on('mouseup',   this.onMouseEnd,   this);
		this.Game.on('keydown',   this.keydown,      this);
		this.Game.on('keyup',     this.keyup,        this);
	}

	// Thay đổi lượt chơi
	Home.changerPlayer = function() {
		this.player.onHidden();
		if (this.player === this.player1) {
			this.player = this.player2;
		}else{
			this.player = this.player1;
		}

		Home.cameraStop = true;
		let x = 500 - this.player._x;
		if(x > this.maxX){
			x = this.maxX;
		}
		if(x < this.minX){
			x = this.minX;
		}
		Home.ground.runAction(
			RedT.moveTo(0.4, RedT.v2(x, -200)),
			RedT.delayTime(0.4),
			RedT.callFunc(function(){
				Home.cameraStop = false;
				this.player.onPlay();
			}, this),
		);
	}

	Home.checkWin = function() {
		if (this.player1.hp <= 0 || this.player2.hp <= 0) {
			let nodeWin = new RedT.Node({
				x: RedT.decorator.canvas.width/2,
				y: RedT.decorator.canvas.height/2,
				scale: 0.6,
			});
			let sprite = new RedT.Sprite(RedT.decorator.resources['win']);
			nodeWin.addComponent(sprite);

			let nodeThang = new RedT.Node({
				x: RedT.decorator.canvas.width/2,
				y: 200,
				scale: 0.6,
			});
			sprite = new RedT.Sprite(RedT.decorator.resources['thang']);
			nodeThang.addComponent(sprite);

			this.Game.addChild(nodeWin, nodeThang);
		}else{
			this.changerPlayer();
		}
	}

	Home.onMouseStart = function(e) {
		if (this.cameraStop === false) {
			this.controllCamere = true;
			let point = RedT.pointTouch(e);
			this.offset.x = point.x-this.ground._x;
			this.offset.y = point.y-this.ground._y;
		}
	}

	Home.onMouseMove  = function(e) {
		if (this.cameraStop === false) {
			this.controllCamere = true;
			let point = RedT.pointTouch(e);
			let x = point.x-this.offset.x;
			let y = point.y-this.offset.y;
			this.cameraMoveToX(x);
			this.cameraMoveToY(y);
		}
	}

	Home.onMouseEnd = function(e) {}

	Home.keydown = function(e){
		if (this.isPlay && this.player !== null && this.player.yourTurn) {
			let code = e.keyCode;
			let isMove = false;
			if (code === 39 || code === 68) {
				isMove = true;
				if (this.player.huong !== 'right') {
					this.player.huong = 'right';
					this.player.scaleX = 1;
					this.player._lineGraphics.node.x = 10;
					this.player._lineGraphics.node.rotation = this.player._lineGraphics.node.rotation*-1;
					this.player._lineRotation = -1;
				}
			}else if(code === 37 || code === 65){
				isMove = true;
				if (this.player.huong !== 'left') {
					this.player.huong = 'left';
					this.player.scaleX = -1;
					this.player._lineGraphics.node.rotation = this.player._lineGraphics.node.rotation*-1;
					this.player._lineGraphics.node.x = -10;
					this.player._lineRotation = 1;
				}
			}

			if(code === 38 || code === 87){
				this.player.keyDownAngle = 1;
			}else if(code === 40 || code === 83){
				this.player.keyDownAngle = 0;
			}
			this.player.isKeyDown = isMove;

			if (code === 32) {
				this.player.isKeySpace = true;
			}
		}
	}

	Home.keyup = function(e){
		if (this.isPlay && this.player !== null && this.player.yourTurn) {
			let code = e.keyCode;
			if (code === 39 || code === 68 || code === 37 || code === 65){
				this.player.isKeyDown = false;
			}else if(code === 38 || code === 87 || code === 40 || code === 83){
				this.player.keyDownAngle = -1;
			}
			if (code === 32) {
				this.player.fire();
				this.player.isKeySpace = false;
			}
		}
	}

	// Di chuyển camera tới vị chí x
	Home.cameraMoveToX = function(x) {
		if(x > this.maxX){
			x = this.maxX;
		}
		if(x < this.minX){
			x = this.minX;
		}
		this.ground.x = x;
	}

	// Di chuyển camera tới vị chí y
	Home.cameraMoveToY = function(y) {
		if(y < -240){
			y = -240;
		}
		if(y > 240){
			y = 240;
		}
		this.ground.y = y;
	}

	Home._onChangerX = function(){
		let backgroundScaleX = Math.abs(this.ground._x/(this.maxX-this.minX));
		this.background.x = -(backgroundScaleX*595);
	}
	Home._onChangerY = function(){
		let backgroundScaleY = (this.ground._y+240)/480;
		this.background.y = backgroundScaleY*400-400;
	}

})(Home);
