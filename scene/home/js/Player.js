
class Player extends RedT.Node {
	constructor() {
		super();

		this.x      = 368;
		this.y      = 500;
		this._group = 'player';

		this.speed     = .2;
		this.huong     = 'right';
		this.isKeyDown = false;

		this.sprite = new RedT.Sprite(RedT.decorator.resources['anim_go_1']);
		this.addComponent(this.sprite);

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
		let code = e.keyCode;
		let isMove = false;
		if (code === 39 || code === 68) {
			isMove = true;
			if (this.huong !== 'right') {
				this.huong = 'right';
				this.scaleX = 1;
			}
		}else if(code === 37 || code === 65){
			isMove = true;
			if (this.huong !== 'left') {
				this.huong = 'left';
				this.scaleX = -1;
			}
		}
		this.isKeyDown = isMove;
	}
	keyup(e){
		let code = e.keyCode;
		if (code === 39 || code === 68 || code === 37 || code === 65){
			this.isKeyDown = false;
		}
	}

	update() {
		if (this.isKeyDown) {
			if (this.huong === 'right') {
				this.x += this.speed;
			}else{
				this.x -= this.speed;
			}
		}
	}
}
