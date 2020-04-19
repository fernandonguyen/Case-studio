
this.RedT = this.RedT || {};

(function(RedT) {
	class BoxCollider extends RedT.Collider {
		constructor() {
			super();
			this._offset = RedT.v2(0, 0);
			this._size   = RedT.size(100, 100);

			this.isLoad = false;

			// vị chí
			Object.defineProperty(this, 'offset',{
				get: function() {return this._offset},
				set: function(value) {
					this._offset = value;
					return value;
				}
			});

			// kích thước
			Object.defineProperty(this, 'size',{
				get: function() {return this._size},
				set: function(value) {
					this._size.width  = value.width  < 0 ? 0 : value.width;
					this._size.height = value.height < 0 ? 0 : value.height;
					return value;
				}
			});
		}
	}
	RedT.BoxCollider = BoxCollider;
})(RedT)
