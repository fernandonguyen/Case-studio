this.RedT = this.RedT || {}

class Sound extends RedT.Component {
	constructor(audio) {
		super();

		this._audio        = RedT.decorator.resources[audio];
		this._auto_play    = false;
		this._loop         = false;
		this._volume       = 1;

		document.body.appendChild(this._audio);

		this._audio.volume = 1;
	}

	play(){
		this.pause();
		this._audio.currentTime = 0;
		this._audio.play();
	}
	pause(){
		this._audio.pause();
	}
	stop(){
		
	}
	onDisable(){
		this.pause();
	}
	onDestroy(){
		this._audio.remove();
	}
}

RedT.Sound = Sound;
