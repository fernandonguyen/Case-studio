this.gameOto = this.gameOto || {};

(function(){
	gameOto.isLoadAsset = false;
	gameOto.Game        = null;

	// thiết lập cảnh
	gameOto.init = function() {
		if (this.Game === null) {
			this.Game = new RedT.Node;

			// background
			let background = new RedT.Node;
			let Sprite     = new RedT.Sprite(RedT.decorator.resources['background']);
			background.addComponent(Sprite);
			background.width  = 1100;
			background.height = 600;
			background.x      = 550;
			background.y      = 300;

			// hộp chứa chướng ngại vật
			this.box = new RedT.Node;

			// insert oto
			let oto = new NodeOto;

			// điểm số
			let nodeScores = new RedT.Node({
				color:  'white',
				y:       40,
				anchorX: 0,
				anchorY: 0,
			});

			this.scores = new RedT.Label({string: 'Điểm số: 0'});
			nodeScores.addComponent(this.scores);
			nodeScores.x       = nodeScores.width+0;

			this.Game.addChild(background, this.box, oto, nodeScores);

			RedT.decorator.Game = this.Game;
		}
	}
})()
