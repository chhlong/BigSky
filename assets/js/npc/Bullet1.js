var Bullet = require("Bullet");

cc.Class({
    extends: Bullet,

    properties: {

    },

     start: function() {
        this.player = cc.find("Player")
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
        // var velx = Global.RandomNumBoth(-400, 400);
        // this.rigidbody.linearVelocity = cc.v2(velx, 600);
        // var anim = this.getComponent(cc.Animation);
        // anim.play(anim._clips[0]._name)
    },
});

