
this.RedT = this.RedT || {};

(function() {
	RedT.Component = function(){
		this.active = true;
		this._node  = null;

		// thay đổi node
		Object.defineProperty(this, 'node',{
			get: function() {return this._node},
			set: function(value) {
				this._node = value;
				this.changerNode && this.changerNode();
				return value;
			}
		});
	}
	let p = RedT.Component.prototype;
	// Các cam kết
	//p.changerNode = null; // được gọi khi node thay đổi
	//p.update      = null; // được gọi trên mỗi khung hình
	//p.start       = null; // được gọi khi vẽ lần đầu tiên
	//p.onEnable    = null; // được gọi khi node bắt đầu được vẽ
	//p.onDisable   = null; // được gọi khi node không được vẽ
	//p.onDestroy   = null; // được gọi khi node bị phá hủy
})()
