const Slides = require('slides/Slides');
cc.Class({
    extends: cc.Component,

    properties: {
        slideNodes: [Slides]
    },

    onLoad: function () {
        
    },

    update: function (dt) {
        this.moveSlideNodes(dt);
    },

    moveSlideNodes(dt) {
        this.slideNodes.forEach(slide => {
            slide.moveCamera(dt);
        });
    },
});
