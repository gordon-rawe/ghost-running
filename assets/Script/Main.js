const Slides = require('slides/Slides');
cc.Class({
    extends: cc.Component,

    properties: {
        slideNodes: [Slides],
        backgroundClip: {
            url: cc.AudioClip,
            default: null
        },
        playerNode: cc.Node,
        realPlayer: cc.Node,
        dieClip: {
            url: cc.AudioClip,
            default: null
        },
        beePrefab: cc.Prefab,
        bigRock: cc.Prefab,
        middleRock: cc.Prefab,
        smallRock: cc.Prefab,
        startBtn: cc.Node,
        restartBtn: cc.Node,
    },

    onLoad: function () {
        this.playBackgroundMusic();
        this.initParams();
        this.enableCollistionDetection();
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
            clearInterval(this.speedRaiser);
        }
        cc.speedRatio = 1;
    },

    startGame() {
        cc.gamePlaying = true;
        this.playerNode.active = true;
        this.startBtn.active = false;
        this.restartBtn.active = false;
        this.realPlayer.getComponent('PlayerReal').reborn();
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

    enableCollistionDetection() {
        cc.director.getCollisionManager().enabled = true;
        this.node.on('collision', (event) => {
            this.gameOver();
        });
    },

    gameOver() {
        cc.audioEngine.play(this.dieClip, false, 1);
        this.stopSpawnEnemies();
        this.resetSpeedRaser();
        cc.gamePlaying = false;
        setTimeout(() => {
            this.restartBtn.active = true;
        }, 200);
    },

    showRankingBoard() {

    },

    dismissRankingBoard() {

    },

    showShare() {

    },

    dismissShare() {

    },

    handleClickStart() {
        if(cc.gamePlaying) {
            return;
        }
        this.startGame();
    },

    handleClickRestart() {
        if(cc.gamePlaying) {
            return;
        }
        this.startGame();
    },
});
