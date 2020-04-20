
class Ground extends RedT.Node {
	constructor() {
		super();

		this.x = -899;
		this.y = -240;
		this._anchorX = 0;
		this._anchorY = 0;
		this._group = 'ground';

		this.addComponent(new RedT.Sprite(RedT.decorator.resources['home_ground']));

		// Vật thể với hình phức tạp
		let collider = new RedT.PolygonCollider;
		collider.offset.y = 672;
		this.addComponent(collider);

		collider.points = [	
			RedT.v2(0,    -91.7),
			RedT.v2(73,   -97),
			RedT.v2(194,  -73),
			RedT.v2(339,  -84),
			RedT.v2(400,  -97),
			RedT.v2(623,  -85),
			RedT.v2(800,  -32),
			RedT.v2(1144, -14),
			RedT.v2(1442, 25),
			RedT.v2(1886, -19),
			RedT.v2(2136, -35),
			RedT.v2(2275, -85),
			RedT.v2(2508, -94),
			RedT.v2(2647, -69),
			RedT.v2(2898, -88),
			RedT.v2(2898, 83),
			RedT.v2(0,    85),
		];

		this.addComponent(collider);

		this._body = new RedT.PhysicsBody;
		this._body.type = 2;
		this.addComponent(this._body);
	}
}
