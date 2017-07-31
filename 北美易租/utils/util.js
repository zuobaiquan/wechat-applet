
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  return [year, month, day].join('-');
}
var verifyForm={
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
function hideIdcard(idcard) {
  return idcard.replace(idcard.substr(6, 8), "******");
}

module.exports = { formatDate, verifyForm, hideIdcard }
