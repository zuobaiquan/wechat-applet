Page({
  data: {
    title: 'About Me',
    userInfo: {
      wechat: 'WEDN-NET',
      avatarUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3601007643,3343988003&fm=80&w=179&h=119&img.GIF'
    }
  },

  getUserInfo () {
    const that = this
    wx.getUserInfo({
      success (res) {
        console.log(res);
        that.setData({ userInfo: res.userInfo })
      }
    })
  },

  onLoad () {
    wx.login({
      success (res) {
        if (res.code) {
          console.log('登录成功！' + res.code)
        } else {
          console.error('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail () {},
      complete () {},
    })
  }
})
