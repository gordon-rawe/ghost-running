cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {        
        this.initControl();
    },

    initControl() {
        const listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touches, event) => {
                this.performJump();
                return true;
            },
        }
        cc.eventManager.addListener(listener, this.node);
    },

    performJump() {
        this.getComponent(cc.Animation).play('first-jump');
        const jumpUpAction = cc.moveBy(0.30, cc.p(0, 100));
        const jumpDownAction = cc.moveBy(0.30, cc.p(0, -100));
        this.node.runAction(cc.sequence(jumpUpAction, jumpDownAction, cc.callFunc(() => {
            this.getComponent(cc.Animation).play('normal');
        })));
    },

    danceLikePhantom() {
        const jumpUpAction = cc.moveBy(0.25, cc.p(0, 80));
        const jumpDownAction = cc.moveBy(0.25, cc.p(0, -80));
        this.node.runAction(cc.repeatForever(cc.sequence(jumpUpAction, jumpDownAction)));
    },

    start () {

    },

    // update (dt) {},
});
