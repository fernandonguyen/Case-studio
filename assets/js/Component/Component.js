this.RedT = this.RedT || {};
(function() {
	RedT.Component = function(node){
		this.active = true;
		this.node   = node || null;
	}
	let p = RedT.Component.prototype;
	p.update    = null;
	p.start     = null;
	p.onEnable  = null;
	p.onDisable = null;
	p.onDestroy = null;
})()
