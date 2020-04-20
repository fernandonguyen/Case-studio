this.RedT = this.RedT || {};

(function(RedT) {
	RedT.PhysicsManager = function(){
		this.enabled = false;

		// các vật thể được đăng ký
		this._bodies = [];

		// trọng lực
		this.gravity = RedT.v2(0, 0.1);
	}

	let p = RedT.PhysicsManager.prototype;

	p.update = function(){
		if (!this.enabled)
			return;

		let bodies = this._bodies;
		for (let i = 0, l = bodies.length; i < l; i++) {
			let body = bodies[i];
			let node = body.node;

			// Tác dụng trọng lực
			body.linearVelocity.x += this.gravity.x;
			body.linearVelocity.y += this.gravity.y;
			node.x += body.linearVelocity.x;
			node.y += body.linearVelocity.y;
		}
	}

	// thêm vật thể mới
	p.addBody = function(body){
		let index = this._bodies.indexOf(body);
		if (index === -1) {
			this._bodies.push(body);
		}
	}

	// xóa vật thể
	p.removeBody = function(){
		let index = this._bodies.indexOf(body);
		this._bodies.splice(i, 1);
	}
})(RedT)
