
const util = require('../../../utils/util.js');
var app = getApp()
Page({
  data: {
    currentTab: 1,
    housetypeIndex:0,
    dateStart: util.formatDate(new Date()),
    dateEnd: util.formatDate(new Date()),
    priceLet: ['USD', 'CAD'],
    priceUnit: ['月', '天'],
    letter: 'USD',
    unit: '月',
    roomNum:0,
    toiletNum:0,
    showrentDetail: false,
    houseType:['公寓','联排别墅','独栋别墅','其他'],
    address:'',
    city:'',
    state:'',
    facilityItem:[
      { facilityItem0: false },
      { facilityItem1: false },
      { facilityItem2: false },
      { facilityItem3: false },
      { facilityItem4: false },
      { facilityItem5: false },
      { facilityItem6: false },
      { facilityItem7: false },
      { facilityItem8: false },
      { facilityItem9: false },
      { facilityItem10: false },
      { facilityItem11: false },
      { facilityItem12: false },
      { facilityItem13: false },
      { facilityItem14: false },
      { facilityItem15: false },
      { facilityItem16: false },
      { facilityItem17: false },
      { facilityItem18: false },
      { facilityItem19: false },
      { facilityItem20: false },
      { facilityItem21: false },
      { facilityItem22: false }
    ]
  },

  onLoad(options) {
    
    
  },
  bindPickerChange: function (e) {
    this.setData({
      housetypeIndex: e.detail.value
    })
  },
  mapFindaddr(){
    var that = this;
    //console.log(e);
    //一打开地图，自动定位到当前所在地址
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.info(res);
      }
    })
    //用户选中某个地址后的回调
    wx.chooseLocation({
      success: function (res) {
        console.log(111,res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.address
        })

        //逆地址解析
        util.getAddressDetail(that);
      }
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
  bindChange: function (e) {
    this.setData({
      rentpValue: e.detail.value
    })
  },
  selrentConfirm() {
    var val1 = this.data.rentpValue[0], val2 = this.data.rentpValue[1];
    this.setData({
      letter: this.data.priceLet[val1] || this.data.priceLet[0],
      unit: this.data.priceUnit[val2] || this.data.priceUnit[0],
      showrentDetail: false
    })
  },
  selrentCancel() {
    this.setData({
      showrentDetail: false
    });
  },
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    //是卧室
    if(index==1){
      this.setData({
        roomNum: ++this.data.roomNum
      });
    }
    //卫生间
    if (index == 3) {
      this.setData({
        toiletNum: ++this.data.toiletNum
      });
    }
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    //是卧室
    if (index == 0) {
      if (this.data.roomNum == 0){
        return ;
      }
      this.setData({
        roomNum: --this.data.roomNum
      });
    }
    //卫生间
    if (index == 2) {
      if (this.data.toiletNum == 0) {
        return;
      }
      this.setData({
        toiletNum: --this.data.toiletNum
      });
    }
  },
  /**
   * 验证邮箱
   */
  verifyEmail(e) {
    util.verifyForm.isEmail(e.detail.value,this);
  },

  bindDateCgstart(e) {
    this.setData({
      dateStart: e.detail.value
    })
  },
  bindDateCgend(e) {
    this.setData({
      dateEnd: e.detail.value
    })
  },
  showrentDetail(){
    this.setData({
      showrentDetail: !this.data.showrentDetail
    });
  },
  hiderentDetail() {
    this.setData({
      showrentDetail: false
    });
  },
  selFacility(e){
    var index = e.currentTarget.dataset.index;
    var facilityItemindex = `facilityItem${index}`;
    console.log(facilityItemindex);
    for(let i=0;i<23;i++){
       if(i==index){
         this.data.facilityItem[i][facilityItemindex] = !this.data.facilityItem[i][facilityItemindex];
         this.setData({
           facilityItem: this.data.facilityItem
         });
       }
    } 
    console.log(this.data.facilityItem);
  }

})

