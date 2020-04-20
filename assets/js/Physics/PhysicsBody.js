this.RedT = this.RedT || {};

(function() {
	class PhysicsBody extends RedT.Component {
		constructor() {
			super();

			this.active = true;
			this._node  = null;

			// type: loại vật thể
			// 1: chuyển dộng
			// 2: cố định
			this.type = 1;

			// vận tốc
			this.linearVelocity  = RedT.v2(0, 0);

			// Giảm vật tốc tuyến tính
			this.linearDamping   = 0;

			// Quy mô trọng lực tác dụng nên vật thể này
			this.gravityScale    = 1;

			// Ma sát khi va chạm với các vật thể khác
			this.friction        = 0;

			// Vận tốc góc
			//this.angularVelocity = 0;

			// Giảm vật tốc góc tuyến tính
			//this.angularDamping = 0;

			// loại bỏ xoay
			//this.fixedRotation   = false;
		}

		/**
		 * thực hiện sử lý khi 2 vật thể va chạm
		*/
		/**
		onCollisionEnter(collider1, collider2){
			if (this.type === 1) {
				if (collider1.type === 2) {

				}else{
					
				}
				console.log('va chạm');
			}
		}
		onCollisionStay(){
		}
		onCollisionExit(){
		}
		*/

		onEnable (){
			RedT.decorator.PhysicsManager.addBody(this);
		}
		onDisable(){
			RedT.decorator.PhysicsManager.removeBody(this);
		}
	}

	RedT.PhysicsBody = PhysicsBody;
})()
