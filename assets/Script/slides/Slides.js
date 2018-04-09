cc.Class({
    extends: cc.Component,

    properties: {
        slides: [cc.Node]
    },

    onLoad() {
        this.initParams();
        if(this.getSpeed() > 0) {
            this.slides[0].x = this.ZERO_X;
            this.slides[1].x = this.ZERO_X + this.slides[0].width * this.slides[0].scaleX + this.getSpaceBetween();
        } else {
            this.slides[0].x = this.ZERO_X_REV;
            this.slides[1].x = this.ZERO_X_REV - this.slides[0].width * this.slides[0].scaleX - this.getSpaceBetween();
        }
    },

    initParams() {
        this.WINDOW_SIZE = cc.director.getWinSize();
        this.ZERO_X = -this.WINDOW_SIZE.width / 2;
        this.ZERO_X_REV = this.WINDOW_SIZE.width / 2;
    },

    moveCamera(moveX) {
        this.slides.forEach(slide => {
            slide.x -= moveX * this.getSpeed();
        });
        this.checkPerformRepeat();
    },

    getSpeed() {
        return 80;
    },

    getSpaceBetween() {
        return 0;
    },

    checkPerformRepeat() {
        if(this.getSpeed() > 0) {
            const nowRight = this.slides[0].x + this.slides[0].width * this.slides[0].scaleX;
            if (nowRight <= this.ZERO_X) {
                this.slides.push(this.slides.shift());
                this.slides[1].x = nowRight + this.slides[0].width * this.slides[0].scaleX + this.getSpaceBetween() * 2;
            }
        } else {
            const nowLeft = this.slides[0].x - this.slides[0].width * this.slides[0].scaleX;
            if (nowLeft >= this.ZERO_X_REV) {
                this.slides.push(this.slides.shift());
                this.slides[1].x = nowLeft - this.slides[0].width * this.slides[0].scaleX - this.getSpaceBetween() * 2;
            }
        }
    },
});
