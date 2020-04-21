
this.RedT = this.RedT || {};

(function(RedT) {
	class Animation extends RedT.Component {
		constructor() {
			super();

			this.fps       = 0;
			this.loop      = 1;
			this.anim      = [];
			this.time      = 0;
			this.nextFrame = 1;
		}
		update(dt){
			if (this.loop == 0)
				return void 0;

			let resources = RedT.decorator.resources;
			let frame = this.nextFrame-1;
			frame = this.anim[frame];
			this._node._sprite._frameSprite = resources[frame];
			if (this.time < (1/this.fps)*this.nextFrame) {
			}else{
				this.nextFrame++;
				if (this.nextFrame > this.anim.length) {
					this.nextFrame = 1;
					this.time = 0;
					if (this.loop > 0) {
						this.loop--;
						if (this.loop == 0) {
							this._node.onFinishAnimation !== void 0 && this._node.onFinishAnimation();
						}
					}
				}
			}

			this.time += dt;
		}
	}
	RedT.Animation = Animation;
})(RedT)
