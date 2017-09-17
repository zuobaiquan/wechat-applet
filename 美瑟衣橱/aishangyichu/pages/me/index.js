Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        getApp().getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })

            console.log('userinfo=', JSON.stringify(userInfo));
        })
    },
    selectBg(){
        // wx.navigateTo({
        //     url: '../about/index',
        // })
    },
    myPublic(){

    },
    myWardrob(){

    },
    myCard(){
      wx.navigateTo({
        url: '',
      })

    },

    gotoabout() {
      wx.navigateTo({
        url: '../about/index',
      })
    },

    selectAvatar(){
    //     wx.navigateTo({
    //     url: '../wardrobeDetail/index',
    // })
    },

})