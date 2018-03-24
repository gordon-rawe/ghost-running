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
            userInstance.getComponent('RankingUser').fillData(v.rank, v.avatar, v.name, v.score);
            this.node.addChild(userInstance);
        });
    }
});
