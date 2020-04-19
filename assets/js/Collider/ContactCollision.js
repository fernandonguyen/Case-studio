
this.RedT = this.RedT || {};

(function(RedT){
    /**
     * liên hệ va chạm giữa 2 vật thể
    */
    RedT.ContactCollision = function(collider1, collider2){
        this.collider1 = collider1;
        this.collider2 = collider2;

        this.touching = false;

        let isCollider1Polygon = (collider1 instanceof RedT.BoxCollider) || (collider1 instanceof RedT.PolygonCollider);
        let isCollider2Polygon = (collider2 instanceof RedT.BoxCollider) || (collider2 instanceof RedT.PolygonCollider);
        let isCollider1Circle = collider1 instanceof RedT.CircleCollider;
        let isCollider2Circle = collider2 instanceof RedT.CircleCollider;

        if (isCollider1Polygon && isCollider2Polygon) {
            this.testFunc = RedT.Intersect.polygonPolygon;
        }
        else if (isCollider1Circle && isCollider2Circle) {
            this.testFunc = RedT.Intersect.circleCircle;
        }
        else if (isCollider1Polygon && isCollider2Circle) {
            this.testFunc = RedT.Intersect.polygonCircle;
        }
        else if (isCollider1Circle && isCollider2Polygon) {
            this.testFunc = RedT.Intersect.polygonCircle;
            this.collider1 = collider2;
            this.collider2 = collider1;
        }
        else {
            console.log(this.collider1, this.collider2);
            throw 'Lỗi bất ngờ. không thể xác định lớp va chạm';
        }
    }

    let p = RedT.ContactCollision.prototype;

    p.test = function () {
        let world1 = this.collider1.world;
        let world2 = this.collider2.world;

        if (!world1.aabb.intersects(world2.aabb)) {
            return false;
        }

        if (this.testFunc === RedT.Intersect.polygonPolygon) {
            return this.testFunc(world1.points, world2.points);
        }
        else if (this.testFunc === RedT.Intersect.circleCircle) {
            return this.testFunc(world1, world2);
        }
        else if (this.testFunc === RedT.Intersect.polygonCircle) {
            return this.testFunc(world1.points, world2);
        }

        return false;
    };

    p.updateState = function () {
        let result = this.test();

        let type = 0;
        if (result && !this.touching) {
            this.touching = true;
            type = 1;
        }
        else if (result && this.touching) {
            type = 2;
        }
        else if (!result && this.touching) {
            this.touching = false;
            type = 3;
        }

        return type;
    };
})(RedT);
