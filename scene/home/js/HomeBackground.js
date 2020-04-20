
class HomeBackground extends RedT.Node {
	constructor() {
		super();

		this.x = -297.5;
		this.y = -400;
		this._anchorX = 0;
		this._anchorY = 0;

		this.addComponent(new RedT.Sprite(RedT.decorator.resources['home_background']));
	}
}
