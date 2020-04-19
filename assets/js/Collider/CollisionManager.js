this.RedT = this.RedT || {};

(function() {
	// Khai báo hằng số trạng thái khi va chạm
	RedT.CollisionNone  = 0; // Không va chạm
	RedT.CollisionEnter = 1; // Bắt đầu va chạm
	RedT.CollisionStay  = 2; // Đang va chạm
	RedT.CollisionExit  = 3; // Kết thúc va chạm

	// quản lý va chạm
	RedT.CollisionManager = function(){
		this.enabled = false;

		// mảng các node đăng ký va chạm
		this._colliders = [];

		// Liên hệ va chạm giữa các Node
		this._contacts = [];

		this._vec2     = RedT.v2();

		this._enabledDebugDraw = true;
	}
	let p = RedT.CollisionManager.prototype;

	p.update = function (dt) {
		if (!this.enabled) {
			return;
		}

		let i, l;

		// update collider
		let colliders = this._colliders;
		for (i = 0, l = colliders.length; i < l; i++) {
			this.updateCollider(colliders[i]);
		}

		// Kiểm tra va chạm
		let contacts = this._contacts;
		let results = [];
		
		for (i = 0, l = contacts.length; i < l; i++) {
			let collisionType = contacts[i].updateState();
			if (collisionType === RedT.CollisionNone) {
				continue;
			}

			results.push([collisionType, contacts[i]]);
		}

		// Kiểm tra
		for (i = 0, l = results.length; i < l; i++) {
			let result = results[i];
			this._doCollide(result[0], result[1]);
		}
	}

	// Phát sự kiện
	p._doCollide = function (collisionType, contact) {
		let contactFunc;
		switch (collisionType) {
			case RedT.CollisionEnter:
				contactFunc = 'onCollisionEnter';
				break;
			case RedT.CollisionStay:
				contactFunc = 'onCollisionStay';
				break;
			case RedT.CollisionExit:
				contactFunc = 'onCollisionExit';
				break;
		}

		let collider1 = contact.collider1;
		let collider2 = contact.collider2;

		if (collider1._node[contactFunc]) {
			collider1._node[contactFunc](collider2, collider1);
		}

		if (collider2._node[contactFunc]) {
			collider2._node[contactFunc](collider2, collider1);
		}
	} 

	p.shouldCollide = function (c1, c2) {
		let node1 = c1._node, node2 = c2._node, groupMatrix = RedT.groupMatrix;
		return node1 !== node2 && groupMatrix[node1._group] !== void 0 && groupMatrix[node1._group][node2._group];
	}

	p.initCollider = function (collider) {
		if (!collider.world) {
			let world = collider.world = {};
			world.aabb    = RedT.rect();
			world.preAabb = RedT.rect();
			world.matrix  = new RedT.Matrix2D;

			world.radius = 0;

			if (collider instanceof RedT.BoxCollider) {
				world.position = null;
				world.points = [RedT.v2(), RedT.v2(), RedT.v2(), RedT.v2()];
			}
			else if (collider instanceof RedT.PolygonCollider) {
				world.position = null;
				world.points = collider.points.map(function (p) {
					return RedT.v2(p.x, p.y);
				});
			}
			else if (collider instanceof RedT.CircleCollider) {
				world.position = RedT.v2();
				world.points = null;
			}
		}
	}

	p.updateCollider = function (collider) {
		let offset = collider.offset;
		let world  = collider.world;
		let aabb   = world.aabb;

		let m = world.matrix;
		collider._node.matrix.copy(m);

		let preAabb = world.preAabb;
		preAabb.x = aabb.x;
		preAabb.y = aabb.y;
		preAabb.width = aabb.width;
		preAabb.height = aabb.height;

		if (collider instanceof RedT.BoxCollider) {
			let size = collider.size;

			aabb.x = offset.x - size.width/2;
			aabb.y = offset.y - size.height/2;
			aabb.width  = size.width;
			aabb.height = size.height;

			let wps = world.points;
			let wp0 = wps[0], wp1 = wps[1],
				wp2 = wps[2], wp3 = wps[3];
			RedT.obbApplyMatrix(aabb, m, wp0, wp1, wp2, wp3);

			let minx = Math.min(wp0.x, wp1.x, wp2.x, wp3.x);
			let miny = Math.min(wp0.y, wp1.y, wp2.y, wp3.y);
			let maxx = Math.max(wp0.x, wp1.x, wp2.x, wp3.x);
			let maxy = Math.max(wp0.y, wp1.y, wp2.y, wp3.y);

			aabb.x = minx;
			aabb.y = miny;
			aabb.width = maxx - minx;
			aabb.height = maxy - miny;
		}
		else if (collider instanceof RedT.CircleCollider) {
			// Tính vị trong canvas
			this._vec2.transformMat4(this._vec2, collider.offset, m);

			world.position.x = this._vec2.x;
			world.position.y = this._vec2.y;

			// Tính bán kính
			let tempx = m.tx, tempy = m.ty;
			m.tx = m.ty = 0;

			this._vec2.x = collider.radius;
			this._vec2.y = 0;

			this._vec2.transformMat4(this._vec2, this._vec2, m);
			let d = Math.sqrt(this._vec2.x * this._vec2.x + this._vec2.y * this._vec2.y);

			world.radius = d;

			aabb.x = world.position.x - d;
			aabb.y = world.position.y - d;
			aabb.width = d * 2;
			aabb.height = d * 2;

			m.tx = tempx;
			m.ty = tempy;
		}
		else if (collider instanceof RedT.PolygonCollider) {
			let points = collider.points;
			let worldPoints = world.points;

			worldPoints.length = points.length;

			let minx = 1e6, miny = 1e6, maxx = -1e6, maxy = -1e6;
			for (let i = 0, l = points.length; i < l; i++) {
				if (!worldPoints[i]) {
					worldPoints[i] = RedT.v2();
				}

				this._vec2.x = points[i].x + offset.x;
				this._vec2.y = points[i].y + offset.y;

				this._vec2.transformMat4(this._vec2, this._vec2, m);
				
				let x = this._vec2.x;
				let y = this._vec2.y;

				worldPoints[i].x = x;
				worldPoints[i].y = y;

				if (x > maxx) maxx = x;
				if (x < minx) minx = x;
				if (y > maxy) maxy = y;
				if (y < miny) miny = y;
			}

			aabb.x = minx;
			aabb.y = miny;
			aabb.width = maxx - minx;
			aabb.height = maxy - miny;
		}
	}

	p.addCollider = function (collider) {
		let colliders = this._colliders;
		let index = colliders.indexOf(collider);
		if (index === -1) {
			for (let i = 0, l = colliders.length; i < l; i++) {
				let other = colliders[i];
				if (this.shouldCollide(collider, other)) {
					let contact = new RedT.ContactCollision(collider, other);
					this._contacts.push(contact);
				}
			}

			colliders.push(collider);
			this.initCollider(collider);
		}
	}

	p.removeCollider = function (collider) {
		let colliders = this._colliders;
		let index = colliders.indexOf(collider);
		if (index >= 0) {
			colliders.splice(index, 1);

			let contacts = this._contacts;
			for (let i = contacts.length - 1; i >= 0; i--) {
				let contact = contacts[i];
				if (contact.collider1 === collider || contact.collider2 === collider) {
					if (contact.touching) {
						this._doCollide(RedT.CollisionExit, contact);
					}

					contacts.splice(i, 1);
				}
			}
		}
	}
})()
