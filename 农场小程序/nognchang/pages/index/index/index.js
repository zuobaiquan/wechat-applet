Page({
  data: {
    text: '这是一条会滚动的文字滚来滚去的文字跑马灯，哈哈哈哈哈哈哈哈',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,
    marqueecopy_status: false,
    marquee_margin: 60,
  },
  onShow: function () {
    // 页面显示
    var vm = this;
    var length = vm.data.text.length * 14;//文字长度,14是文字大小 14px
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    vm.setData({
      length: length,
      windowWidth: windowWidth,
      marquee_margin: length < windowWidth ? windowWidth - length : vm.data.marquee_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    vm.run();// 第一个字消失后立即从右边出现
  },
  run: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        // 如果文字滚动到出现marquee_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
          marqueecopy_status: vm.data.length + vm.data.marqueeDistance <= vm.data.windowWidth + vm.data.marquee_margin,
        });
      } else {
        if (-vm.data.marqueeDistance >= vm.data.marquee_margin) { // 当第二条文字滚动到最左边时
          vm.setData({
            marqueeDistance: vm.data.marquee_margin // 直接重新滚动
          });
          clearInterval(interval);
          vm.run();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance: -vm.data.windowWidth
          });
          vm.run();
        }
      }
    }, 20);
  },
  problemDetail(e){
    wx.navigateTo({
      url: `../problem/index`
    });
  },
})
