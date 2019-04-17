cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad: function () {
    },

    playBoom: function(posx, posy) {
    	this.node.position = cc.v2(posx, posy);
        var anim = this.getComponent(cc.Animation);
        anim.play(anim._clips[0]._name)
    },

    DestroySelf: function() {
        cc.log("destroySelf")
        this.node.destroy()
    }
});

