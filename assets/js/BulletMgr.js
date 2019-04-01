cc.Class({
    extends: cc.Component,

    properties: {
       bullets : {
            default: null,
            type: cc.Node
       }
    },

    onLoad: function () {
    },

    update: function() {
        if(Global.DataBus.gameBegin && cc.director.getTotalFrames() % 30 == 0)
        {
            this.AddBullet();
        }
        
    },

    AddBullet: function() {
        var self = this;
        cc.loader.loadRes("prefabs/" + Global.DataBus.curPlayerName + "_Bullet", function (err, prefab) {
            var newBullet = cc.instantiate(prefab);
            newBullet.parent = self.bullets;
        });
    },

});
