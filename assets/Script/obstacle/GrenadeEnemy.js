const Enemy = require('./Enemy');
cc.Class({
    extends: Enemy,

    properties: {
        
    },

    generateRandomHeight() {
        return this.FLOOR;
    },
});
