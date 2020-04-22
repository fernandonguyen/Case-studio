
this.RedT = this.RedT || {};

class BulletEf extends RedT.Node {
	constructor() {
		super();

		this._sprite = new RedT.Sprite(RedT.decorator.resources['ef_bullet_bug_1']);
		this.addComponent(this._sprite);

		this.animation = new RedT.Animation;
		this.addComponent(this.animation);

		if (Home.player._group === 'player2') {
			this.animation.fps  = 60;
			this.animation.loop = 1;
			this.animation.anim = [
				'ef_bullet_tt2_1',
				'ef_bullet_tt2_2',
				'ef_bullet_tt2_3',
				'ef_bullet_tt2_4',
				'ef_bullet_tt2_5',
				'ef_bullet_tt2_6',
				'ef_bullet_tt2_7',
				'ef_bullet_tt2_8',
				'ef_bullet_tt2_9',
				'ef_bullet_tt2_10',
				'ef_bullet_tt2_11',
				'ef_bullet_tt2_12',
				'ef_bullet_tt2_13',
				'ef_bullet_tt2_14',
				'ef_bullet_tt2_15',
				'ef_bullet_tt2_16',
			];
		}else{
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

		this.scale = 0.5;
	}
	onFinishAnimation(){
		Home.player1.updateHP();
		Home.player2.updateHP();
		this.destroy();
		this._sprite   = null;
		this.animation = null;
		setTimeout(function() {
			Home.checkWin();
		}, 500);
	}
}

RedT.BulletEf = BulletEf;
