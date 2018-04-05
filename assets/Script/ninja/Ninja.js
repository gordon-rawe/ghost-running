cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.initStates();
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
        if(!this.clickable) {
            return;
        }
        if(this.jumpTime === 0) {
            this.node.stopAllActions();
            this.getComponent(cc.Animation).play('first-jump');
            const jumpUpAction = cc.moveTo(this.FIRST_STAGE_DURATION, cc.p(this.initX, this.FIRST_STAGE_HEIGHT + this.initY));
            const jumpDownAction = cc.moveTo(this.FIRST_STAGE_DURATION, cc.p(this.initX, 0 + this.initY));
            this.node.runAction(cc.sequence(jumpUpAction, jumpDownAction, cc.callFunc(() => {
                this.getComponent(cc.Animation).play('normal');
                this.jumpTime = 0;
            })));
            this.jumpTime ++;
        }else {
            if(this.node.y < this.SECOND_THRESHOLD + this.initY) {
                return;
            }
            this.clickable = false;
            this.node.stopAllActions();
            this.getComponent(cc.Animation).play('second-jump');
            const jumpUpAction = cc.moveTo(this.SECOND_STAGE_DURATION, cc.p(this.initX, this.SECOND_STAGE_HEIGHT + this.initY));
            const jumpDownAction = cc.moveTo(this.SECOND_STAGE_DURATION * 1.6, cc.p(this.initX, 0 + this.initY));
            this.node.runAction(cc.sequence(jumpUpAction, jumpDownAction, cc.callFunc(() => {
                this.getComponent(cc.Animation).play('normal');
                this.jumpTime = 0;
                this.clickable = true;
            })));
            this.jumpTime ++;
        }
    },

    initStates() {
        this.jumpTime = 0;
        this.FIRST_STAGE_HEIGHT = 100;
        this.SECOND_STAGE_HEIGHT = 180;
        this.SECOND_THRESHOLD = 50;
        this.FIRST_STAGE_DURATION = 0.3;
        this.SECOND_STAGE_DURATION = 0.3;
        this.initY = this.node.y;
        this.initX = this.node.x;
        this.clickable = true;
    },
});
