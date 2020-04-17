'use strict';
(function(){
	window.onload = function() {
		RedT.decorator = new RedT.Controll('gameCanvas');
		RedT.decorator.loadScene(gameOto);
		//RedT.decorator.start();
	}
})();
