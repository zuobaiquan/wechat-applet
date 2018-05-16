module.exports={
  verified:function(verifing){
    var ver = false;
    for (var i = 0; i < verifing.length; i++) {
        ver = [verifing[i].fname](verifing[i].content, verifing[i].tip);
        if (!ver) {
            break;
        }
    }
    return ver;
  },
  isEmpty: function (option, tips, _that){
    if (option == "") {
      _that.setData({
        showTips: true,
        tipsInfo: tips,
      });
      setTimeout(()=>{
        _that.setData({
          showTips: false,
        });
      }, 2000)
      return false;
    }
    else {
      return true;
    }
  },
  //邮箱
  isEmail: function (email, _that) {
      var reg = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$');
      if (email=="") {
        _that.setData({
          showTips: true,
          tipsInfo: '邮箱不能为空',
        });
        setTimeout(()=>{
          _that.setData({
            showTips: false,
          });
        }, 2000)
        return false;
      }
      if(!reg.test(email)) {
        _that.setData({
          showTips: true,
          tipsInfo: '邮箱格式不正确',
        });
        setTimeout(()=>{
          _that.setData({
            showTips: false,
          });
        }, 2000)
        return false;
      }
      else {
        return true;
      }
    }
}
