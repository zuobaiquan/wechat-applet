// pages/Personal/bindmail/bindmail.js
Page({
  data: {
    passHide:false,
    passHas: false,
    isAgree:false,
    showMask:false,
    showEmailtips:false,
    showTips: false,
    tipsInfo: '验证码错误',
    codeTip:'点击获取'
  },

  onLoad: function () {
  
  },
  inputPass(e){
    const value=e.detail.value;
    if (value.length>=8){
      this.setData({
        passHas: true
      });
    }
    else{
      this.setData({
        passHas: false
      });
    }
  },
  getCode(){
    var count = 60,_that=this;
    var codetips="";
    var countDown = setInterval(function () {
      codetips = count + 'S后重发';
      count--;
      if (count == 0) {
        codetips = '点击获取';
        clearInterval(countDown);
      }
      _that.setData({
        codeTip: codetips
      });
    }, 1000);
  },
  showPass(){
    this.setData({
      passHide: !this.data.passHide
    });
  },
  setAgreestate(){
    this.setData({
      isAgree: !this.data.isAgree
    });
  },
  hideMask(){
    this.setData({
      showMask: false
    });
  },
  hideEmailtips(){
    this.setData({
      showMask: false,
      showEmailtips:false
    });
  },
  saveResult(){
    this.setData({
      showMask: true,
      showEmailtips: true
    });
    return ;
    var _that=this;
    _that.setData({
      showTips: true,
      tipsInfo: "验证码错误",
    });
    setTimeout(function () {
      _that.setData({
        showTips: false,
      });
    }, 2000)
  }

})