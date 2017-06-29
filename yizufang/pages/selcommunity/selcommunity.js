//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    currentTab: 1,
    letterlist: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    scrollIntoId: 'A',
    cityList: [
      { "name": "A", "child": [{ cityname: 'A城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'A城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'A城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'A城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'A城市名', 'picture': '../../images/community/community-icon.png' }] },
      { "name": "B", "child": [{ cityname: 'B城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'B城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'B城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'B城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'B城市名', 'picture': '../../images/community/community-icon.png' }] },
      { "name": "C", "child": [{ cityname: 'C城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'C城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'C城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'C城市名', 'picture': '../../images/community/community-icon.png' }] },
      { "name": "D", "child": [{ cityname: 'D城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'D城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'D城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'D城市名', 'picture': '../../images/community/community-icon.png' }] },
      { "name": "E", "child": [{ cityname: 'E城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'E城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'E城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'E城市名', 'picture': '../../images/community/community-icon.png' }] },
      { "name": "F", "child": [{ cityname: 'F城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'F城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'F城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'F城市名', 'picture': '../../images/community/community-icon.png' }] },
      { "name": "G", "child": [{ cityname: 'G城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'G城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'G城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'G城市名', 'picture': '../../images/community/community-icon.png' }] },
      { "name": "H", "child": [{ cityname: 'H城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'H城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'H城市名', 'picture': '../../images/community/community-icon.png' }, { cityname: 'H城市名', 'picture': '../../images/community/community-icon.png' }] },
    ]
  },

  onLoad(options) {
    this.setData({
      currentTab: options.type
    });
  },
  letterSelstart: function (e) {
    var letter = e.target.dataset.id
    this.setData({
      scrollIntoId: letter
    })
    wx.showToast({
      title: letter
    })
  },
  selectedTab: function (e) {
    var index = e.currentTarget.dataset.current;
    var that = this;
    if (this.data.currentTab === index) {
      return false;
    } else {
      that.setData({
        currentTab: index
      })
    }


  },

})

