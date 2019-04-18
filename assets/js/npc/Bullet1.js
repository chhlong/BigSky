var Bullet = require("Bullet");

cc.Class({
    extends: Bullet,

    properties: {

    },

     start: function() {
        this.player = cc.find("Player")
        this.node.position = cc.v2(this.player.position.x, this.player.position.y + 60);
    },
});

