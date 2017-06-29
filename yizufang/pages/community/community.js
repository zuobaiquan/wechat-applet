Page({
  data: {
    issearch:false,
    attentionlen:0,
    interestlen:0,
    searchList: [
      { 'picture': '../../images/community/community-icon.png', name: '城市名', noticeNum: 23, }, { 'picture': '../../images/community/community-icon.png', name: 'A城市名', noticeNum: 23, }],
    // myattentionList: [{ islook: 0, name: '华盛顿大学社区', noticeNum: 199, attentionNum: 2 }, { islook: 0, name: '社区名', noticeNum: 199, attentionNum: 5 }, { islook: 0, name: '社区名3', noticeNum: 169, attentionNum: 5 }],
    myattentionList:[],
    myinterestList: [{ islook: 0, name: '华盛顿社区', noticeNum: 189, attentionNum: 9 }, { islook: 0, name: '社区名阿阿', noticeNum: 199, attentionNum: 5 }, { islook: 0, name: '社区名3', noticeNum: 129, attentionNum: 1 }],
  },

  onLoad () {
    var attentionlen = this.data.myattentionList.length;
    var interestlen = this.data.myinterestList.length;
    var that = this;
    that.setData({
      attentionlen: attentionlen,
      interestlen: interestlen,
    });
  },
  selCommunity:function(e){
    var index = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '../selcommunity/selcommunity?type=' + index
    });
  },
  searchChange(e) {
    if (e.detail.value!=""){
      this.setData({
        issearch: true
      });
    }
    if (e.detail.value == "") {
      this.setData({
        issearch: false
      });
    }
  },
  listDetail(e){
    wx.navigateTo({
      url: '../communitydetail/communitydetail'
    });
  }
  
})
