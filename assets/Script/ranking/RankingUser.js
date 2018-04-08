cc.Class({
    extends: cc.Component,

    properties: {
        userIcon: cc.Sprite,
        userName: cc.Label,
        userId: cc.Label,
        userScore: cc.Label,
    },

    onLoad() {
    	this.loaded_ = [];
    },

    fillData(uId, uIcon, uName, uScore) {
    	this.userName.string = uName && uName.length > 12 ? uName.substring(0, 11) + '...' : uName;
    	this.userScore.string = uScore;
    	this.userId.string = uId;
        if(uId === 1) {
            this.userId.node.setColor(new cc.Color(255, 79, 25));
        } else if(uId === 2) {
            this.userId.node.setColor(new cc.Color(255, 136, 17));
        } else if(uId === 3) {
            this.userId.node.setColor(new cc.Color(255, 173, 16));
        } else {
            this.userId.node.setColor(new cc.Color(15, 17, 49));
        }
        this.displayIcon(uIcon);
    },

    displayIcon(iconUrl) {
    	console.log(iconUrl);
        let self = this;
        // cc.loader.load(iconUrl, {isCrossOrigin: true}, function (err, texture) {
        //     if (err) return cc.error(err.message || err);
        //     self.loaded_.push(texture);
        //     self.userIcon.spriteFrame = new cc.SpriteFrame(texture);
        // });
    },

    onDestroy() {
        for (let tex of this.loaded_) cc.loader.release(tex)
    },
});
