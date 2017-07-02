
Page({
  data: {
    showmore:false,
    noticeBottom:80,
    attendText:"+ 关注",
    isAttend:false,
    chartlist:[
      { type: 1, avator: 'http://img3.imgtn.bdimg.com/it/u=734972231,2892744574&fm=26&gp=0.jpg', nickname: 'juliy1',tag:'求租', city: '西雅图', price: '1000 USD/月', start:'2017-06-01',end:'2018-06-01',req:'没有要求'},
      { type:2, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', nickname: '大碰2', tag: '房源',  url: '../images/houselist1.png', price: "999 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '4卧 2卫浴' },
      { type: 3, avator: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1853832225,307688784&fm=5', nickname: '夏明3', tag: '找室友', city: '西雅图', sex: '本人女,希望室友性别女', price: '1000 USD/月', start: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫'  },
      { type: 4, avator: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2287816931,1201096380&fm=5', nickname: '夏张4',  text:'Bridge 超阔Town House其中一间 暑期6.5-8.17 空白期招租啦！！如图所示三间都转租 想问哪间直接扫其中一张。洗衣机烘干机厨房冰箱全都有！二楼一整层超大客厅加厨房采光贼好 学习做饭开趴一应俱全！！价钱也棒！！快来扫我找我商量！！' }
    ]
  },
  onLoad() {
    
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
  detailRent(e){
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../rentdetail/rentdetail?type=' + type
    })
  },
  sendHouse(){
    wx.showModal({
      title: '确定',
      confirmText:'发送',
      confirmColor:"#f47a20",
      cancelColor:'#4b474c',
      content: "发送到以下社区： 华盛顿大学",
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../houstlist/houstlist'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  sendRoom(){
    wx.showModal({
      title: '确定',
      confirmText: '发送',
      confirmColor: "#f47a20",
      cancelColor: '#4b474c',
      content: "发送到以下社区： 华盛顿大学",
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../roomlist/roomlist'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})





