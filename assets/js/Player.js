cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    start: function() {
        var anim = this.getComponent(cc.Animation);
        anim.play(this.node.name + "_Ani")
        cc.log(this.node.name + "_Ani")
    },

    update: function() {
        this.node.position = cc.v2(0,0)
    }

});
