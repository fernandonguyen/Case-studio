 
 this.RedT = this.RedT || {};

/** 
 * Nhóm node
 * chỉ dành cho va chạm *
 */

(function(RedT) {
	RedT.groupMatrix = {
		// đạn va chạm với ...
		dan: {
			bot: true,
		},
		// bot va chạm với ...
		bot: {
			dan: true,
		},
	};
})(RedT);
