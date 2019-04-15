cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad: function () {
        Global.BoomMgr = this
    },

    AddBoom: function(posx, posy) {
        var self = this;
        cc.loader.loadRes("prefabs/" + Global.DataBus.curPlayerName + "_Boom", function (err, prefab) {
            var newEntry = cc.instantiate(prefab);
            newEntry.parent = self.node;
            newEntry.position = cc.v2(posx, posy);
        });
    },

});
