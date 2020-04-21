this.RedT = this.RedT || {};

(function(RedT) {
	RedT.PhysicsManager = function(){
		this.enabled = false;

		// các vật thể được đăng ký
		this._bodies = [];

		// trọng lực
		this.gravity = RedT.v2(0, 0.5);
	}

	let p = RedT.PhysicsManager.prototype;

	p.update = function(){
		if (!this.enabled)
			return;

		let bodies = this._bodies;
		for (let i = 0, l = bodies.length; i < l; i++) {
			let body = bodies[i];
			let node = body.node;
			if (body.type === 1 && node.active && !!node.parent) {

				// Giảm vận tốc tuyến tính
				// theo chiều x
				body.linearVelocity.x -= body.linearVelocity.x * body.linearDamping;
				//body.linearVelocity.y -= body.linearVelocity.y * body.linearDamping;

				// Tác dụng trọng lực
				body.linearVelocity.x += this.gravity.x*body.gravityScale;
				body.linearVelocity.y += this.gravity.y*body.gravityScale;

				// Áp dụng quay mô trọng lực
				node.x += body.linearVelocity.x;
				node.y += body.linearVelocity.y;
			}
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
	p.removeBody = function(body){
		let index = this._bodies.indexOf(body);
		this._bodies.splice(index, 1);
	}
})(RedT)
