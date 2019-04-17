cc.Class({
    extends: cc.Component,

    properties: {
        rigidbody: {
            default: null,
            type: cc.RigidBody,
        },
        collider: {
            default: null,
            type: cc.PhysicsBoxCollider,
        },
        anim: {
            default: null,
            type: cc.Animation,
        },
        hp : 50,
        maxHp : 50,
        maxSpeed:0,
    },

    onLoad: function () {
        this.rigidbody = this.getComponent(cc.RigidBody)
        this.collider = this.getComponent(cc.PhysicsBoxCollider)
    },

    doHurtAni: function(){
        var animState = this.anim.play(this.anim._clips[1]._name)
        animState.repeatCount = 2
    },

    setEntry: function(id){
        var posx = Global.RandomNumBoth(50, 1000);
        var angle = -Math.PI *Math.random();
        var monster = window.Global.monsterConfig[id]
        var orignalSpeed = monster.orignalSpeed
        this.maxSpeed = monster.maxSpeed
        this.hp = monster.hp
        this.node.position = cc.v2(posx, 1920);
        this.rigidbody.gravityScale = monster.gravityScale
        this.rigidbody.linearVelocity = cc.v2(orignalSpeed* Math.cos(angle), orignalSpeed* Math.sin(angle));
        this.rigidbody.fixedRotation = true
        this.collider.resititution = 0
    },

    start: function() {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play(this.anim._clips[0]._name)
    },

    update: function() {
        var pos = this.node.position
        var x = pos.x
        var y = pos.y
        if(pos.x > 1080 + 40){
            x = 1080
        }
        else if(pos.x < -40){
            x = 0
        }
        this.node.position  = cc.v2(x,y)
    	if ( this.node.position.y < -40 ) {
      		this.node.position = cc.v2(this.node.position.x, 1920);
            var vely = Global.RandomNumBoth(-200, -400);
      		this.rigidbody.linearVelocity = cc.v2(this.rigidbody.linearVelocity.x, vely);
    	}
        this.calSpeed()
    },
    
    calSpeed: function() {
        var maxSpeed = this.maxSpeed
        var x = this.rigidbody.linearVelocity.x
        var y = this.rigidbody.linearVelocity.y
        var speed = Math.sqrt(x*x + y*y) 
        if(speed > maxSpeed)
        {
            var radio = speed / maxSpeed
            x = x / radio
            y = y / radio
            this.rigidbody.linearVelocity = cc.v2(x,y);
        }
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
    	if(otherCollider.node.name == "Hero01" || otherCollider.node.name == "Hero02")
    	{
            if(CC_WECHATGAME){
                wx.vibrateShort()
            }
            Global.GameOver.finishGame(false)
    	}
    },
    
});

