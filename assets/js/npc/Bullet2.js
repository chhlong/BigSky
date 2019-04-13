var Bullet = require("Bullet");
var Enemy = require("Enemy");

cc.Class({
    extends: Bullet,
    properties: {
        timer: 0,
        damageTimer:0,
        enemyDic: [], 
    },

     start: function() {
        this.player = cc.find("Player")
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
        var anim = this.getComponent(cc.Animation);
        anim.play(anim._clips[0]._name)
        this.timer = 0
        this.damageTimer = 0
        Global.BulletMgr.enabled = false
    },

    update: function(dt) {
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
        this.timer += dt
        this.damageTimer += dt
        if ( this.timer > 8 ) {
            cc.log("this.timer = "+this.timer)
            Global.BulletMgr.enabled = true
            Global.BulletMgr.SetData()
            this.node.destroy()
            cc.log("22this.timer = ")
        }
        if(this.damageTimer > 0.2){
            for(var key in this.enemyDic){
                this.damageEnemy(this.enemyDic[key])
                //此处可以使用索引和值做一些事情
            }
            this.damageTimer = 0            
        }
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(CC_WECHATGAME){
                wx.vibrateShort()
        }
        var enemy = otherCollider.getComponent("Enemy")
        if(enemy == null) {
            return
        }
        this.enemyDic[enemy.node.uuid] = enemy
       
    },
    onEndContact: function (contact, selfCollider, otherCollider) {
        var enemy = otherCollider.getComponent("Enemy")
        if(enemy == null) {
            return
        }
        delete this.enemyDic[enemy.node.uuid]
    },

    damageEnemy: function(enemy){
        enemy.hp = enemy.hp - this.damage
        if (enemy.hp <= 0) 
        {
            Global.ScoreLbl.AddScore()
            var pos = enemy.node.position
            Global.BoomMgr.AddBoom(pos.x, pos.y)
            delete this.enemyDic[enemy.node.uuid]
            enemy.node.destroy()
        }
        else
        {
            var redColor = (enemy.hp / enemy.maxHp) * 255
            enemy.node.color = new cc.Color(255, redColor, redColor);
            enemy.rigidbody.linearVelocity = cc.v2(enemy.rigidbody.linearVelocity.x, -100);
        }
    }
    
});

