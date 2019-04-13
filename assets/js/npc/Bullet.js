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

    onLoad: function () {
    },

    start: function() {
        this.player = cc.find("Player")
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
        this.rigidbody.linearVelocity = cc.v2(0, 600);

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
        if (enemy.hp <= 0) 
        {
            Global.ScoreLbl.AddScore()
            var pos = otherCollider.node.position
            // cc.log("pos.x = "+ pos.x + ",pos.y = " + pos.y)
            Global.BoomMgr.AddBoom(pos.x, pos.y)
            otherCollider.node.destroy()

        }
        else
        {
            var redColor = (enemy.hp / enemy.maxHp) * 255
            enemy.node.color = new cc.Color(255, redColor, redColor);
            enemy.rigidbody.linearVelocity = cc.v2(enemy.rigidbody.linearVelocity.x, -100);
        }
        if(CC_WECHATGAME){
                wx.vibrateShort()
        }
        this.node.destroy()

    },

});

