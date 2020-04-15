'use strict';

this.RedT = this.RedT || {};

RedT.Controll = function(game) {
	this.resources = {};    // lưu chữ tài nguyên web (images, audio)
	this.isPlay    = false;
	this.fps       = 60;    // thiết lập tốc độ khung hình/s (hz)

	this.interval  = null;

	this.canvas    = document.getElementById(game);
	this.ctx       = this.canvas.getContext('2d');

	this.preload   = new RedT.PreLoad(this);
	//this.init();
}

RedT.Controll.prototype.init = function(){
	//window.onresize = this.reportWindowSize.bind(this);
	//this.reportWindowSize();
	//this.ctx.save();
	//this.start();
	//this.loadScene();
}

RedT.Controll.prototype.touch = function(){
}

RedT.Controll.prototype.regEventTouch = function(){
	//this.canvas.addEventListener('touchstat',  this.touch);
	//this.canvas.addEventListener('touchenter', this.touch);
	//this.canvas.addEventListener('touchend',   this.touch);
	//this.canvas.addEventListener('touchcaner', this.touch);
}

// tải cảnh
RedT.Controll.prototype.loadScene = function(scene){
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
RedT.Controll.prototype.insertScene = function(status){
	switch(status){
		case 'success':
			this.scene.init();
			this.start();
			break;
	}
}

RedT.Controll.prototype.start = function(){
	if (this.isPlay === false) {
		this.isPlay   = true;
		this.interval = setInterval(this.update.bind(this), 1000/this.fps);
	}
}

RedT.Controll.prototype.restart = function(){
	if (this.isPlay) {
		this.isPlay = false;
		this.stop();
		//this.resetNode();
		this.start();
	}
}

RedT.Controll.prototype.resetNode = function(){
	
}
RedT.Controll.prototype.clear = function(){
	//this.ctx.fillStyle = 'black';
	//this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

RedT.Controll.prototype.stop = function(){
	clearInterval(this.interval);
	this.isPlay = false;
}

// cập nhật khung hình
RedT.Controll.prototype.update = function(){
	if (this.isPlay === true && this.Game !== void 0) {
		this.clear();
		this.Game.draw();
	}else{
		this.stop();
	}
}
