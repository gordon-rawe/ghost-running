const utils = require('../utils/Utils');

cc.Class({
    extends: cc.ScrollView,

    properties: {

    },

    requestUsers() {
        utils.requestRankings()
            .then(users=>{
                this.displayUsers(users);
                console.log(users);
            })
            .catch(exception=>{
                
            });
    },

    displayUsers(users) {
    	this.getListComponent().displayUsers(users);
    },

    getListComponent() {
		return this.node.getChildByName('view').getChildByName('content').getComponent('RankingContent');
    },
});
