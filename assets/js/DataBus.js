
cc.Class({
    extends: cc.Component,

    properties: {
      frame : 0,
      score : 0,
      gameOver   : false,
      gameBegin : false,

      curPlayerName : "Hero02",

      curMonsterName : "Monster01",
      curBossName : "Monster02",
      
    },

    onLoad: function () {
      Global.DataBus = this;
    },

    AddEnemy: function(prefabName) {
        var self = this;
        cc.loader.loadRes("prefabs/" + prefabName, function (err, prefab) {
            var newEnemy = cc.instantiate(prefab);
            newEnemy.parent = self.enemies;
        });
    },
});


