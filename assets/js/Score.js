cc.Class({
    extends: cc.Component,

    properties: {
       score : {
            default: null,
            type: cc.Label
       },
       tips : {
            default: null,
            type: cc.Node
       },
       count : 0
    },

    onLoad: function () {
        Global.ScoreLbl = this
    },

    AddScore: function() {
        var phase = Global.EnemyMgr._phase
        var pid = Global.EnemyMgr._phaseIdx
        var sid = Global.EnemyMgr._stageId
        var lastCount = this.count
        var count = this.count + 1
        this.count = this.count + 1
        this.score.string  = "Score : " + this.count
        cc.log("AddScore: " + this.count)
        if(pid == 0 && lastCount < phase[0].killNums && count >= phase[0].killNums )
        {
            cc.log("一大波怪物来袭, count = " + count)
            this.ShowTips()
            Global.EnemyMgr.setStage(sid, 1)

        }
        else if(pid == 1 && count >= phase[0].killNums + phase[1].killNums) 
        {
            cc.log("关卡结算, count = " + count)
            Global.EnemyMgr.setStage(sid + 1, 1)
            Global.GameOver.finishGame(true)
        }
    },

    ResetScore: function() {
        this.count = 0
        this.score.string  = "Score : " + this.count
        cc.log("ResetScore: " + this.count)
    },

    HideTips: function() {
        var moveTo = cc.moveTo(1, 0, 272).easing(cc.easeBounceInOut());
        this.tips.runAction(moveTo)
    },

    ShowTips: function() {
        var moveTo = cc.moveTo(1, 0, -78).easing(cc.easeBounceInOut());
        this.tips.runAction(moveTo)
        Global.performWithDelay(this, 2, this.HideTips)
    }

});
