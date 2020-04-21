
this.RedT = this.RedT || {};

class BulletEf extends RedT.Node {
	constructor() {
		super();

		this._sprite = new RedT.Sprite(RedT.decorator.resources['ef_bullet_bug_1']);
		this.addComponent(this._sprite);

		this.animation = new RedT.Animation;
		this.addComponent(this.animation);

		this.animation.fps  = 60;
		this.animation.loop = 1;
		this.animation.anim = [
			'ef_bullet_bug_1',
			'ef_bullet_bug_2',
			'ef_bullet_bug_3',
			'ef_bullet_bug_4',
			'ef_bullet_bug_5',
			'ef_bullet_bug_6',
			'ef_bullet_bug_7',
			'ef_bullet_bug_8',
			'ef_bullet_bug_9',
			'ef_bullet_bug_10',
			'ef_bullet_bug_11',
			'ef_bullet_bug_12',
			'ef_bullet_bug_13',
			'ef_bullet_bug_14',
			'ef_bullet_bug_15',
			'ef_bullet_bug_16',
			'ef_bullet_bug_17',
			'ef_bullet_bug_18',
			'ef_bullet_bug_19',
			'ef_bullet_bug_20',
			'ef_bullet_bug_21',
			'ef_bullet_bug_22',
			'ef_bullet_bug_23',
			'ef_bullet_bug_24',
		];
	}
	onFinishAnimation(){
		this.destroy();
		this._sprite   = null;
		this.animation = null;
	}
}

RedT.BulletEf = BulletEf;
