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
         speed: cc.v2(0,0),
    },

    // onLoad() {
    //      // open Accelerometer
    //     cc.systemEvent.setAccelerometerEnabled(true);
    //     cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    // },

    onLoad: function () {
        this.onRegisteredEvent();
    },

    onDeviceMotionEvent(event) { 
        //log event
        this.speed.x = -event.acc.x;
        this.speed.y = event.acc.y;
    },

    start() {
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

    

    onRegisteredEvent: function () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onPlayAnimation.bind(this));
    },

    update: function(dt){
        if(Global.DataBus.gameBegin){
            var x = this.node.position.x + this.speed.x*50
            // var y = this.node.position.y + this.speed.y*100
            if(x > 1080){
                x = 1080
            }
            else if(x < 0){
                x = 0
            }
            // if(y > 1920){
            //     y = 1920
            // }
            // else if(y < 0){
            //     y = 0
            // }
            this.node.position  = cc.v2(x,this.node.position.y)
        }
    },

    onPlayAnimation: function (event) {
        if(Global.DataBus.gameBegin){
            var pos = event.getLocation()
            var x = pos.x
            var y = pos.y
            if(pos.x > 1080){
                x = 1080
            }
            else if(pos.x < 0){
                x = 0
            }
           
            if(pos.y > 1920){
                y = 1920
            }
            else if(pos.y < 0){
                y = 0
            }
            this.node.position  = cc.v2(x,y)
        }
    },

    changeHero: function(playerName) {
        cc.log("Global.curPlayer = " + Global.curPlayer)
        if(Global.curPlayer != null && Global.curPlayer.node.name != playerName)
        {
            Global.curPlayer.node.destroy()
            Global.curPlayer = null;
            Global.DataBus.curPlayerName = playerName
            this.AddPlayer(playerName)
        }
        
    }

});
