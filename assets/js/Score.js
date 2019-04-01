cc.Class({
    extends: cc.Component,

    properties: {
       score : {
            default: null,
            type: cc.Label
       },
       count : 0
    },

    onLoad: function () {
        Global.ScoreLbl = this
    },

    AddScore: function() {
        this.count = this.count + 1
        this.score.string  = "Score : " + this.count
        cc.log("AddScore: " + this.count)
    },

});
