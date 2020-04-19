
this.RedT = this.RedT || {};

(function(RedT){
    RedT.Size = function(width, height){
        if (width && typeof width === 'object') {
            height = width.height;
            width  = width.width;
        }
        this.width  = width  || 0;
        this.height = height || 0;
    }

    let p = RedT.Size.prototype;

    // đặt
    p.set = function (source) {
        this.width  = source.width;
        this.height = source.height;
    };

    RedT.size = function (w, h) {
        return new RedT.Size(w, h);
    };
})(RedT);
