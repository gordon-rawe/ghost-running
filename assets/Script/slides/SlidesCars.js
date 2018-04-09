const Slides = require('./Slides')
cc.Class({
    extends: Slides,

    properties: {
        
    },

    getSpeed() {
        return -5;
    },

    getSpaceBetween() {
        return 20;
    },
});
