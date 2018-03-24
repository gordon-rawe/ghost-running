cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    displayUsers(users) {
        this.node.height = users.length * 80 + 20;
        this.getListComponent().displayUsers(users);
    },

    getListComponent() {
        return this.node.getChildByName('ranking_list').getComponent('RankingList');
    }
});
