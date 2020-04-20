'use strict';
this.RedT = this.RedT || {};
(function(){
	RedT.idNode = 1;
	RedT.Controll = function(game) {
		this.resources = {};    // lưu chữ tài nguyên web (images, audio)
		this.isPlay    = false;
		this.fps       = 60;         // thiết lập tốc độ khung hình/s (hz)

		this.timeFps   = 1/this.fps; // Thời gian vẽ hình

		this.interval  = null;

		this.canvas    = document.getElementById(game);
		this.ctx       = this.canvas.getContext('2d');

		// Quản lý tải trước web
		this.preload          = new RedT.PreLoad(this);

		// Quản lý Sự kiện
		this.Event            = new RedT.Event(this);

		// Quản lý môi trường vật lý
		this.PhysicsManager   = new RedT.PhysicsManager;

		// Quản lý va trạm
		this.CollisionManager = new RedT.CollisionManager;
	}

	let p = RedT.Controll.prototype;

	// tải cảnh
	p.loadScene = function(scene){
		this.scene = scene;
		if (this.scene !== void 0) {
			if (this.scene.assets !== void 0 && !this.scene.isLoadAsset) {
				this.preload.loadAssets(this.scene.assets, this.insertScene.bind(this));
			}else{
				// thiết lập cảnh
				this.scene.init();
				this.start();
			}
		}else{
			throw 'Cảnh không tồn tại.';
		}
	}

	// đặt cảnh
	p.insertScene = function(status){
		switch(status){
			case 'success':
				setTimeout(function(){
					this.scene.init();
					this.start();
					this.preload.controll.preLoad_process = 0;
				}.bind(this), 500);
				break;
		}
	}

	// Bắt đầu vẽ, đặt khung hình/s
	p.start = function(){
		if (this.isPlay === false) {
			this.isPlay   = true;
			this.interval = setInterval(this.update.bind(this), 1000/this.fps);
		}
	}

	p.stop = function(){
		clearInterval(this.interval);
		this.isPlay = false;
	}
	p.clear = function(){
		//this.ctx.fillStyle = 'black';
		//this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	// cập nhật khung hình
	p.update = function(){
		if (this.isPlay === true && this.Game !== void 0) {
			this.clear();
			this.PhysicsManager.update();
			this.CollisionManager.update();
			this.Game.draw();
		}else{
			this.stop();
		}
	}
})();
