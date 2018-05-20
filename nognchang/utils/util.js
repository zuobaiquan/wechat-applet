function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return [year, month, day].join('-');
}
function formatDate2(date) {
  var date = new Date(date);
  var Y = date.getFullYear();
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
  var D = date.getDate();
  return [Y, M, D].join('.');
}
function formatTime(time) {
  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function swithTime(ftime){
  ftime = ftime + '';
    var nowDate = new Date(),
        nowyear = nowDate.getFullYear(),
        nowmonth = nowDate.getMonth() + 1,
        nowday = nowDate.getDate(),
        ayear = parseInt(ftime.substr(0, 4)),
        amonth = parseInt(ftime.substr(5, 2)),
        aday = parseInt(ftime.substr(8, 2));
    if ((ayear !== nowyear)) {
        return ftime;
    }
    if ((ayear == nowyear) && (nowmonth !== amonth)) {
        return ftime;
    }
    if ((ayear == nowyear) && (nowday !== aday)) {
        if (nowday - aday > 2) {
            return ftime;
        }
        if (nowday - aday ==2) {
            return '前天';
        }
        if (nowday - aday ==1) {
            return '昨天';
        }
    }
    if ((nowmonth == amonth) && (nowday == aday)) {
        return '今天';
    } else {
        return ftime;
    }
}
//截取三分之一的字
function subthreeText(str){
  str+="";
  var len= str.length/3;
  return str.substr(0,len);
}
function pubTime(time){
  var nowTime = new Date()-0;
  var maxHour = (nowTime -time)/1000/3600;

  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if(maxHour>=24){
    return year+'/'+month+'/'+day
  }else{
    if(maxHour>1){
      return parseInt(maxHour)+'小时前';
    }
    if(parseInt((nowTime -time)/1000/60)<=0){
      return '刚刚';
    }
    else{
      return parseInt((nowTime -time)/1000/60)+'分钟前';
    }
  }
}
/*设置缓存*/
function setStorage(key,val,sync=true){
  if(sync){
    wx.setStorageSync(key, val)
  }else{
    wx.setStorage({
      key:key,
      data:val
    });
  }
}
/*在缓存获取数据*/
function getStorage(key,cb,sync=true){
  if(sync){
    var value = wx.getStorageSync(key);
    if(value){
      return value;
    }else{
      return false;
    }
  }else{
    wx.getStorage({
      key: key,
      success: function(res) {
        if(cb && typeof  cb == 'function'){
          cb(res.data);
        }
      },
      fail:function () {
        return false;
      }
    })
  }
}
//提示信息封装
function showToast(obj) {
  let {title = '',icon = 'loading',image='',duration = 1500,mask = false,success,fail,complete} = obj;
  wx.showToast({
    title: title,
    icon: icon,
    image:image,
    duration:duration,
    mask:mask,
    success(){
      typeof success == 'function' && success();
    },
    fail(){
      typeof fail == 'function' && fail();
    },
    complete(){
      typeof complete == 'function' && complete();
    }
  })
}
//提示信息封装
function showInfo(title='成功',content='',showCancel=false,confirmFn,cancelFn) {
  wx.showModal({
    title: title,
    content: content,
    showCancel:showCancel,
    success: function(res) {
      if (res.confirm) {
        confirmFn && typeof confirmFn =='function' && confirmFn();
      } else if (res.cancel) {
        cancelFn && typeof cancelFn =='function' && cancelFn();
      }
    }
  })
}
//图片处理

function scaleImg(src,obj) {
  let {m = 'lfit',w = '',h = '',limit = 1,color = ''} = obj,arrStr = ['?x-oss-process=image/resize'],obj_temp={};
  if(src.indexOf('x-oss-process')>0)return
  obj_temp = {
    m:m,
    w:w,
    h:h,
    limit:limit,
    color:color
  }
  Object.keys(obj_temp).forEach((v,k)=>{
    if(!!obj_temp[v])arrStr.push(v+'_'+obj_temp[v]);
  })
  let strResult = arrStr.join(',');
  return src + strResult;
}

function cutImg(src,obj){
  let {w,h,x,y,g = 'center'} = obj,arrStr = ['?x-oss-process=image/crop'],obj_temp = {};
  if(src.indexOf('x-oss-process')>0)return
  obj_temp = {
    x:x,
    w:w,
    h:h,
    y:y,
    g:g
  }
  Object.keys(obj_temp).forEach((v,k)=>{
    if(!!obj_temp[v])arrStr.push(v+'_'+obj_temp[v]);
  })
  let strResult = arrStr.join(',');
  return src + strResult;
}
function previewImg(urls,current){
  wx.previewImage({
    current: current, // 当前显示图片的http链接
    urls: urls // 需要预览的图片http链接列表
  })
}
function getSystemInfoSync(){
  var res = wx.getSystemInfoSync();
  return res;
}
module.exports = {
  formatDate:formatDate,
  formatDate2:formatDate2,
  formatTime: formatTime,
  setStorage: setStorage,
  getStorage: getStorage,
  showToast:showToast,
  showInfo:showInfo,
  scaleImg:scaleImg,
  previewImg: previewImg,
  swithTime: swithTime,
  pubTime:pubTime,
  cutImg:cutImg,
  getSystemInfoSync:getSystemInfoSync,
  subthreeText:subthreeText
}
/*
  小程序
1969056223@qq.com
isyc8899

AppID：wxac48e0d825c14960
AppSecret：39a185aec13ea0421ae5809bf22cfdfb
*/
