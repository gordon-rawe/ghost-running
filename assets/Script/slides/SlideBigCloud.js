const Slides = require('./Slides')
cc.Class({
    extends: Slides,

    properties: {
        
    },

    getSpeed() {
        return 25;
    },

    getSpaceBetween() {
        return 80;
    },
});
