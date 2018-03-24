cc.Class({
    extends: cc.Component,

    properties: {
        aliveFrame: cc.SpriteFrame,
        deadFrame: cc.SpriteFrame
    },

    danceLikePhantom() {
        const jumpUpAction = cc.moveBy(0.25, cc.p(0, 15));
        const jumpDownAction = cc.moveBy(0.25, cc.p(0, -15));
        this.node.runAction(cc.repeatForever(cc.sequence(jumpUpAction, jumpDownAction)));
    },

    becomeAlive() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.aliveFrame;
    },

    onLoad () {
        this.danceLikePhantom();
    },

    start () {

    },

    // update (dt) {},
});
