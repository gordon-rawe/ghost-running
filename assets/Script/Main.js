const Slides = require('./slides/Slides');
const Utils = require('./utils/Utils');
cc.Class({
    extends: cc.Component,

    properties: {
        slideNodes: [Slides],
        backgroundClip: {
            url: cc.AudioClip,
            default: null
        },
        gamingClip: {
            url: cc.AudioClip,
            default: null
        },
        dieClip: {
            url: cc.AudioClip,
            default: null
        },
        misslePrefab: cc.Prefab,
        rankingBoard: cc.Node,
        runningMan: cc.Node,
        startBtn: cc.Node,
    },

    onLoad: function () {
        this.playBackgroundMusic();
        this.initParams();
        this.enableCollistionDetection();
    },

    update: function (dt) {
        this.moveSlideNodes(dt);
    },

    getInitSpeed() {
        return 1.5;
    },

    initParams() {
        cc.speedRatio = this.getInitSpeed();
    },

    playBackgroundMusic() {cc.audioEngine.stopAll();
        cc.audioEngine.play(this.backgroundClip, true, 1);
    },

    playGamingMusic() {
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.gamingClip, true, 1);
    },

    moveSlideNodes(dt) {
        this.slideNodes.forEach(slide => {
            slide.moveCamera(dt * cc.speedRatio * 1.5);
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
        cc.speedRatio = this.getInitSpeed();
    },

    startGame() {
        cc.gamePlaying = true;
        // this.playerNode.active = true;
        this.startBtn.active = false;
        this.playGamingMusic();
        // this.restartBtn.active = false;
        // this.realPlayer.getComponent('PlayerReal').reborn();
        // this.initSpeedRaiser();
        this.spawnEnemies();
        // this.dismissRankingBoard();
    },

    spawnEnemies() {
        this.spawnTimer = setInterval(() => {
            this.generateBee();
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
        // if(this.spawnTimer) {
        //     clearInterval(this.spawnTimer);
        // }
    },

    generateBee() {
        const missleObstacle = cc.instantiate(this.misslePrefab);
        this.node.addChild(missleObstacle);
    },

    generateBigRock() {
        // const rock = cc.instantiate(this.bigRock);
        // this.node.addChild(rock);
    },

    generateMiddleRock() {
        // const rock = cc.instantiate(this.middleRock);
        // this.node.addChild(rock);
    },
    
    generateSmallRock() {
        // const rock = cc.instantiate(this.smallRock);
        // this.node.addChild(rock);
    },

    enableCollistionDetection() {
        // cc.director.getCollisionManager().enabled = true;
        // this.node.on('collision', (event) => {
        //     this.gameOver();
        // });
    },

    gameOver() {
        // cc.audioEngine.play(this.dieClip, false, 1);
        // this.stopSpawnEnemies();
        // this.resetSpeedRaser();
        // this.showRankingBoard();
        // cc.gamePlaying = false;
        // setTimeout(() => {
        //     this.restartBtn.active = true;
        // }, 200);
    },

    showRankingBoard() {
        // this.shareBtn.active = true;
        // if(this.rankingBoard.active) {
    	// 	return;
    	// }
        // this.rankingBoard.active = true;
        // this.rankingBoard.getComponent('RankingScrollView').requestUsers();
    },

    dismissRankingBoard() {
        // this.shareBtn.active = false;
        // this.rankingBoard.active = false;
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

    handleClickShare() {

    },
});
