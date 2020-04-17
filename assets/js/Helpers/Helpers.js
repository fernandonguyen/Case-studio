'use strict';

this.RedT = this.RedT || {};

RedT.TIME_FPS   = 1 / 60;
RedT.DEG_TO_RAD = Math.PI / 180;
RedT.RAD_TO_DEG = 180 / Math.PI;

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

// độ sang radian
RedT.degreesToRadians = function (angle) {
    return angle * RedT.DEG_TO_RAD;
};

// radian sang độ
RedT.radiansToDegrees = function (angle) {
    return angle * RedT.RAD_TO_DEG;
};
