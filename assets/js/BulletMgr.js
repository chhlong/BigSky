cc.Class({
    extends: cc.Component,

    properties: {
       bullets : {
            default: null,
            type: cc.Node
       },
       
       cdImg : {
        default: null,
        type: cc.Sprite
       },

       _timer: 0,
       _skillTimer: 0,
       _interval: 0,
       _skillInterval: 0,
       _skillcdTime: 0,
       _skillcdTimer: 0,
       _skilldurTimer: 0,
       _skilldurTime: 0,
       _bid:0,
       _sid:0,
    },

    onLoad: function () {
        Global.BulletMgr = this
        // cc.director.getScheduler().setTimeScale(0.1)

    },

    SetData: function () {
        this._timer = 0
        this._skillTimer = 0
        var bid = Global.curPlayer.bulletId
        var sid = Global.curPlayer.skillId
        this._bid = bid
        this._sid = sid
        this._interval = window.Global.skillConfig[bid].intervalTime
        this._skillInterval = window.Global.skillConfig[sid].intervalTime
        this._skillcdTimer = window.Global.skillConfig[sid].cdTime
        this._skillcdTime = window.Global.skillConfig[sid].cdTime
        this._skilldurTimer = 0
        this._skilldurTime = window.Global.skillConfig[bid].durTime
        this.enabled = true
        cc.log("this._skillcdTime = " + this._skillcdTime)
        cc.log("this._skilldurTime = " + this._skilldurTime)
    },

    update: function(dt) {
        if(!Global.DataBus.gameBegin || Global.curPlayer == null) {
            return
        }
        
        this._skillcdTimer -= dt
        if(this._skillcdTimer < 0)
        {
            this._skillcdTimer = 0
        }
        if(this._skillcdTimer == 0 && this._skilldurTimer == 0)
        {
            this._skilldurTimer = this._skilldurTime
        }
        this.cdImg.fillRange = this._skillcdTimer / this._skillcdTime;

        this._skilldurTimer -= dt;
        if(this._skilldurTimer < 0)
        {
            this._skilldurTimer = 0
        }
        if(this._skilldurTimer > 0) //持续时长
        {
            this._skillTimer += dt;
            if ( this._skillTimer >= this._skillInterval )
            {
                this.AddSkill(this._sid)
                this._skillTimer = 0
            }
        }
        else
        {
            this._timer += dt;
            if ( this._timer >= this._interval )
            {
                this.AddSkill(this._bid)
                this._timer = 0
            }
        }
        if(this._skilldurTimer == 0 && this._skillcdTimer  == 0)
        {
            this._skillcdTimer = this._skillcdTime
        }
        
    },

    AddBullet: function(prefabName) {
        var self = this;
        // cc.log(cc.director.getTotalFrames() + ",prefabName = " + prefabName)
        cc.loader.loadRes("prefabs/" + prefabName, function (err, prefab) {
            var newBullet = cc.instantiate(prefab);
            newBullet.parent = self.bullets;
        });
    },

    AddSkill: function(skillId) {
        var prefabName = window.Global.skillConfig[skillId].name
        this.AddBullet(prefabName)
    },

});
