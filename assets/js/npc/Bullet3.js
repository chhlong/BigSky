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
        this.timer += dt
        if ( this.timer > 8 ) {
            this.player.active = true
            Global.BulletMgr.enabled = true
            Global.BulletMgr.SetData()
            this.node.destroy()
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
        enemy.doHurt(this.damage, contact)
    },
});

