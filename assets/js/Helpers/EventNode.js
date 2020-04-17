
this.RedT = this.RedT || {};

(function() {
	RedT.EventNode = function(node){
		this.event = {};
		this.node  = node;
	};

	let p = RedT.EventNode.prototype;
	p.on = function(type, callback, target){
		if (this.event[type] === void 0) {
			this.event[type] = {
				target:   target,
				callback: callback.bind(target)
			};
			RedT.decorator.Event.add(type, this);
		}
	}

	p.off = function(type, callback, target){
		if (this.event[type] !== void 0) {
			delete this.event[type].target;
			delete this.event[type].callback;
			delete this.event[type];
		}
	}

	// Nhận sự kiện từ trung tâm quản lý sự kiện
	p.setEvent = function(event){
		let type     = event.type;
		let getEvent = this.event[type];
		if (getEvent !== void 0) {
			getEvent.callback(event);
		}
	}
})()
