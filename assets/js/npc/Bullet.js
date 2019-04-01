
cc.Class({
    extends: cc.Component,

    properties: {
       rigidbody: {
            default: null,
            type: cc.RigidBody,
        },

        player: {
            default: null,
            type: cc.Node,
        },


    },

    onLoad: function () {
    },

    start: function() {
        this.player = cc.find("Player")
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
        this.rigidbody.linearVelocity = cc.v2(0, 200);

        var anim = this.getComponent(cc.Animation);
        cc.log("anim._clips[0]._name = " + anim._clips[0]._name)
        anim.play(anim._clips[0]._name)
    },

    update: function() {
    	if ( this.node.position.y > 1960 ) {
            this.node.destroy()
    	}
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        Global.ScoreLbl.AddScore()
        this.node.destroy()
        otherCollider.node.destroy()
    },

});

