'use strict';
(function(){
	window.onload = function() {
		RedT.decorator = new RedT.Controll('gameCanvas');
		RedT.decorator.loadScene(splash);
		//RedT.decorator.start();
	}
})();