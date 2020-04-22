
this.RedT = this.RedT || {};

class Bullet extends RedT.Node {
	constructor() {
		super();

		this.sprite = new RedT.Sprite(RedT.decorator.resources['tvtl1']);
		this.addComponent(this.sprite);

		// Cơ thể vật lý
		this._body = new RedT.PhysicsBody;

		// Giảm vận tốc tuyến tính X
		this._body.linearDamping = 0.01;

		this.addComponent(this._body);

		// Va chạm
		let collider = new RedT.CircleCollider;
		collider.radius = 28;
		collider.offset.x = this._regX;
		collider.offset.y = this._regY;
		this.addComponent(collider);

		this.toX = false;
		this.toY = false;

		this.offset  = RedT.v2();
		this.offset2 = RedT.v2();

		this.scale = 0.8;
		Home.controllCamere = false;
	}
	onCollisionEnter(collider1, collider2){
		let c1 = collider1._node === this ? collider2 : collider1;
		let c2 = collider1._node === this ? collider1 : collider2;

		// Âm thanh đạn nổ

		if (c1._node._group === 'fixbox') {
			Home.checkWin();
		}else{
			if (Home.player._group === 'player2') {
				Home.sound_feather.play();
			}else{
				Home.sound_xiaopao.play();
			}
			// đạn nổ
			let ef = new RedT.BulletEf();
			ef.x = c2._node._x;
			ef.y = c2._node._y;

			if (c1._node.name === 'player') {
				c1._node.hp -= 30;
				if (c1._node.hp <= 0) {
					c1._node.hp = 0;
				}
			} else if(c2._node.name === 'player') {
				c2._node.hp -= 30;
				if (c2._node.hp <= 0) {
					c2._node.hp = 0;
				}
			}
			Home.ground.addChild(ef);
		}

		this.destroy();
		this._body = null;
	}

	_onChangerX(){
		if (Home.controllCamere === false && !!this.parent) {
			let x = this.getX();
			let canvas = RedT.decorator.canvas;
			if (this.toX !== true) {
				if (x >= canvas.width-this._width) {
					this.toX       = true;
					this.offset.x  = this._x-Home.ground._x;
					this.offset2.x = this._x-this.offset.x;
				}else if (x < this._width*2) {
					this.toX       = true;
					this.offset.x  = this._x-Home.ground._x;
					this.offset2.x = this._x-this.offset.x;
				}
			}
			if (this.toX) {
				x = this._x-this.offset.x;
				x = this.offset2.x-(x-this.offset2.x);
				Home.cameraMoveToX(x);
			}
		}
	}
}
