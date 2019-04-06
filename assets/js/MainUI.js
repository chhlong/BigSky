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

    },

    // setUserInfo: function(nickName, avatarUrl){
    //   this.UserNameLbl.string = nickName
    //   var self = this
    //   cc.loader.load({url: avatarUrl, type: 'png'}, function (err, tex) {
    //     var userpic = new cc.SpriteFrame(); 
    //     userpic.setTexture(tex)
    //     self.UserPic.spriteFrame = userpic
    //   });
    // },

    // getUserInfo: function(){
    //   var self = this
    //   wx.getUserInfo({
    //     success(res) {
    //       const userInfo = res.userInfo
    //       const nickName = userInfo.nickName
    //       const avatarUrl = userInfo.avatarUrl
    //       const gender = userInfo.gender // 性别 0：未知、1：男、2：女
    //       const province = userInfo.province
    //       const city = userInfo.city
    //       const country = userInfo.country
    //       self.setUserInfo(nickName, avatarUrl)
    //     }
    //   })
    // },

    onLoad: function () {
      // console.log("CC_WECHATGAME==========" + CC_WECHATGAME)
      // var self = this
      // if(CC_WECHATGAME){
      //   wx.getSetting({
      //     success(res) {
      //       console.log(res)
      //       if (!res.authSetting['scope.userInfo']) {
      //         wx.authorize({
      //           scope: 'scope.userInfo',
      //           success() {
      //             self.getUserInfo()
      //           }
               
      //         })
      //       }
      //       else{
      //         self.getUserInfo()
      //       }
      //     }
      //   })

        // const button = wx.createUserInfoButton({
        //   type: 'text',
        //   text: '获取用户信息',
        //   style: {
        //     left: 10,
        //     top: 76,
        //     width: 200,
        //     height: 40,
        //     lineHeight: 40,
        //     backgroundColor: '#ff0000',
        //     color: '#ffffff',
        //     textAlign: 'center',
        //     fontSize: 16,
        //     borderRadius: 4
        //   }
        // })
        // button.onTap((res) => {
        //   console.log(res)
        //   console.log(res.userInfo)
        //   console.log(res.userInfo.nickName)
        //   this.setUserInfo(res.userInfo.nickName, res.userInfo.avatarUrl)
        // })
        // wx.getUserInfo({
        //   success(res) {
        //     const userInfo = res.userInfo
        //     const nickName = userInfo.nickName
        //     const avatarUrl = userInfo.avatarUrl
        //     const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        //     const province = userInfo.province
        //     const city = userInfo.city
        //     const country = userInfo.country
        //     self.UserNameLbl.string = nickName
        //     console.log("nickName==========" + nickName)
        //     console.log("avatarUrl==========" + avatarUrl)

        //     // 远程 url 不带图片后缀名，此时必须指定远程图片文件的类型
        //     cc.loader.load(avatarUrl, function (err, texture) {
        //       self.UserPic.spriteFrame.setTexture(texture);
        //         // Use texture to create sprite frame
        //     });
        //   }
        // })
      // }
      this.onRegisteredEvent();
    },

    onRegisteredEvent: function () {
        this.hero01Btn.on(cc.Node.EventType.TOUCH_END, this.onHero01Click.bind(this));
        this.hero02Btn.on(cc.Node.EventType.TOUCH_END, this.onHero02Click.bind(this));
        this.ShareBtn.on(cc.Node.EventType.TOUCH_END, this.onShareBtnClick.bind(this));
    },

    onHero01Click: function (event) {
    	var pc = this.playerCtrl.getComponent("PlayerCtrl")
    	cc.log("pc = " + pc)
    	pc.changeHero("Hero01")
    },

    onHero02Click: function (event) {
    	this.playerCtrl.getComponent("PlayerCtrl").changeHero("Hero02")
    },

    onShareBtnClick: function (event) {
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

});
