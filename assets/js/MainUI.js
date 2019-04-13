cc.Class({
    extends: cc.Component,

    properties: {
       IsHideAni : false,
       IsShowAni : false,

       hero01Btn :{
       		default : null,
       		type : cc.Node,
       },
       
       hero02Btn :{
       		default : null,
       		type : cc.Node,
       },

       playerCtrl :{
       		default : null,
       		type : cc.Node,
       },

       ShareBtn :{
          default : null,
          type : cc.Node,
       },

       BgBtn :{
          default : null,
          type : cc.Node,
       },

       BgImg :{
          default : null,
          type : cc.Sprite,
       },

    },

    onLoad: function () {
      this.onRegisteredEvent();
    },

    onRegisteredEvent: function () {
        this.hero01Btn.on(cc.Node.EventType.TOUCH_END, this.onHero01Click.bind(this));
        this.hero02Btn.on(cc.Node.EventType.TOUCH_END, this.onHero02Click.bind(this));
        this.ShareBtn.on(cc.Node.EventType.TOUCH_END, this.onShareBtnClick.bind(this));
        this.BgBtn.on(cc.Node.EventType.TOUCH_END, this.onBgBtnClick.bind(this));
    },

    onHero01Click: function (event) {
    	var pc = this.playerCtrl.getComponent("PlayerCtrl").changeHero("Hero01")
    },

    onHero02Click: function (event) {
    	this.playerCtrl.getComponent("PlayerCtrl").changeHero("Hero02")
      
    },

    onShareBtnClick: function (event) {
      if(!CC_WECHATGAME){
        return
      }
      cc.loader.loadRes("texture/share",function(err,data){
          wx.shareAppMessage({
              title: "分享测试，陈语是个大帅比！",
              imageUrl: data.url,
              success(res){
                  console.log(res)
              },
              fail(res){
                  console.log(res)
              } 
          })
      }); 

    },

    onBgBtnClick: function (event) {
      if(!CC_WECHATGAME){
        return
      }
      var self = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log("tempFilePaths = ", tempFilePaths[0])
          self.setBgImg(tempFilePaths[0])
        }
      })
    },

    setBgImg: function(tempFilePath){
        var self = this
        cc.loader.load({url: tempFilePath, type: 'jpg'}, function (err, tex) {
            console.log("tex = ", tex)
            var pic = new cc.SpriteFrame(); 
            pic.setTexture(tex)
            self.BgImg.spriteFrame = pic
        });
    },
});
