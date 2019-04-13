var Player = require("Player")

cc.Class({
    extends: cc.Component,

    properties: {
        enemies: {
            default: null,
            type: cc.Node,
        },

        bullets: {
            default: null,
            type: cc.Node,
        },

        playerNode: {
            default: null,
            type: cc.Node,
        },

        GameStart: {
            default: null,
            type: cc.Component,
        },

        ScoreLbl: {
            default: null,
            type: cc.Component,
        },

        finishScoreLbl: {
            default: null,
            type: cc.Label,
        }
    },

    onLoad: function () {
       this.node.active = false;
       this.node.on(cc.Node.EventType.TOUCH_END, this.onClickEvent.bind(this));
    },

    onClickEvent: function() {
    	cc.log("onClickEvent")
    	this.node.active = false
		this.playerNode.setPosition(540, 630)
    	this.GameStart.StartShowMainUI()
        this.ScoreLbl.getComponent("Score").ResetScore()
        Global.curPlayer.skillId += 1
        if(Global.curPlayer.skillId > 3){
            Global.curPlayer.skillId = 1
        }
        cc.log("Global.curPlayer.skillId = " + Global.curPlayer.skillId )
        Global.BulletMgr.SetData()
    },

    finishGame: function(){
    	cc.log("finishGame")
		this.node.active = true;
        this.finishScoreLbl.string = "Score : " + this.ScoreLbl.getComponent("Score").count
        Global.DataBus.gameOver = true
		Global.DataBus.gameBegin = false
        Global.destroyAllChildren(this.enemies)
        Global.destroyAllChildren(this.bullets)
    },

});
