const Slides = require('./Slides')
cc.Class({
    extends: Slides,

    properties: {
        
    },

    getSpeed() {
        return 60;
    },

    getSpaceBetween() {
        return 180;
    },
});
