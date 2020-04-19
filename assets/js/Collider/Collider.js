
this.RedT = this.RedT || {};

(function(RedT) {
	class Collider extends RedT.Component {
		constructor() {
			super();
		}
		onEnable (){
			RedT.decorator.CollisionManager.addCollider(this);
		}
		onDisable(){
			RedT.decorator.CollisionManager.removeCollider(this);
		}
	}
	RedT.Collider = Collider;
})(RedT)
