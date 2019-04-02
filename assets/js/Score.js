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

    ResetScore: function() {
        this.count = 0
        this.score.string  = "Score : " + this.count
        cc.log("ResetScore: " + this.count)
    },

});
