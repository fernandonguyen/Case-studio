'use strict';

this.RedT = this.RedT || {};

RedT.TIME_FPS            = 1/60;
RedT.DEG_TO_RAD          = Math.PI/180;
RedT.RAD_TO_DEG          = 180/Math.PI;
RedT.PTM_RATIO           = 32;
RedT.VELOCITY_ITERATIONS = 10;
RedT.POSITION_ITERATIONS = 10;
RedT.MAX_ACCUMULATOR     = 1/5;


// đệ quy: tính vị trí trên màn hình
RedT.setChildPosition = function(child, parent){
	if (parent !== null) {
		child.__x += parent._x;
		child.__y += parent._y;
		RedT.setChildPosition(child, parent.parent);
	}
}

// đệ quy: tính scale của node cha
RedT.setParentScale = function(child, parent){
	if (parent !== null) {
		child.__scaleX *= parent._scaleX;
		child.__scaleY *= parent._scaleY;
		RedT.setParentScale(child, parent.parent);
	}
}

// đệ quy: tính góc của các node cha
RedT.setParentRotation = function(child, parent){
	if (parent !== null) {
		child.__rotation += parent._rotation;
		RedT.setParentRotation(child, parent.parent);
	}
}

// tạo độ trễ ms
RedT.delayTime = function(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// chuyển độ sang radian
RedT.degreesToRadians = function(angle) {
	return angle * RedT.DEG_TO_RAD;
};

// chuyển radian sang độ
RedT.radiansToDegrees = function(angle) {
	return angle * RedT.RAD_TO_DEG;
};

RedT.obbApplyMatrix = function(rect, mat4, out_bl, out_tl, out_tr, out_br) {
	let x      = rect.x;
	let y      = rect.y;
	let width  = rect.width;
	let height = rect.height;

	let ma  = mat4.a,  mb = mat4.b,   mc = mat4.c, md = mat4.d;
	let mtx = mat4.tx, mty = mat4.ty;

	let tx = ma * x + mc * y + mtx;
	let ty = mb * x + md * y + mty;
	let xa = ma * width;
	let xb = mb * width;
	let yc = mc * height;
	let yd = md * height;

	out_tl.x = tx;
	out_tl.y = ty;
	out_tr.x = xa + tx;
	out_tr.y = xb + ty;
	out_bl.x = yc + tx;
	out_bl.y = yd + ty;
	out_br.x = xa + yc + tx;
	out_br.y = xb + yd + ty;
};
