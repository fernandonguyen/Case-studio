
this.Home = this.Home || {};

(function(Home){
	Home.isLoadAsset = false;
	Home.Game        = null;

	Home.init = function() {
		if (this.Game === null) {
			this.Game = new RedT.Node;

			// background
			let background = new RedT.Node;
			let Sprite = new RedT.Sprite(RedT.decorator.resources['home_background']);
			background.addComponent(Sprite);
			//background.width  = 1100;
			//background.height = 600;
			background.x      = 550;
			background.y      = 300;
			this.Game.addChild(background);
		}
		RedT.decorator.Game = this.Game;
	};
})(Home);
