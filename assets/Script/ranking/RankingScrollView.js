const Utils = require('../utils/Utils');

cc.Class({
    extends: cc.ScrollView,

    properties: {

    },

    uploadScoreAndRequestRankings(score) {
        Utils.uploadScore(score)
            .then(() => {
                return Utils.requestRankings();
            })
            .then(response=>{
                this.displayUsers(response.result);
            })
            .catch(exception=>{
                console.log(exception);
            });
    },

    displayUsers(users) {
    	this.getListComponent().displayUsers(users);
    },

    getListComponent() {
		return this.node.getChildByName('view').getChildByName('content').getComponent('RankingContent');
    },
});
