cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        window.player = this;
        this.initStates();
        this.initControl();
        this.getComponent(cc.Animation).play('walk');
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
        if(!this.clickable || !cc.gamePlaying) {
            return;
        }
        if(this.jumpTime === 0) {
            this.node.stopAllActions();
            this.getComponent(cc.Animation).play('first-jump');
            const jumpUpAction = cc.moveTo(this.FIRST_STAGE_DURATION, cc.p(this.initX, this.FIRST_STAGE_HEIGHT + this.initY)).easing(cc.easeSineOut());
            const jumpDownAction = cc.moveTo(this.FIRST_STAGE_DURATION, cc.p(this.initX, 0 + this.initY)).easing(cc.easeSineIn());
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
            const jumpUpAction = cc.moveTo(this.SECOND_STAGE_DURATION, cc.p(this.initX, this.SECOND_STAGE_HEIGHT + this.initY)).easing(cc.easeSineOut());
            const jumpDownAction = cc.moveTo(this.SECOND_STAGE_DURATION * 1.6, cc.p(this.initX, 0 + this.initY)).easing(cc.easeSineIn());
            this.node.runAction(cc.sequence(jumpUpAction, jumpDownAction, cc.callFunc(() => {
                this.getComponent(cc.Animation).play('normal');
                this.jumpTime = 0;
                this.clickable = true;
            })));
            this.jumpTime ++;
        }
    },

    fadeOutAndDisappear(callback) {
        cc.gamePlaying = false;
        this.node.runAction(cc.sequence(
            cc.fadeTo(0.15, 80),
            cc.fadeTo(0.15, 160),
            cc.fadeTo(0.15, 80), 
            cc.fadeTo(0.15, 0),
            cc.callFunc(() => {
            callback();
        })));
    },

    initStates() {
        this.jumpTime = 0;
        this.FIRST_STAGE_HEIGHT = 100;
        this.SECOND_STAGE_HEIGHT = 180;
        this.SECOND_THRESHOLD = 30;
        this.FIRST_STAGE_DURATION = 0.3;
        this.SECOND_STAGE_DURATION = 0.3;
        this.initY = this.node.y;
        this.initX = this.node.x;
        this.clickable = true;
    },

    resetStates() {
        this.node.stopAllActions();
        this.getComponent(cc.Animation).stop();
        this.node.enabled = false;
    },

    killedByMissle() {
        this.resetStates();
    },

    fallIntoWell() {
        this.resetStates();
    },

    reborn() {
        this.node.y = this.initY;
        this.node.x = this.initX;
        this.getComponent(cc.Animation).play('normal');
        this.node.enabled = true;
        this.jumpTime = 0;
        this.clickable = true;
        this.node.runAction(cc.fadeTo(0, 255));
    },

    onCollisionEnter(other, self) {
        if(other.node.getName() === 'well_lid') {
            this.fallIntoWell();
        } else {
            this.killedByMissle();
        }
        this.fadeOutAndDisappear(() => {
            this.node.dispatchEvent(new cc.Event.EventCustom('collision', true));
        });
    },
});
