
this.RedT = this.RedT || {};

class CallFunc {
	constructor(callback, target){
		this.callback = callback.bind(target);
		this.isDone   = false;
	}
	update(dt){
		if (this.isDone)
			return void 0;

		this.isDone = true;
		this.callback();
	}
	destroy(){
		delete this.callback;
	}
}

RedT.callFunc = function(callback, target) {
	return new CallFunc(callback, target);
}
