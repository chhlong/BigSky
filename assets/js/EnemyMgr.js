cc.Class({
    extends: cc.Component,

    properties: {
       enemies : {
            default: null,
            type: cc.Node
       }
    },

    onLoad: function () {
        cc.log("this.enemies = " + this.enemies.name)
    },

    update: function() {
        if(Global.DataBus.gameBegin && cc.director.getTotalFrames() % 240 == 0)
        {
            this.AddEnemy(Global.DataBus.curBossName);
        }
        else if(Global.DataBus.gameBegin && cc.director.getTotalFrames() % 120 == 0)
        {
            this.AddEnemy(Global.DataBus.curMonsterName);
        }
        
    },

    AddEnemy: function(prefabName) {
        var self = this;
        cc.loader.loadRes("prefabs/" + prefabName, function (err, prefab) {
            var newEnemy = cc.instantiate(prefab);
            newEnemy.parent = self.enemies;
        });
    },

    destroyAllChildren: function(){
        
    }

});
