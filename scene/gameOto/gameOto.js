this.gameOto = this.gameOto || {};

(function(){
	gameOto.isLoadAsset    = false;
	gameOto.Game           = null;
	gameOto.maxObstacles   = 5; // số chướng ngại vật tối đa trên màng hình
	gameOto.maxH           = 3; // số trái tin tối đa
	gameOto.countObstacles = 0; // số chướng ngại vật trên màng hình
	gameOto.countH         = 0; // số trái tim trên màng hình // mỗi trái tim là một điểm

	// thiết lập cảnh
	gameOto.init = function() {
		this.isStart    = true;
		this.score      = 0;

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
			this.oto       = new NodeOto;

			// điểm số
			let nodeScores = new RedT.Node({
				color:  'white',
				y:       40,
				anchorX: 0,
				anchorY: 0,
			});

			this.scores = new RedT.Label({string: 'Điểm số: 0'});
			nodeScores.addComponent(this.scores);
			nodeScores.x       = nodeScores.width;

			this.Game.addChild(background, this.box, this.oto, nodeScores);

			RedT.decorator.Game = this.Game;
			this.insertObstacles();
			this.insertHeart();

			// kích hoạt va chạm
			RedT.decorator.CollisionManager.enabled = true;
		}
	}

	gameOto.randomPoint = function(node){
		let x = (Math.random()* (RedT.decorator.canvas.width - 20))+20;
		let y = (Math.random()* (RedT.decorator.canvas.height - 20))+20;
		let check = this.checkCollisionAll(node, x, y);
		if (check) {
			this.randomPoint(node);
		}else{
			node.x = x;
			node.y = y;
		}
	}

	gameOto.checkCollisionAll = function(node, x, y) {
		let check = this.checkCollision(node, this.oto, x, y);
		if(check)
			return true;

		let result = false;
		this.box.children.forEach(function(nodeInBox){
			let check = this.checkCollision(node, nodeInBox, x, y);
			if(check){
				result = true;
			}
		}.bind(this));
		return result;
	}

	// đặt chướng Trái tim
	gameOto.insertHeart = function(){
		let check = this.maxH - this.countH;
		if (check > 0) {
			for(let i = 0; i < check; i++){
				this.createHeart();
			}
		}
	}

	// đặt chướng ngại vật
	gameOto.insertObstacles = function(){
		let check = this.maxObstacles - this.countObstacles;
		if (check > 0) {
			for(let i = 0; i < check; i++){
				this.createObstacles();
			}
		}
	}

	gameOto.createObstacles = function(){
		let node = new RedT.Node({
			scaleX: 0.5,
			scaleY: 0.5,
			_group: 'bot',
			name:   'bom',
		});
		let bom = new RedT.Sprite(RedT.decorator.resources['bom']);
		node.addComponent(bom);

		let collider = new RedT.CircleCollider;
		collider.radius = 22;
		collider.offset.x = node._regX;
		collider.offset.y = node._regY;
		node.addComponent(collider);

		this.box.addChild(node);
		this.randomPoint(node);
	}

	gameOto.createHeart = function(){
		let node = new RedT.Node({
			scaleX: 0.7,
			scaleY: 0.7,
			_group: 'bot',
		});
		let heart     = new RedT.Sprite(RedT.decorator.resources['heart']);
		node.addComponent(heart);

		let collider = new RedT.CircleCollider;
		collider.offset.x = node._regX;
		collider.offset.y = node._regY;
		node.addComponent(collider);

		this.box.addChild(node);
		this.randomPoint(node);
	}

	// Kiểm tra va chạm giữa các node 
	gameOto.checkCollision = function(node1, node2, x, y) {
		if (node1 == node2) {
			return false;
		}
	    if (x >= node2._x + node2._width ||
	    	x + node1._width <= node2.x ||
	    	y >= node2._y + node2._height ||
	    	y + node1._height <= node2._y)
	    {
	        return false;
	    } else {
	        return true;
	    }
	}
	gameOto.endGame = function(){
		// thông báo kết thúc
		let text = new RedT.Node({
			color:   'white',
			y:       RedT.decorator.canvas.height/2,
			x:       RedT.decorator.canvas.width/2,
			anchorX: 0,
			anchorY: 0,
		});
		let textComponent = new RedT.Label({font_type: 'bold', string: 'Kết Thúc...', size: '30',});
		text.addComponent(textComponent);
		this.Game.addChild(text);
	}
})()
