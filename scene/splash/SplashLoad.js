
this.RedT = this.RedT || {};

(function(RedT) {
	class SplashLoad extends RedT.Component {
		constructor() {
			super();
		}
		update(){
			let _preload = RedT.decorator.preload;
			let _process = _preload.process();
			splash.progress_sprite.mask = _process;
		}
	}
	RedT.SplashLoad = SplashLoad;
})(RedT)
