cc.Class({
    extends: cc.Component,

    properties: {
        CEIL: 0,
        FLOOR: 0,
    },

    onLoad () {
        this.acquireWinInfo();
        this.placeBeeOutOfScreen();
    },

    acquireWinInfo() {
        this.winInfo = cc.director.getWinSize();
    },

    placeBeeOutOfScreen() {
        this.node.x = this.winInfo.width / 2 + this.node.width;
        this.node.y = this.generateRandomHeight();
    },

    checkAndDestroy() {
        if(this.node.x < -(this.winInfo.width / 2 + this.node.width)) {
            this.node.destroy();
            console.log("bee node destroyed...");
        }
    },

    update (dt) {
        this.moveCamera(dt);
        this.checkAndDestroy();
    },

    getSpeed() {
        return 150;
    },

    generateRandomHeight() {
        return cc.random0To1() * (this.CEIL - this.FLOOR) + this.FLOOR;
    },

    moveCamera(dt) {
        this.node.x -= dt * this.getSpeed() * cc.speedRatio;
    },
});
