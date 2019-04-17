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
        enemy.hp = enemy.hp - this.damage
        enemy.doHurtAni()
        var worldManifold = contact.getWorldManifold();
        var points = worldManifold.points;
        var pos = points[0]
        Global.BoomMgr.AddBoom(pos.x, pos.y)
        if (enemy.hp <= 0) 
        {
            Global.ScoreLbl.AddScore()
            
            otherCollider.node.destroy()
        }
        else
        {
            var redColor = (enemy.hp / enemy.maxHp) * 255
            enemy.node.color = new cc.Color(255, redColor, redColor, 255);
            // enemy.rigidbody.linearVelocity = cc.v2(enemy.rigidbody.linearVelocity.x, -100);
        }
        if(CC_WECHATGAME){
            wx.vibrateShort()
        }
        this.node.destroy()
    },

});

