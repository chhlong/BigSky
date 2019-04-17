cc.Class({
    extends: cc.Component,

    properties: {
       _stageInfo: null,
       _flushTimers: [],
       _flushCount: [],
       _phaseIdx:0,
       _phase:null,
       _stageId:0
    },

    onLoad: function () {
        Global.EnemyMgr = this
    },

    setStage: function(id,pid){
        if(id >= Global.stageConfig.length) { return }
        this._stageId = id
        this._stageInfo = Global.stageConfig[id]
        this._phase = Global.stageConfig[id].phase
        this._phaseIdx = pid
        var length = this._phase.length
        this._flushTimers = new Array(length).fill(0)
        this._flushCount = new Array(length).fill(0)
        cc.log("this._phase[pid] = " + this._phase[pid].killNums)
        Global.StageView.setStage(id)
    },

    update: function(dt) {
        if(!Global.DataBus.gameBegin) {return}
        for ( let i = 0, il = this._flushTimers.length; i < il; i++ ) {
            var pid = this._phaseIdx
            var monsters = this._phase[pid].monsters
            if(this._flushCount[i] < monsters[i][1])
            {
                this._flushTimers[i] += dt;
                if (this._flushTimers[i] >= monsters[i][2])
                {
                    this.AddEnemy(monsters[i][0])
                    this._flushTimers[i] = 0
                    this._flushCount[i] += 1
                }
            }
        }
    },

    AddEnemy: function(id) {
        var self = this;
        var monster = window.Global.monsterConfig[id]
        cc.loader.loadRes("prefabs/" + monster.name, function (err, prefab) {
            var entry = cc.instantiate(prefab);
            entry.parent = self.node;
            var enemy = entry.getComponent("Enemy")
            enemy.setEntry(id)
        });
    },

});
