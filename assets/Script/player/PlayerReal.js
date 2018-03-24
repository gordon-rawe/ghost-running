cc.Class({
    extends: cc.Component,

    properties: {
        aliveFrame: cc.SpriteFrame,
        deadFrame: cc.SpriteFrame,
        jumpClip: {
            url: cc.AudioClip,
            default: null
        },
        MAX_JUMP_TIME: 0,
        STEP_HEIGHT: 0,
    },

    danceLikePhantom() {
        const jumpUpAction = cc.moveBy(0.25, cc.p(0, 15));
        const jumpDownAction = cc.moveBy(0.25, cc.p(0, -15));
        this.node.runAction(cc.repeatForever(cc.sequence(jumpUpAction, jumpDownAction)));
    },

    becomeAlive() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.aliveFrame;
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
        if(this.jumpTime >= this.MAX_JUMP_TIME) {
            return;
        }
        cc.audioEngine.play(this.jumpClip, false, 1);
        this.node.stopAllActions();
        const jumpDownFinishAction = cc.callFunc(function () {
            this.danceLikePhantom();
            this.jumpTime = 0;
        }, this);
        const jumpUpAction = cc.moveBy(this.getDurationDec(), cc.p(0, this.getStepHeight())).easing(cc.easeCubicActionOut());
        const jumpDownAction = cc.moveTo(this.getStepDuration(), cc.p(this.initX, this.initY)).easing(cc.easeCubicActionIn());
        this.node.runAction(cc.sequence(jumpUpAction, jumpDownAction, jumpDownFinishAction));
        this.jumpTime ++;
    },

    recordInitState() {
        this.initY = this.node.y;
        this.initX = this.node.x;
        this.jumpTime = 0;
    },

    getStepHeight() {
        let retHeight = this.STEP_HEIGHT;
        for(let i = 0; i < this.jumpTime; i++) {
            retHeight *= 0.7;
        }
        return retHeight;
    },

    getDurationDec() {
        let retTime = 0.45;
        for(let i = 0; i < this.jumpTime; i++) {
            retTime *= 0.7;
        }
        return retTime;
    },

    getStepDuration() {
        let retHeight = 0.3;
        for(let i = 0; i < this.jumpTime; i++) {
            retHeight += retHeight * 0.3;
        }
        return retHeight;
    },

    onLoad () {
        this.recordInitState();
        this.danceLikePhantom();
        this.initControl();
    },

    onCollisionEnter(other, self) {
        this.node.dispatchEvent(new cc.Event.EventCustom('collision', true));
    },
});
