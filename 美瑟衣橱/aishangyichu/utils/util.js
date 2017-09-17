
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

function swithTime(time){
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
    }else{
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
  formatTime: formatTime,
  setStorage: setStorage,
  getStorage: getStorage,
  showToast:showToast,
  showInfo:showInfo,
  scaleImg:scaleImg,
  previewImg: previewImg,
  swithTime: swithTime,
  cutImg:cutImg,
  getSystemInfoSync:getSystemInfoSync
}
/*
  小程序
1969056223@qq.com
isyc8899

AppID：wxac48e0d825c14960
AppSecret：39a185aec13ea0421ae5809bf22cfdfb
*/

