

this.RedT = this.RedT || {};

(function(RedT){
	// Các hàm kiểm tra va chạm.
	let Intersect = {};
	Intersect.lineLine = function(a1, a2, b1, b2){
	    let ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
	    let ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
	    let u_b  = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

	    if ( u_b !== 0 ) {
	        let ua = ua_t / u_b;
	        let ub = ub_t / u_b;

	        if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
	            return true;
	        }
	    }

	    return false;
	}

	Intersect.lineRect = function( a1, a2, b ) {
	    let r0 = RedT.v2(b.x,    b.y);
	    let r1 = RedT.v2(b.x,    b.yMax);
	    let r2 = RedT.v2(b.xMax, b.yMax);
	    let r3 = RedT.v2(b.xMax, b.y);

	    if (Intersect.lineLine( a1, a2, r0, r1 ))
	        return true;

	    if (Intersect.lineLine( a1, a2, r1, r2 ))
	        return true;

	    if (Intersect.lineLine( a1, a2, r2, r3 ))
	        return true;

	    if (Intersect.lineLine( a1, a2, r3, r0 ))
	        return true;

	    return false;
	}

	// Kiểm tra đương thẳng có đi qua một đa giác
	/**
	 * {v2}  a1 - Điểm bắt đầu của đường thẳng
 	 * {v2}  a2 - Điểm kết thúc của đường thẳng
 	 * {v2[]} b - Mảng các đỉnh của đa giác
	*/
	Intersect.linePolygon = function(a1, a2, b) {
	    let length = b.length;

	    for (let i = 0; i < length; ++i) {
	        let b1 = b[i];
	        let b2 = b[(i+1)%length];

	        if (Intersect.lineLine( a1, a2, b1, b2 ))
	            return true;
	    }

	    return false;
	}

	/**
	 * Tứ giác với Tứ giác
	 * {Rect} a - tứ giác
	 * {Rect} b - tứ giác
	 */
	Intersect.rectRect = function(a, b){
	    let a_min_x = a.x;
	    let a_min_y = a.y;
	    let a_max_x = a.x + a.width;
	    let a_max_y = a.y + a.height;

	    let b_min_x = b.x;
	    let b_min_y = b.y;
	    let b_max_x = b.x + b.width;
	    let b_max_y = b.y + b.height;

	    return a_min_x <= b_max_x &&
	           a_max_x >= b_min_x &&
	           a_min_y <= b_max_y &&
	           a_max_y >= b_min_y
	           ;
	}

	/**
	 * Tứ giác với đa giác
	 * {Rect}   a - tứ giác
	 * {Vec2[]} b - Các điểm của đa giác
	 */
	Intersect.rectPolygon = function( a, b ) {
	    let i, l;
	    let r0 = RedT.v2(a.x,    a.y);
	    let r1 = RedT.v2(a.x,    a.yMax);
	    let r2 = RedT.v2(a.xMax, a.yMax);
	    let r3 = RedT.v2(a.xMax, a.y);

	    // kiểm cha va chạm
	    if (Intersect.linePolygon( r0, r1, b ) )
	        return true;

	    if (Intersect.linePolygon( r1, r2, b ) )
	        return true;

	    if (Intersect.linePolygon( r2, r3, b ) )
	        return true;

	    if (Intersect.linePolygon( r3, r0, b ) )
	        return true;

	    // kiểm cha a chứa b
	    for ( i = 0, l = b.length; i < l; ++i ) {
	        if (Intersect.pointInPolygon(b[i], a))
	            return true;
	    }

	    // kiểm cha b chứa a
	    if (Intersect.pointInPolygon(r0, b))
	        return true;

	    if (Intersect.pointInPolygon(r1, b))
	        return true;

	    if (Intersect.pointInPolygon(r2, b))
	        return true;

	    if (Intersect.pointInPolygon(r3, b))
	        return true;

	    return false;
	}


	/**
	 * Kiểm tra va chạm giữa 2 đa giác
	 * {Vec2[]} a - Mảng các đỉnh của đa giác 1
	 * {Vec2[]} b - Mảng các đỉnh của đa giác 2
	 */
	Intersect.polygonPolygon = function(a, b){
	    let i, l;

	    // kiểm tra a có va chạm b hay không
	    for (i = 0, l = a.length; i < l; ++i ){
	        let a1 = a[i];
	        let a2 = a[(i+1)%l];

	        if (Intersect.linePolygon(a1, a2, b))
	            return true;
	    }

	    // kiểm tra a chứa b hay không
	    for(i = 0, l = b.length; i < l; ++i ){
	        if(Intersect.pointInPolygon(b[i], a) )
	            return true;
	    }

	    // kiểm tra b chứa a hay không
	    for(i = 0, l = a.length; i < l; ++i ){
	        if(Intersect.pointInPolygon( a[i], b ))
	            return true;
	    }

	    return false;
	}


	/**
	 * Kiểm tra va chạm giữa hai hình chòn
	 * {Object} a {vị trí, bán kính} {position: Vec2, radius: number}
	 * {Object} b {vị trí, bán kính} {position: Vec2, radius: number}
	 */
	Intersect.circleCircle = function(a, b) {
	    var distance = a.position.sub(b.position).mag();
	    return distance < (a.radius + b.radius);
	}

	/**
	 * Va chạn giữa đa giác với hình chòn
	 * {Vec2[]} polygon - Mảng các đỉnh của đa giác
	 * {Object} circle - {position: Vec2, radius: number}
	 */
	Intersect.polygonCircle = function(polygon, circle) {
	    let position = circle.position;
	    if (Intersect.pointInPolygon(position, polygon)) {
	        return true;
	    }

	    for (let i = 0, l = polygon.length; i < l; i++) {
	        let start = i === 0 ? polygon[polygon.length - 1] : polygon[i- 1];
	        let end = polygon[i];

	        if (Intersect.pointLineDistance(position, start, end, true) < circle.radius) {
	            return true;
	        }
	    }

	    return false;
	}

	/**
	 * Kiểm tra một điểm có nằm trong đa giác không?
	 * {Vec2}   point   - Điểm
	 * {Vec2[]} polygon - Mảng các đỉnh của đa giác
	 */
	Intersect.pointInPolygon = function(point, polygon){
	    let check = false;
	    let x = point.x;
	    let y = point.y;

	    let length = polygon.length;

	    for (let i = 0, j = length-1; i < length; j = i++) {
	        let xi = polygon[i].x, yi = polygon[i].y,
	            xj = polygon[j].x, yj = polygon[j].y,
	            intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

	        if (intersect) check = !check;
	    }

	    return check;
	}

	/**
	 * Tính khoảng cách từ một điểm đến đường thẳng
	 * {Vec2} point - Một điểm
	 * {Vec2} start - Điểm bắt đâu của đường thẳng
	 * {Vec2} end   - Điểm kết thúc của đương thẳng
	 * {boolean} isSegment - đường thẳng phân khúc
	 */
	Intersect.pointLineDistance = function(point, start, end, isSegment){
	    let dx = end.x - start.x;
	    let dy = end.y - start.y;
	    let d = dx*dx + dy*dy;
	    let t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / d;
	    let p;

	    if (!isSegment) {
	        p = RedT.v2(start.x + t * dx, start.y + t * dy);
	    }
	    else {
	        if (d) {
	            if (t < 0) p = start;
	            else if (t > 1) p = end;
	            else p = RedT.v2(start.x + t * dx, start.y + t * dy);
	        }
	        else {
	            p = start;
	        }
	    }
	        
	    dx = point.x - p.x;
	    dy = point.y - p.y;
	    return Math.sqrt(dx*dx + dy*dy);
	}

	RedT.Intersect = Intersect;
})(RedT);