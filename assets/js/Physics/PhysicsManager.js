this.RedT = this.RedT || {};

(function() {
	RedT.PhysicsManager = function(){
		this.enabled = false;

		// các cơ thể được đăng ký
		this._bodies = [];

		// trọng lực
		this.gravity = RedT.v2(0, 0);

		// Tích lũy thời gian
		this._accumulator = 0;
	}

	let p = RedT.PhysicsManager.prototype;

	p.update = function(){
		if (!this.enabled)
			return;

		let bodies = this._bodies;
		if (this._accumulator === 0) {
			for (let i = 0, l = bodies.length; i < l; i++) {
				let body = bodies[i];
				let node = body.node;
				// lực tác dụng của trọng lực tăng nên
				///////////
			}
		}

		this._accumulator += RedT.TIME_FPS;
		if (this._accumulator >= 60) this._accumulator = 0;

		for (let i = 0, l = bodies.length; i < l; i++) {
			let body = bodies[i];
			let node = body.node;
			// Node di chuyển theo hướng của trọng lực
			////////////
		}
	}
})()
