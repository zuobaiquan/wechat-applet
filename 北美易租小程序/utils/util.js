var QQMapWX = require('./qqmap-wx-jssdk.min.js');
var configApi = require('./constant.js');
console.log(configApi);
var qqmapsdk;
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  return [year, month, day].join('-');
}
function pubTime(ftime){
  ftime = ftime + '';
  var nowDate = new Date(),
      nowyear = nowDate.getFullYear(),
      nowmonth = nowDate.getMonth() + 1,
      nowday = nowDate.getDate(),
      nowhour = nowDate.getHours(),
      arrtime = ftime.split("-"),
      ayear = parseInt(ftime.substr(0, 4)),
      amonth = parseInt(ftime.substr(5, 2)),
      aday = parseInt(ftime.substr(8, 2)),
      ahour = parseInt(ftime.substr(11, 2));
  if ((ayear !== nowyear)) {
    return ftime;
  }
  if ((ayear == nowyear) && (nowmonth !== amonth)) {
    return ftime;
  }
  if ((ayear == nowyear) && (nowday !== aday)) {
    if (nowday - aday>15){
      return ftime;
    }
    return (nowday - aday) + '天前';
  }
  if ((nowmonth == amonth) && (nowday == aday)) {
    if (nowhour == ahour) {
      return '刚刚'
    }
    else {
      return (nowhour - ahour) + '小时前';
    }
  }
  else {
    return ftime;
  }
}
function handelStr(str,num){
  str+="";
  if (str.length > num){
    return str.substr(0,num)+"...";
  }
  else{
    return str;
  }
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

//逆地址解析
var getAddressDetail = function (that) {
  // 实例化API核心类
  qqmapsdk = new QQMapWX({
    key: configApi.configApi.QQMapWX_KEY
  });
  //逆地址解析
  qqmapsdk.reverseGeocoder({
    location: {
      latitude: that.data.latitude,
      longitude: that.data.longitude
    },
    success: function (res) {
      console.log(res);
      // console.log(res.result.address_component.city);
      // console.log(res.result.address_component.province);
      if (res.result.address_component.city != null || res.result.address_component.city != undefined) {
        //中国
        that.setData({
          city: res.result.address_component.city,
          state: res.result.address_component.province,
          address: res.result.address_component.district + res.result.address_component.street_number + res.result.address_component.street
        })
      }
      else if (res.result.address_component.ad_level_1 != null || res.result.address_component.ad_level_1 != undefined) {
        //备注：国外的未必有locality参数
        that.setData({
          city: res.result.address_component.locality == null || res.result.address_component.locality == undefined ? '' : res.result.address_component.locality,//解决此参数在外国地图环境下可能为空的问题，若为空则给空字符串
          state: res.result.address_component.ad_level_1,
          address: res.result.address_component.street
        })
      }
    },
    fail: function (res) {
      console.log(res);
    },
    complete: function (res) {
      //console.log(res);
    }
  });
}

function hideIdcard(idcard) {
  return idcard.replace(idcard.substr(6, 8), "******");
}

module.exports = { formatDate, pubTime, handelStr, verifyForm, hideIdcard, getAddressDetail }
