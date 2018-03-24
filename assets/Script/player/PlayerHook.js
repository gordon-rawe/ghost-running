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
        this.playerShadow.scale = (this.maxHeight - (this.realPlayer.y - this.baseHeight)* 0.3) / this.maxHeight;
        console.log(this.playerShadow.scale);
    },
});
