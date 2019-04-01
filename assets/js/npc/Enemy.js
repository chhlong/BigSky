cc.Class({
    extends: cc.Component,

    properties: {
       rigidbody: {
            default: null,
            type: cc.RigidBody,
        },
    },

    onLoad: function () {
        this.rigidbody = this.getComponent(cc.RigidBody)
    },

    start: function() {
    	var posx = Global.RandomNumBoth(50, 1000);
        var velx = Global.RandomNumBoth(-400, 400);
        var vely = Global.RandomNumBoth(-200, -400);
    	this.node.position = cc.v2(posx, 1920);
        this.rigidbody.gravityScale = 0.1
        this.rigidbody.fixedRotation = false
    	this.rigidbody.linearVelocity = cc.v2(velx, vely);

        var anim = this.getComponent(cc.Animation);
        anim.play(anim._clips[0]._name)
    },

    update: function() {
    	if ( this.node.position.y < -40 ) {
      		this.node.position = cc.v2(this.node.position.x, 1920);
            var vely = Global.RandomNumBoth(-200, -400);
      		this.rigidbody.linearVelocity = cc.v2(this.rigidbody.linearVelocity.x, vely);
    	}
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
    	if(otherCollider.node.name == "Hero01" || otherCollider.node.name == "Hero02")
    	{
            var gameOver = cc.find("GameOver").getComponent("GameOver")
            gameOver.finishGame()
    	}
    },
    
});

