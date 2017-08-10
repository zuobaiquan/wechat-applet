const apiRequest = require('../../../utils/apiRequest.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    showmore:false,
    noticeBottom:80,
    attendText:"+ 关注",
    isAttend:false,
    communityName:'',
    communityDetail:[]
  },
  onLoad(options) {
    var that=this;
    const communityId = options.communityId;
    var params={
      communityId: options.communityId,
      page:1,size:5
    }
    wx.getStorage({
      key: 'yzw-token',
      success: function (res) {
        apiRequest.postByToken('api/community/checkHasFollowed', { communityId: options.communityId }, res.data)
          .then(function (res) {
            if(res.data==1){
              that.setData({
                attendText: "取消关注",
                isAttend: true
              });
            }
          })
        apiRequest.postByToken('api/community/getCommunityDetail', params, res.data)
          .then(function (res) {
            //1：房源，2：求租，3：找室友，4：文字消息。5：图片消息
            that.setData({
              communityName: options.communityName,
              communityDetail: res.data.data.list
            });
          })
        
          //POST /api/community/checkHasFollowed
      },
      fail: function () {
        apiRequest.post('pub/community/getCommunityDetail', params)
          .then(function (res) {
            that.setData({
              communityName: options.communityName,
              communityDetail: res.data.data.list
            });
          })
      }
    })
    
  },
  sendMore(){
    this.setData({
      showmore:true,
      noticeBottom: 330,
    });
  },
  hideMore(){
    this.setData({
      showmore: false,
      noticeBottom: 80,
    });
  },
  changeAttend(e){
    if (e.target.dataset.state){
      this.setData({
        attendText: "+ 关注",
        isAttend: false,
      });
    }
    else{
      this.setData({
        attendText: "取消关注",
        isAttend: true,
      });
    }
  },
  detailHouse(e) {
    var houseId = e.currentTarget.dataset.houseid;
    wx.navigateTo({
      url: `../../Mycenter/housedetail/housedetail?houseId=${houseId}`
    })
  },
  detailRent(e) {
    var rentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../rentdetail/rentdetail?rentId=${rentId}`
    })
  },
  detailRoom(e) {
    var roomId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../rentdetail/rentdetail?roomId=${roomId}`
    })
  },
  sendInfo(e){
    var index = e.currentTarget.dataset.currenttype,url='';
    index = parseInt(index);
    switch (index){
      case 1:url='../houstlist/houstlist';break;
      case 2: url = '../roomlist/roomlist?type=2'; break;
      case 3: url = '../roomlist/roomlist?type=3'; break;
      default:console.log('错误');
    }
    wx.showModal({
      title: '确定',
      confirmText: '发送',
      confirmColor: "#f47a20",
      cancelColor: '#4b474c',
      content: "发送到以下社区： 华盛顿大学",
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: url
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  sendImginfo(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
  }

})





