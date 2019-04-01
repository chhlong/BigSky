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
    	var velx = Global.RandomNumBoth(-100, 100);
    	this.node.position = cc.v2(posx, 1920);
        this.rigidbody.gravityScale = 0.1
        this.rigidbody.fixedRotation = false
    	this.rigidbody.linearVelocity = cc.v2(velx, 0);

        var anim = this.getComponent(cc.Animation);
        anim.play(anim._clips[0]._name)
    },

    update: function() {
    	if ( this.node.position.y < -40 ) {
      		this.node.position = cc.v2(this.node.position.x, 1920);
      		this.rigidbody.linearVelocity = cc.v2(this.rigidbody.linearVelocity.x, 0);
    	}
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
    	cc.log('enemy onBeginContact ' + otherCollider.node.name);
    	if(otherCollider.node.name == "Hero01" || otherCollider.node.name == "Hero02")
    	{
            var gameOver = cc.find("GameOver").getComponent("GameOver")
            gameOver.finishGame()
    	}
    },
    
});

