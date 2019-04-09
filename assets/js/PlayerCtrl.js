// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        this.AddPlayer(Global.DataBus.curPlayerName)
    },

    AddPlayer: function(prefabName) {
        var self = this;
        cc.log("prefabName = " + prefabName)
        cc.loader.loadRes("prefabs/" + prefabName, function (err, prefab) {
            var newEntry = cc.instantiate(prefab);
            newEntry.parent = self.node;
            newEntry.position = cc.v2(0,0)
            Global.curPlayer = newEntry.getComponent("Player")
            cc.log("Global.curPlayer  = ", Global.curPlayer.bulletId)
        });
    },

    onLoad: function () {
        this.onRegisteredEvent();
    },

    onRegisteredEvent: function () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onPlayAnimation.bind(this));
    },

    onPlayAnimation: function (event) {
        if(Global.DataBus.gameBegin){
            this.node.position  = event.getLocation()
        }
    },

    changeHero: function(playerName) {
        cc.log("playerName = " + playerName)
        cc.log("Global.curPlayer = " + Global.curPlayer)
        if(Global.curPlayer != null && Global.curPlayer.node.name != playerName)
        {
            cc.log("11Global.curPlayer = " + Global.curPlayer.node.name)
            Global.curPlayer.node.destroy()
            Global.curPlayer = null;
            Global.DataBus.curPlayerName = playerName
            this.AddPlayer(playerName)
        }
        
    }

});
