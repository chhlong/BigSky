cc.Class({
    extends: cc.Component,

    properties: {
        
       UserPic :{
          default : null,
          type : cc.Sprite,
       },

       UserNameLbl :{
          default : null,
          type : cc.Label,
       },

       userInfoBtn : null,
    },

    setUserInfo: function(nickName, avatarUrl){
        var self = this
        self.UserNameLbl.string = nickName
        cc.loader.load({url: avatarUrl, type: 'png'}, function (err, tex) {
            var userpic = new cc.SpriteFrame(); 
            userpic.setTexture(tex)
            self.UserPic.spriteFrame = userpic
            if (self.userInfoBtn != null){
                self.userInfoBtn.destroy()
            }
            self.node.destroy()
        });
    },

    getUserInfo: function(){
      var self = this
      wx.getUserInfo({
        success(res) {
          const userInfo = res.userInfo
          const nickName = userInfo.nickName
          const avatarUrl = userInfo.avatarUrl
          const gender = userInfo.gender // 性别 0：未知、1：男、2：女
          const province = userInfo.province
          const city = userInfo.city
          const country = userInfo.country
          self.setUserInfo(nickName, avatarUrl)
        }
      })
    },

    showLoginBtn: function(){
        var self = this
        self.userInfoBtn = wx.createUserInfoButton({
          type: 'text',
          text: '登录',
          style: {
            left: 110,
            top: 420,
            width: 200,
            height: 40,
            lineHeight: 40,
            backgroundColor: '#ff0000',
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 16,
            borderRadius: 4
          }
        })
        self.userInfoBtn.onTap((res) => {
          console.log(res)
          console.log(res.userInfo)
          console.log(res.userInfo.nickName)
          self.setUserInfo(res.userInfo.nickName, res.userInfo.avatarUrl)
        })
    },

    onLoad: function () {
        if(!CC_WECHATGAME){
            this.node.destroy()
            return
        }
        console.log("CC_WECHATGAME==========" + CC_WECHATGAME)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClickEvent.bind(this));
        var self = this
        wx.getSetting({
          success(res) {
            console.log(res)
            if (!res.authSetting['scope.userInfo']) {
                self.showLoginBtn()
            }
            else{
              self.getUserInfo()
            }
          }
        })
    },
    onClickEvent: function() {
        cc.log("onClickEvent")
    },
});
