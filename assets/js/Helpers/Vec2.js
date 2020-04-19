
this.RedT = this.RedT || {};

(function(RedT){
	class Vec2 {
		constructor(x, y){
			this.x = x || 0;
			this.y = y || 0;
		}

		// trả về bình phương độ dài của vector
		magSqr() {
			return Math.pow(this.x, 2) + Math.pow(this.y, 2);
		}

		/**
	   	* Đặt độ dài vector trong khoảng 0 - 1, (chỉ thay đổi độ dài)
	   	*/
		normalizeSelf() {
			let magSqr = Math.pow(this.x, 2) + Math.pow(this.y, 2);
			if (magSqr === 1.0 || magSqr === 0.0){
				return this;
			}

			let invsqrt = 1.0 / Math.sqrt(magSqr);
			this.x *= invsqrt;
			this.y *= invsqrt;
			return this;
		}

		/**
	   	* Nhấn với một số
	   	*/
		mulSelf(num) {
			this.x *= num;
			this.y *= num;
			return this;
		}

		/**
	   	* Chuyển đổi vector sang ma trận 4x4 (Transform trong canvas)
	   	*/
		transformMat4(out, a, m) {
			let x = a.x;
			let y = a.y;
			out.x = m.a * x + m.c * y + m.tx;
			out.y = m.b * x + m.d * y + m.ty;

			return out;
		}

		/**
		 * Tính độ dài của vector
		*/
		magnitude(a) {
			let x = a.x;
			let y = a.y;
			return Math.sqrt(x*x +y*y);
		}

		/**
		 * Rút gọn hàm tính độ dài
		*/
		mag(a) {
			return this.magnitude(a);
		}
	}

	RedT.Vec2 = Vec2;

	// tạo nhanh tạo độ vector
	RedT.v2 = function(x, y) {
		return new RedT.Vec2(x, y);
	}
})(RedT);
