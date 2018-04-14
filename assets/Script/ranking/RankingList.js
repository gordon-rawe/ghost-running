cc.Class({
    extends: cc.Component,

    properties: {
        userPrefab: cc.Prefab,
        defaultIcon: cc.SpriteFrame,
    },

    displayUsers(users) {
        this.node.removeAllChildren();
        users.forEach((v) => {
            const userInstance = cc.instantiate(this.userPrefab);
            const userInfo = JSON.parse(v.user_info);
            userInstance.getComponent('RankingUser').fillData(v.rank + 1, userInfo.avatarUrl, userInfo.userName, v.score);
            this.node.addChild(userInstance);
        });
    }
});
