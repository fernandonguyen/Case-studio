this.RedT = this.RedT || {}

class Sound extends RedT.Component {
	constructor(audio) {
		super();

		this._audio     = RedT.decorator.resources[audio];
		this._auto_play = false;
		this._loop      = false;
		this._volume    = 1;

		this._audio.volume = 1;
	}

	play(){
		RedT.decorator.canvas.focus();
		setTimeout(async function() {
			try {
				this.stop();
				await this._audio.play();
			}catch (e){
				this.play();
				throw 'Tài liệu âm thanh chưa được tải. Vui lòng Click vào màn hình Game.';
			}
		}.bind(this), 30);
	}
	pause(){
		this._audio.pause();
	}
	stop(){
		this._audio.pause();
		this._audio.currentTime = 0;
	}
	onDisable(){
		this.pause();
	}
	onDestroy(){
		this._audio.remove();
	}
}

RedT.Sound = Sound;
