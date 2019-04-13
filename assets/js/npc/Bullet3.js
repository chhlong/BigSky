var Bullet = require("Bullet");

cc.Class({
    extends: Bullet,
    properties: {
        timer: 0,
    },

     start: function() {
        this.player = cc.find("Player")
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
        var velx = Global.RandomNumBoth(-2000, 2000);
        this.rigidbody.linearVelocity = cc.v2(velx, 2000);
        var anim = this.getComponent(cc.Animation);
        anim.play(anim._clips[0]._name)
        this.timer = 0
        this.player.active = false
        Global.BulletMgr.enabled = false
    },

    update: function(dt) {
        cc.log("this.node.position = " + this.node.position.x + ", y = " + this.node.position.y)
        this.timer += dt
        if ( this.timer > 8 ) {
            cc.log("this.timer = "+this.timer)
            this.player.active = true
            Global.BulletMgr.enabled = true
            Global.BulletMgr.SetData()
            this.node.destroy()
            cc.log("22this.timer = ")
        }
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        var enemy = otherCollider.getComponent("Enemy")
        if(CC_WECHATGAME){
                wx.vibrateShort()
        }
        if(enemy == null) {
            return
        }
        enemy.hp = enemy.hp - this.damage
        if (enemy.hp <= 0) 
        {
            Global.ScoreLbl.AddScore()
            var pos = otherCollider.node.position
            cc.log("pos.x = "+ pos.x + ",pos.y = " + pos.y)
            Global.BoomMgr.AddBoom(pos.x, pos.y)
            otherCollider.node.destroy()
        }
        else
        {
            var redColor = (enemy.hp / enemy.maxHp) * 255
            enemy.node.color = new cc.Color(255, redColor, redColor);
            enemy.rigidbody.linearVelocity = cc.v2(enemy.rigidbody.linearVelocity.x, -100);
        }
    },
});

