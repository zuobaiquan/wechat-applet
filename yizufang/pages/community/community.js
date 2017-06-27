Page({
  data: {
    myattentionList: [{ islook: 0, name: '华盛顿大学社区', noticeNum: 199, attentionNum: 2 }, { islook: 0, name: '社区名2', noticeNum: 199, attentionNum: 5 }, { islook: 0, name: '社区名3', noticeNum: 169, attentionNum: 5 }],
  },

  onLoad () {
    
  },
  selCommunity:function(e){
    var index = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '../selcommunity/selcommunity?type=' + index
    });
  }
  
})
