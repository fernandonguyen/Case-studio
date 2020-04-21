
class Bullet extends RedT.Node {
	constructor() {
		super();
		this._group = 'dan';
		this.name   = 'dan';

		this.sprite = new RedT.Sprite(RedT.decorator.resources['dan_5']);
		this.addComponent(this.sprite);

		// Cơ thể vật lý
		this._body = new RedT.PhysicsBody;

		this._body.linearDamping = 0.01;

		this.addComponent(this._body);

		// Va chạm
		let collider = new RedT.CircleCollider;
		collider.radius = 45;
		collider.offset.x = this._regX;
		collider.offset.y = this._regY;
		this.addComponent(collider);

		this.scale = 0.4;
	}
	onCollisionEnter(collider1, collider2){
		let collider = collider1 === this._body ? collider2 : collider1;
		this._body.type = 2;
		this.destroy();
		this._body = null;
		console.log(collider);
	}
}
