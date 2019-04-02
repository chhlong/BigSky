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
            this.AddEnemy(Global.DataBus.curBossName, 60);
        }
        else if(Global.DataBus.gameBegin && cc.director.getTotalFrames() % 30 == 0)
        {
            this.AddEnemy(Global.DataBus.curMonsterName, 30);
        }
        
    },

    AddEnemy: function(prefabName, hp) {
        var self = this;
        cc.loader.loadRes("prefabs/" + prefabName, function (err, prefab) {
            var newEnemy = cc.instantiate(prefab);
            newEnemy.parent = self.enemies;
            newEnemy.getComponent("Enemy").hp = hp;
            newEnemy.getComponent("Enemy").maxHp = hp;
        });
    },

    destroyAllChildren: function(){
        
    }

});
