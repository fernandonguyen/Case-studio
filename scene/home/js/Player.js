
class Player extends RedT.Node {
	constructor() {
		super();

		this.isPlay = true;
		this.x      = 368;
		this.y      = 500;
		this._group = 'player';

		this.speed     = .2;
		this.huong     = 'right';
		this.isKeyDown = false;


		this.keyDownAngle = -1;
		this.speedAngle   = .2;
		// Góc bắn hiện tại
		this.currentAngle = 10;
		// Góc bắn tối thiểu
		this.minAngle     = 10;
		// Góc bắn tối đa
		this.maxAngle     = 110;

		this._lineRotation = -1;

		let nodeSprite = new RedT.Node;
		this.sprite = new RedT.Sprite(RedT.decorator.resources['anim_go_1']);
		nodeSprite.addComponent(this.sprite);

		// Đường vẽ hướng bắn
		let nodeLine = new RedT.Node({
			anchorX:   0,
			x:         10,
			rotation: -10,
		});

		this._lineGraphics = new RedT.Graphics;
		nodeLine.addComponent(this._lineGraphics);

		this._lineGraphics.lineDash([2, 3, 2]);
		this._lineGraphics.strokeColor('#ffffff');
		this._lineGraphics.moveTo(30, 0);
		this._lineGraphics.lineTo(120, 0);
		this._lineGraphics.close();
		this._lineGraphics.stroke();

		this.addChild(nodeSprite, nodeLine);

		this._body = new RedT.PhysicsBody;
		this._body.type = 1;
		this.addComponent(this._body);

		// Vật thể với hình phức tạp
		let collider = new RedT.PolygonCollider;
		collider.points = [	
			RedT.v2(-25, 12),
			RedT.v2(-15, -15),
			RedT.v2(20,  -20),
			RedT.v2(30,   12),
			RedT.v2(-5,   35),
			RedT.v2(-5,   35),
		];
		collider.offset.x = this._regX;
		collider.offset.y = this._regY;
		this.addComponent(collider);
	}
	_onChangerX() {
		if (this._body !== void 0) {
			this._body.type = 1;
		}
	}
	onCollisionEnter(collider1, collider2){
		this._body.linearVelocity.y = RedT.decorator.PhysicsManager.gravity.y*-1;
		this._body.type = 2;
	}
	onCollisionStay(){
		this._body.type = 1;
		this._body.linearVelocity.y = RedT.decorator.PhysicsManager.gravity.y*-2;
	}
	onCollisionExit(){
		this._body.type = 2;
	}

	onEnable(){
		this.on('keydown', this.keydown, this);
		this.on('keyup',   this.keyup,   this);
	};

	onDisable(){
		this.off('keydown', this.keydown, this);
		this.off('keyup',   this.keyup,   this);
	};

	keydown(e){
		if (!this.isPlay) return;
		let code = e.keyCode;
		let isMove = false;
		if (code === 39 || code === 68) {
			isMove = true;
			if (this.huong !== 'right') {
				this.huong = 'right';
				this.scaleX = 1;
				this._lineGraphics.node.x = 10;
				this._lineGraphics.node.rotation = this._lineGraphics.node.rotation*-1;
				this._lineRotation = -1;
			}
		}else if(code === 37 || code === 65){
			isMove = true;
			if (this.huong !== 'left') {
				this.huong = 'left';
				this.scaleX = -1;
				this._lineGraphics.node.rotation = this._lineGraphics.node.rotation*-1;
				this._lineGraphics.node.x = -10;
				this._lineRotation = 1;
			}
		}else if(code === 38 || code === 87){
			this.keyDownAngle = 1;
		}else if(code === 40 || code === 83){
			this.keyDownAngle = 0;
		}
		this.isKeyDown = isMove;
	}
	keyup(e){
		if (!this.isPlay) return;
		let code = e.keyCode;
		if (code === 39 || code === 68 || code === 37 || code === 65){
			this.isKeyDown = false;
		}else if(code === 38 || code === 87 || code === 40 || code === 83){
			this.keyDownAngle = -1;
		}
	}

	update() {
		if (!this.isPlay){
			this.isKeyDown    = false;
			this.keyDownAngle = -1;
			return;
		};
		if (this.isKeyDown) {
			if (this.huong === 'right') {
				this.x += this.speed;
			}else{
				this.x -= this.speed;
			}
		}
		if (this.keyDownAngle === 1) {
			this.currentAngle += this.speedAngle;
			if(this.currentAngle > this.maxAngle){
				this.currentAngle = this.maxAngle;
			}
			this._lineGraphics.node.rotation = this._lineRotation*Math.abs(this.currentAngle);
		}else if (this.keyDownAngle === 0) {
			this.currentAngle -= this.speedAngle;
			if(this.currentAngle < this.minAngle){
				this.currentAngle = this.minAngle;
			}
			this._lineGraphics.node.rotation = this._lineRotation*Math.abs(this.currentAngle);
		}
	}
}
