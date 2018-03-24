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
        bigRock: cc.Prefab,
        middleRock: cc.Prefab,
        smallRock: cc.Prefab,
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
            this.randomGenerate();
        }, 2000);
    },

    randomGenerate() {
        const seed = Math.floor(cc.random0To1() * 100) % 4;
        switch(seed) {
            case 0:
            case 4:
                this.generateBee();
                break;
            case 1:
                this.generateBigRock();
                break;
            case 2:
                this.generateMiddleRock();
                break;
            default:
                this.generateSmallRock();
                break;
        }
    },

    stopSpawnEnemies() {
        if(this.spawnTimer) {
            clearInterval(this.spawnTimer);
        }
    },

    generateBee() {
        const beeEnemy = cc.instantiate(this.beePrefab);
        this.node.addChild(beeEnemy);
    },

    generateBigRock() {
        const rock = cc.instantiate(this.bigRock);
        this.node.addChild(rock);
    },

    generateMiddleRock() {
        const rock = cc.instantiate(this.middleRock);
        this.node.addChild(rock);
    },
    
    generateSmallRock() {
        const rock = cc.instantiate(this.smallRock);
        this.node.addChild(rock);
    },
});
