cc.Class({
    extends: cc.Component,

    properties: {
        slides: [cc.Node]
    },

    onLoad() {
        this.initParams();
        this.slides[0].x = this.ZERO_X;
        this.slides[1].x = this.ZERO_X + this.slides[0].width * this.slides[0].scaleX + this.getSpaceBetween();
    },

    initParams() {
        this.WINDOW_SIZE = cc.director.getWinSize();
        this.ZERO_X = -this.WINDOW_SIZE.width / 2;
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
        const nowRight = this.slides[0].x + this.slides[0].width * this.slides[0].scaleX;
        if (nowRight <= this.ZERO_X) {
            this.slides.push(this.slides.shift());
            this.slides[1].x = nowRight + this.slides[0].width * this.slides[0].scaleX + this.getSpaceBetween() * 2;
        }
    },
});
