
this.RedT = this.RedT || {};

class Bot1 extends RedT.Node {
	constructor(){
		super();

		this._sprite = new RedT.Sprite(RedT.decorator.resources['bot1_n_1']);
		this.addComponent(this._sprite);

		this.animationN.fps  = 60;
		this.animationN.loop = 1;
		this.animationN.anim = [
			'bot1_n_1',
			'bot1_n_2',
			'bot1_n_3',
			'bot1_n_4',
			'bot1_n_5',
			'bot1_n_6',
			'bot1_n_7',
			'bot1_n_8',
			'bot1_n_9',
			'bot1_n_10',
			'bot1_n_11',
			'bot1_n_12',
			'bot1_n_13',
			'bot1_n_14',
		];
	}
}
