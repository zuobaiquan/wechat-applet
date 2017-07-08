// pages/Personal/bindmail/bindmail.js
Page({
  data: {
    passHide:true,
    passHas: false,
    isAgree:false
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
  setAgreestate(){
    this.setData({
      isAgree: !this.data.isAgree
    });
  }

})