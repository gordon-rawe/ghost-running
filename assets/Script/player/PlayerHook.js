cc.Class({
    extends: cc.Component,

    properties: {
        realPlayer: cc.Node,
        playerShadow: cc.Node,
        baseHeight: 0,  //该变量用于向player的最低值对齐
        maxHeight: 0,   //player最大的跳跃距离
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        window.shit = this.realPlayer;
    },

    update (dt) {
        const calcScale = (this.maxHeight - (this.realPlayer.y - this.baseHeight)* 0.2) / this.maxHeight;
        this.playerShadow.scale = calcScale > 1 ? 1 : calcScale < 0.5 ? 0.5 : calcScale;
    },
});
