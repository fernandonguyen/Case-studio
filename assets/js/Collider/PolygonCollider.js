
this.RedT = this.RedT || {};

(function(RedT) {
    // Component biểu diễn hình đa điểm
    class PolygonCollider extends RedT.Collider {
        constructor() {
            super();
            this.threshold = {
                default: 1,
                serializable: false,
                visible: false
            };
            this._offset = RedT.v2(0, 0);

            // vị chí
            Object.defineProperty(this, 'offset',{
                get: function() {return this._offset},
                set: function(value) {
                    this._offset = value;
                    return value;
                }
            });
        }
    }

    PolygonCollider.prototype.points = [RedT.v2(-50,-50), RedT.v2(50, -50), RedT.v2(50,50), RedT.v2(-50,50)];

    RedT.PolygonCollider = PolygonCollider;
})(RedT)
