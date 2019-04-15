cc.Class({
    extends: cc.Component,

    properties: {
       stages : {
            default: [],
            type: cc.Label
       },
      
       count : 0
    },

    onLoad: function () {
        Global.StageView = this
    },

    setStage: function(id) {
        var maxId = Global.stageConfig.length
        if(id == 0){
            this.stages[0].string = 1
            this.stages[1].string = 2
            this.stages[2].string = 3
            this.setLarge(0)
        }
        else if(id == maxId - 1){
            this.stages[0].string = maxId - 3
            this.stages[1].string = maxId - 2
            this.stages[2].string = maxId - 1
            this.setLarge(2)
        }
        else
        {
            this.stages[0].string = id
            this.stages[1].string = id + 1
            this.stages[2].string = id + 2
            this.setLarge(1)
        }
    },

    setLarge: function(idx){
        for(let i = 0; i < 2; i++)
        {
            this.stages[i].node.parent.scale = cc.v2(1,1)
        }
        this.stages[idx].node.parent.scale = cc.v2(1.5,1.5)
    },

});
