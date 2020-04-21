
this.RedT = this.RedT || {};

(function() {
	class Action {
		constructor(target, action){
			this.target = target;
			this.action = action;
			this.index  = 0;
		}
		update(dt){
			if (this.index > this.action.length-1) {
				this.destroy();
				return void 0;
			}
			let action = this.action[this.index];
			if (action === void 0 || action.isDone) {
				this.index++;
				return this.update(dt);
			}
			action.isInit === false && action.init(this.target);
			return action.update(dt);
		}
		destroy(){
			delete this.target._action;
			delete this.target;
			for (let i = this.action.length - 1; i >= 0; i--) {
				let action = this.action[i];
				action.destroy !== void 0 && action.destroy();
			}
			delete this.action;
		}
	}

	RedT.Action = function(target, action) {
		return new Action(target, action);
	}
})();
