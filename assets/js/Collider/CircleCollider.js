
this.RedT = this.RedT || {};

(function(RedT) {
	class CircleCollider extends RedT.Collider {
		constructor() {
			super();
			this._offset = RedT.v2(0, 0);
			this.radius  = 50;

			// vị chí
			Object.defineProperty(this, 'offset',{
				get: function() {return this._offset},
				set: function(value) {
					this._offset = value;
					return value;
				}
			});
		}
	}
	RedT.CircleCollider = CircleCollider;
})(RedT)
