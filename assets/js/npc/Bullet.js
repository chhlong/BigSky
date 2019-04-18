var Player = require("Bullet");


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

    setData: function(skillConfig) {
        this.damage = skillConfig.damage
    },

    setAngle: function(skillConfig, angle){
        var orignalSpeed = skillConfig.speed
        this.rigidbody.linearVelocity = cc.v2(orignalSpeed* Math.cos(angle / 180.0 *Math.PI), orignalSpeed* Math.sin(angle / 180.0 *Math.PI));
    },

    onLoad: function() {
       
    },

    start: function(){
        this.player = cc.find("Player")
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
        var anim = this.getComponent(cc.Animation);
        anim.play(anim._clips[0]._name)
    },

    update: function(dt) {
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

