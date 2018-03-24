cc.Class({
    extends: cc.Component,

    properties: {
        realPlayer: cc.Node,
        playerShadow: cc.Node,
        baseHeight: 0,  //该变量用于向player的最低值对齐
        maxHeight: 0,   //player最大的跳跃距离
    },

    update (dt) {
        let calcScale = (this.maxHeight - (this.realPlayer.y - this.baseHeight)* 0.2) / this.maxHeight;
        calcScale = calcScale > 1 ? 1 : calcScale < 0.5 ? 0.5 : calcScale;
        this.playerShadow.setScale(calcScale);
    },
});
