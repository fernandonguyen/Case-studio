
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

		this.scale = 0.8;
	}
	onCollisionEnter(collider1, collider2){
		let c1 = collider1._node === this ? collider2 : collider1;
		let c2 = collider1._node === this ? collider1 : collider2;
		this._body.type = 2;

		// đạn nổ
		let ef = new RedT.BulletEf();
		ef.x = c2._node._x;
		ef.y = c2._node._y;

		Home.ground.addChild(ef);
		this.destroy();
		this._body = null;
	}
}
