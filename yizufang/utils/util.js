
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].join('-');
}
var verifyForm={
  isEmpty: function (option,tips){
    if (option == "") {
      wx.showToast({
        title: tips,
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    else {
      return true;
    }
  },
  //邮箱
  isEmail :function (email) {
    var reg = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$');
    if (email=="") {
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'success',
        duration: 1000
      })
      return false;
    }
    if(!reg.test(email)) {
      wx.showToast({
        title: '邮箱格式错误',
        icon: 'success',
        duration: 1000,
      })
      return false;
    }
    else {
      return true;
    }
  }
}

function rightIdcard(idcard) {
  return idcard.replace(idcard.substr(6, 8), "******");
}

module.exports = { formatDate, verifyForm, rightIdcard }
