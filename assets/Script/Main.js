const Slides = require('./slides/Slides');
const { uploadLogin } = require('./utils/Utils');
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
        wellPrefab: cc.Prefab,
        rankingBoard: cc.Node,
        runningMan: cc.Node,
        startBtn: cc.Node,
        shareBtn: cc.Node,
        restartBtn: cc.Node,
    },

    onLoad: function () {
        this.initParams();
        this.enableCollistionDetection();
        this.playBackgroundMusic();
        uploadLogin()
            .then(data => {
                console.log(data);
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            });
    },

    update: function (dt) {
        this.moveSlideNodes(dt);
    },

    getInitSpeed() {
        return 1.5;
    },

    initParams() {
        cc.speedRatio = this.getInitSpeed();
        cc.shouldDestroy = false;
        this.runningMan.zIndex = 100;
    },

    playBackgroundMusic() {
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.backgroundClip, true, 1);
    },

    playDieMusic() {
        cc.audioEngine.play(this.dieClip, false, 1);
    },

    playGamingMusic() {
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.gamingClip, true, 1);
    },

    moveSlideNodes(dt) {
        if(cc.gamePlaying) {
            this.slideNodes.forEach(slide => {
                slide.moveCamera(dt * cc.speedRatio * 1.5);
            });
        }
    },

    initSpeedRaiser() {
        this.speedTimer = setInterval(() => {
            if(cc.speedRatio <= 2) {
                cc.speedRatio += 0.08;
            }
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
        cc.shouldDestroy = false;
        this.restartBtn.active = false;
        this.startBtn.active = false;
        this.runningMan.getComponent('Ninja').reborn();
        this.initSpeedRaiser();
        this.spawnEnemies();
        this.playGamingMusic();
        this.dismissRankingBoard();
    },

    gameOver() {
        cc.shouldDestroy = true;
        this.playDieMusic();
        this.stopSpawnEnemies();
        this.resetSpeedRaser();
        this.showRankingBoard();
        this.playBackgroundMusic();
        setTimeout(() => {
            this.restartBtn.active = true;
        }, 200);
    },

    spawnEnemies() {
        this.spawnTimer = setInterval(() => {
            this.randomGenerate();
        }, 1000);
    },

    randomGenerate() {
        const seed = Math.floor(cc.random0To1() * 100) % 2;
        switch(seed) {
            case 0:
                this.generateMissile();
                break;
            case 1:
                this.generateWell();
                break;
        }
    },

    stopSpawnEnemies() {
        if(this.spawnTimer) {
            clearInterval(this.spawnTimer);
        }
    },

    generateMissile() {
        const missleObstacle = cc.instantiate(this.misslePrefab);
        this.node.addChild(missleObstacle);
    },

    generateWell() {
        const wellPrefab = cc.instantiate(this.wellPrefab);
        this.node.addChild(wellPrefab);
    },

    enableCollistionDetection() {
        cc.director.getCollisionManager().enabled = true;
        this.node.on('collision', (event) => {
            this.gameOver();
        });
    },

    showRankingBoard() {
        this.shareBtn.active = true;
        if(this.rankingBoard.active) {
    		return;
    	}
        this.rankingBoard.active = true;
        this.rankingBoard.getComponent('RankingScrollView').requestUsers();
    },

    dismissRankingBoard() {
        this.shareBtn.active = false;
        this.rankingBoard.active = false;
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
