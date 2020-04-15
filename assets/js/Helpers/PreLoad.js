this.RedT = this.RedT || {};
(function(){
	RedT.PreLoad = function(controll) {
		this.controll = controll;
	}
	let p = RedT.PreLoad.prototype;
	// Tải kho tài nguyên mới
	p.loadAssets = function(assets, callback){
		this.controll.preLoad_total   = assets.length;
		this.controll.preLoad_process = 0;

		assets.forEach((asset)=>{
			this.load(asset);
		});
		this.callback = callback;
	}

	// Tải
	p.load = function(asset){
		if (!!asset || asset.name === void 0 || asset.src === void 0 || asset.type === void 0) {
			switch(asset.type){
				case 'image':
					this.loadImage(asset);
					break;

				case 'sound':
					this.loadSound(asset);
					break;

				default:
					this.exceptionCode();
					break;
			}
		} else{
			this.exceptionCode();
		}
	}

	p.exceptionCode = function(){
		throw 'Sai cú pháp khai báo tài nguyên.';
	}
	p.exceptionExist = function(){
		throw 'Tên tài nguyên đã tồn tại.';
	}

	p.loadImage = function(asset){
		if (this.controll.resources[asset.name] === void 0) {
			let image = new Image();
			this.controll.resources[asset.name] = image;
			image.onload = function(e){
				this.controll.preLoad_process++;
				if (this.controll.preLoad_process/this.controll.preLoad_total === 1 && this.callback) {
					this.callback('success');
					delete this.callback;
					this.controll.scene.isLoadAsset = true;
				}
			}.bind(this);
			image.src = asset.src;
		}else{
			this.exceptionExist();
		}
	}

	p.loadSound = function(asset){
	}
})();
