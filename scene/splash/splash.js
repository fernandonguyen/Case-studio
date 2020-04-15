this.splash = this.splash || {};

splash.isLoadAsset = false;
splash.Game        = null;

splash.loadScene = function() {
};

// thiết lập cảnh
splash.init = function() {
	if (this.Game === null) {
		this.Game = new RedT.Node;

		// background
		let background = new RedT.Node;
		let Sprite = new RedT.Sprite(RedT.decorator.resources['bg-frame']);
		background.addComponent(Sprite);
		background.width  = 1100;
		background.height = 600;
		background.x      = 550;
		background.y      = 300;
		this.Game.addChild(background);

		// progress_bg
		let progress_bg = new RedT.Node;
		let progress_bg_sprite = new RedT.Sprite(RedT.decorator.resources['progress_bg']);
		progress_bg.addComponent(progress_bg_sprite);
		progress_bg.x      = 550;
		progress_bg.y      = 500;
		progress_bg.scaleX = 0.8;
		progress_bg.scaleY = 0.8;
		this.Game.addChild(progress_bg);

		// progress
		let progress = new RedT.Node;
		let progress_sprite = new RedT.Sprite(RedT.decorator.resources['progress']);
		progress.addComponent(progress_sprite);
		progress_sprite.mask = 0;
		progress.y = -2;
		progress_bg.addChild(progress);

		console.log(progress_sprite);

		/**
		let children2 = new RedT.Node;
		this.Game.addChild(children2);


		let Label = new RedT.Label({
			string: 'Cái gì đó.\nhaha'
		});

		let Sprite2 = new RedT.Sprite(RedT.decorator.resources['splash_background']);
		children2.addComponent(Sprite2);

		children2.addComponent(Label);
		*/
	}
	RedT.decorator.Game = this.Game;
};
