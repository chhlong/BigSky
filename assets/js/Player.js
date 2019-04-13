cc.Class({
    extends: cc.Component,

    properties: {
       bulletId: 0,
       skillId: 1
    },

    setId: function(bid, sid){
        this.bulletId = bid
        this.skillId = sid
    },

    start: function() {
        var anim = this.getComponent(cc.Animation);
        anim.play(this.node.name + "_Ani")
        this.bulletId = 0
        this.skillId = 2
        Global.BulletMgr.SetData()
    },

    update: function() {
        this.node.position = cc.v2(0,0)
    }

});
