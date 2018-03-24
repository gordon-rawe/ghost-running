const Slides = require('slides/Slides');
cc.Class({
    extends: cc.Component,

    properties: {
        slideNodes: [Slides],
        backgroundClip: {
            url: cc.AudioClip,
            default: null
        },
        beePrefab: cc.Prefab,
    },

    onLoad: function () {
        this.playBackgroundMusic();
        this.initParams();
        this.startGame();
    },

    update: function (dt) {
        this.moveSlideNodes(dt);
    },

    initParams() {
        cc.speedRatio = 1;
    },

    playBackgroundMusic() {
        cc.audioEngine.play(this.backgroundClip, true, 1);
    },

    moveSlideNodes(dt) {
        this.slideNodes.forEach(slide => {
            slide.moveCamera(dt * cc.speedRatio);
        });
    },

    initSpeedRaiser() {
        this.speedTimer = setInterval(() => {
            cc.speedRatio += 0.08;
        }, 5000);
    },

    resetSpeedRaser() {
        if(this.speedTimer){
            this.clearInterval(this.speedRaiser);
        }
    },

    startGame() {
        this.initSpeedRaiser();
        this.spawnEnemies();
    },

    spawnEnemies() {
        this.spawnTimer = setInterval(() => {
            this.generateBeeEnemy();
        }, 3000);
    },

    stopSpawnEnemies() {
        if(this.spawnTimer) {
            clearInterval(this.spawnTimer);
        }
    },

    generateBeeEnemy() {
        const beeEnemy = cc.instantiate(this.beePrefab);
        this.node.addChild(beeEnemy);
    },
});
