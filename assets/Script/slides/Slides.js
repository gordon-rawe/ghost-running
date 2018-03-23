cc.Class({
    extends: cc.Component,

    properties: {
        slides: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    moveCamera(moveX) {
        console.log('moveX' + moveX);
        this.checkPerformRepeat();
        this.slides.forEach(slide => {
            slide.x -= moveX * this.getSpeed();
        });
    },

    getSpeed() {
        return 100;
    },

    checkPerformRepeat() {
        if (this.slides[0].x < -this.slides[0].width * this.slides[0].scale) {
            this.slides.push(this.slides.shift());
            this.slides[1].x = this.slides[0].x + this.slides[0].width * this.slides[0].scale;
        }
    },
});
