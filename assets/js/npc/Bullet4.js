
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

        damage : 10,

    },

    onLoad: function () {
    },

    start: function() {
        this.player = cc.find("Player")
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
        this.rigidbody.linearVelocity = cc.v2(0, 600);

        var anim = this.getComponent(cc.Animation);
        anim.play(anim._clips[0]._name)
    },

    update: function() {
    	if ( this.node.position.y > 1960 ) {
            this.node.destroy()
    	}
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        var enemy = otherCollider.getComponent("Enemy")
        enemy.doHurt(this.damage, contact)
        
       
        this.node.destroy()

    },

});

