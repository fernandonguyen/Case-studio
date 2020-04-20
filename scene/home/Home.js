
this.Home = this.Home || {};

(function(Home){
	Home.isLoadAsset = false;
	Home.Game        = null;

	Home.init = function() {
		if (this.Game === null) {
			// Game / camera
			this.Game = new RedT.Node({name:'camera', _anchorX: 0, _anchorY: 0, width:RedT.decorator.canvas.width, height:RedT.decorator.canvas.height});

			// background
			this.background = new RedT.Node({
				x: 550,
				y: 600,
				_anchorY: 1,
			});
			let sprite = new RedT.Sprite(RedT.decorator.resources['home_background']);
			this.background.addComponent(sprite);

			// ground
			this.ground = new RedT.Node({
				x: 550,
				y: 400,
			});
			let sprite_ground = new RedT.Sprite(RedT.decorator.resources['home_ground']);
			this.ground.addComponent(sprite_ground);

			this.Game.addChild(this.background, this.ground);
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
		//console.log(e);
		console.log('điểm nhấn', RedT.pointTouch(e));
	}
	Home.onMouseMove  = function(e) {
		console.log('điểm di chuyển', RedT.pointTouch(e));
	}
	Home.onMouseEnd   = function(e) {
		console.log('điểm kết thúc', RedT.pointTouch(e));
	}

})(Home);
