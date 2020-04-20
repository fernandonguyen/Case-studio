
this.RedT = this.RedT || {};

(function(RedT) {
	class SplashLoad extends RedT.Component {
		constructor() {
			super();
		}
		update(){
			let _preload = RedT.decorator.preload;
			let _process = _preload.process();
			console.log(_process);
			splash.progress_sprite.mask = _process;
			//splash.mask
		}
	}
	RedT.SplashLoad = SplashLoad;
})(RedT)
