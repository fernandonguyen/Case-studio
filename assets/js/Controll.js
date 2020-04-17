'use strict';
this.RedT = this.RedT || {};
(function(){
	RedT.idNode = 1;
	RedT.Controll = function(game) {
		this.resources = {};    // lưu chữ tài nguyên web (images, audio)
		this.isPlay    = false;
		this.fps       = 60;    // thiết lập tốc độ khung hình/s (hz)

		this.interval  = null;

		this.canvas    = document.getElementById(game);
		this.ctx       = this.canvas.getContext('2d');
		// Quản lý tải trước web
		this.preload   = new RedT.PreLoad(this);
		this.Event     = new RedT.Event(this);
		//this.init();
	}

	let p = RedT.Controll.prototype;

	p.init = function(){
		//window.onresize = this.reportWindowSize.bind(this);
		//this.reportWindowSize();
		//this.ctx.save();
		//this.start();
		//this.loadScene();
	}

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
				this.scene.init();
				this.start();
				break;
		}
	}

	p.start = function(){
		if (this.isPlay === false) {
			this.isPlay   = true;
			this.interval = setInterval(this.update.bind(this), 1000/this.fps);
		}
	}

	p.restart = function(){
		if (this.isPlay) {
			this.isPlay = false;
			this.stop();
			//this.resetNode();
			this.start();
		}
	}

	p.resetNode = function(){
		
	}
	p.clear = function(){
		//this.ctx.fillStyle = 'black';
		//this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	p.stop = function(){
		clearInterval(this.interval);
		this.isPlay = false;
	}

	// cập nhật khung hình
	p.update = function(){
		if (this.isPlay === true && this.Game !== void 0) {
			this.clear();
			this.Game.draw();
		}else{
			this.stop();
		}
	}
})();
