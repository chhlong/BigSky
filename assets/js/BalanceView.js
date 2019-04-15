cc.Class({
    extends: cc.Component,

    properties: {
       count : 0
    },

    onLoad: function () {
        Global.BalanceView = this
    },

    Show: function() {
        var moveTo = cc.moveTo(1, 0, -78).easing(cc.easeBounceInOut());
        this.tips.runAction(moveTo)
        Global.performWithDelay(this, 2, this.HideTips)
    }

});
