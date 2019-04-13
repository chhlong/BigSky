cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Animation
        },

        MainUI: {
            default: null,
            type: cc.Component,
        },

        StartPanel: {
            default: null,
            type: cc.Node,
        },

        TopBtns: {
            default: null,
            type: cc.Node,
        },

        BottomBtns: {
            default: null,
            type: cc.Node,
        },

        LeftBtns: {
            default: null,
            type: cc.Node,
        },

        RightBtns: {
            default: null,
            type: cc.Node,
        },

        MainTitle: {
            default: null,
            type: cc.Node,
        },

        StartTips: {
            default: null,
            type: cc.Node,
        },

        ScoreLbl: {
            default: null,
            type: cc.Node,
        },
        
    },

    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;     //开启碰撞检测
        manager.enabledDebugDraw = true;   //显示碰撞检测区域
        cc.director.getPhysicsManager().enabled = true;
        this.onRegisteredEvent();
    },

    start: function(){
    },

    onRegisteredEvent: function () {
        this.StartPanel.on(cc.Node.EventType.TOUCH_END, this.StartHideMainUI.bind(this));
    },

    FinishHideMainUI: function (num, string) {
        cc.log(cc.director.getTotalFrames() + ",FinishHideMainUI")
        this.StartPanel.active = false;
        Global.DataBus.gameBegin = true;
        this.MainUI.IsHiding = false;
    },

    StartHideMainUI: function (event) {
        cc.log(cc.director.getTotalFrames() + ",Global.DataBus.gameBegin = "+ Global.DataBus.gameBegin)
    	if(!this.MainUI.IsHiding)
    	{
        	cc.log(cc.director.getTotalFrames() + ",StartHideMainUI!!");
            this.MainUI.IsHiding = true;
            var topTo = cc.moveBy(1, 0, 250).easing(cc.easeBounceInOut());
            var bottomTo = cc.moveBy(1, 0, -350).easing(cc.easeBounceInOut());
            var leftTo = cc.moveBy(1, -250, 0).easing(cc.easeBounceInOut());
            var rightTo = cc.moveBy(1, 250, 0).easing(cc.easeBounceInOut());
            var scaleTo1 = cc.scaleTo(1, 0, 0).easing(cc.easeBounceInOut());;
            var scaleTo2 = cc.scaleTo(1, 0, 0).easing(cc.easeBounceInOut());;
            var scaleTo3 = cc.scaleTo(1, 1, 1).easing(cc.easeBounceInOut());;
            this.TopBtns.runAction(topTo);
            this.BottomBtns.runAction(bottomTo);
            this.LeftBtns.runAction(leftTo);
            this.RightBtns.runAction(rightTo);
            this.MainTitle.runAction(scaleTo1);
            this.StartTips.runAction(scaleTo2);
            this.ScoreLbl.runAction(scaleTo3);
            Global.performWithDelay(this, 1, this.FinishHideMainUI)
    	}
    },

    FinishShowMainUI: function (num, string) {
        cc.log(cc.director.getTotalFrames() + ",FinishShowMainUI")
        this.StartPanel.active = true;
        Global.DataBus.gameBegin = false;
        this.MainUI.IsShowing = false;
    },

    StartShowMainUI: function () {
        cc.log(cc.director.getTotalFrames() + ",Global.DataBus.gameBegin = "+ Global.DataBus.gameBegin)
        if(!this.MainUI.IsShowing)
        {
            cc.log(cc.director.getTotalFrames() + ",StartShowMainUI!!");
            this.MainUI.IsShowing = true;
            var topTo = cc.moveBy(1, 0, -250).easing(cc.easeBounceInOut());
            var bottomTo = cc.moveBy(1, 0, +350).easing(cc.easeBounceInOut());
            var leftTo = cc.moveBy(1, +250, 0).easing(cc.easeBounceInOut());
            var rightTo = cc.moveBy(1, -250, 0).easing(cc.easeBounceInOut());
            var scale1To = cc.scaleTo(1, 2.5, 2.5).easing(cc.easeBounceInOut());;
            var scale2To = cc.scaleTo(1, 2.5, 2.5).easing(cc.easeBounceInOut());;
            var scaleTo3 = cc.scaleTo(1, 0, 0).easing(cc.easeBounceInOut());;
            this.TopBtns.runAction(topTo);
            this.BottomBtns.runAction(bottomTo);
            this.LeftBtns.runAction(leftTo);
            this.RightBtns.runAction(rightTo);
            this.MainTitle.runAction(scale1To);
            this.StartTips.runAction(scale2To);
            this.ScoreLbl.runAction(scaleTo3);
            Global.performWithDelay(this, 1, this.FinishShowMainUI)
        }
    },

});
