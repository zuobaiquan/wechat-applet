import {setStorage,getStorage} from './util';
var app = getApp();
function patchUploadImage(tempFilePaths,success){
    console.log('文件路径', tempFilePaths);
    let count = 0;
    let allFileUrl = [];
    function upload(){
        var ext = tempFilePaths[count].match(/\w+(\.\w+)/)[1];
        var aliyunFileKey = 'wardrobe/' + 'uid_888/' + (new Date().getTime()) + '_' + Math.ceil((Math.random()*100000)) + ext;
        console.log(aliyunFileKey);
        wx.uploadFile({
          url: 'https://img.ifmy.cn/',
            filePath:tempFilePaths[count],
            name:'file',
            // header: {}, // 设置请求的 header
            formData: {
                'key':aliyunFileKey,
                'success_action_status':'200'
            }, // HTTP 请求中其他额外的 form data
            success: function(res){
                console.log(22222,res);
                if (res.statusCode != 200) {
                    errorCB(new Error('上传错误:' + JSON.stringify(res)))
                    wx.showModal({
                        title: '提示',
                        content: '图片上传失败，请检查网络重新上传！',
                        showCancel: false
                    });
                    return;
                }
                console.log('上传成功', res,aliyunFileKey);
                allFileUrl.push('https://img.ifmy.cn/' + aliyunFileKey);
                count++;
                if(count == tempFilePaths.length){
                    success(allFileUrl);

                }else{
                    upload()
                }
            },
            fail: function(res) {
                // fail
                console.log('上传失败：res', res);
                if (res.statusCode != 200) {
                    errorCB(new Error('上传错误:' + JSON.stringify(res)))
                    wx.showModal({
                        title: '提示',
                        content: '图片上传失败，请检查网络重新上传！',
                        showCancel: false
                    })
                    return;
                }
            },
            complete: function(res) {
                // complete
                console.log('请求完成');
            }
        })
    };
    upload();
}
function patchUploadFile(tempFilePaths,success){
    console.log('文件路径', tempFilePaths);
    let allFileUrl = '';
    function upload(){
        var ext = tempFilePaths.match(/\w+(\.\w+)/)[1];
        var aliyunFileKey = 'wardrobe/' + 'uid_888/' + (new Date().getTime()) + '_' + Math.ceil((Math.random()*100000)) + ext;
        wx.uploadFile({
          url: 'https://img.ifmy.cn',
            filePath:tempFilePaths,
            name:'file',
            // header: {}, // 设置请求的 header
            formData: {
                'key':aliyunFileKey,
                'success_action_status':'200'
            }, // HTTP 请求中其他额外的 form data
            success: function(res){
                // success
                if (res.statusCode != 200) {
                    errorCB(new Error('上传错误:' + JSON.stringify(res)))
                    wx.showModal({
                        title: '提示',
                        content: '文件上传失败，请检查网络重新上传！',
                        showCancel: false
                    });
                    return;
                }
                console.log('上传成功', res);
                allFileUrl ='https://img.ifmy.cn/' + aliyunFileKey;
                success(allFileUrl);
            },
            fail: function(res) {
                // fail
                console.log('上传失败：res', res);
                if (res.statusCode != 200) {
                    errorCB(new Error('上传错误:' + JSON.stringify(res)))
                    wx.showModal({
                        title: '提示',
                        content: '文件上传失败，请检查网络重新上传！',
                        showCancel: false
                    })
                    return;
                }
            },
            complete: function(res) {
                // complete
                console.log('请求完成');
            }
        })
    };
    upload();
}

//网络请求封装
const host = 'https://ifarm.iqiys.cn';
function baseRequest(path, parameter, method, success,dataType, fail) {
    var url = host + path;
    var data = parameter || {};
    //var token="cuKSpDsOtNXJvGuzqO6PZF489rfbyZMyNty44tr8jXLGRovOHNeC9CAnOxKOmmQ7";
    var token = getStorage('token');
    var dataType =  dataType || 'application/json'
    // if(token){
    //     data.token = token;
    // }
    // console.log("----start-----request----");
    // console.log("request url:[" + url + ']');

    wx.request({
        url: url,
        data: data,
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': dataType,
            "auth":token
        },
        success: function (res) {
            if(res.data.code == -100){
                //setStorage('token','Th5DiBrMtewI51J9EBITQzGyaLfICGpgj35XfGRGN33DfQVblHe9wtEzO7uvkbPl');
                //app.login();
            }else{
                success(res);
            }

        },
        fail: function (res) {
            if(fail&&typeof fail == 'function')
            fail(res);
        }
    });
    // console.log("----end-----request----");
}


function baseUpload(path, tempFilePaths, success, fail) {
    var ext = tempFilePaths.match(/\w+(\.\w+)/)[1];
    var aliyunFileKey = 'wardrobe/' + 'uid_888/' + (new Date().getTime()) + '_' + Math.ceil((Math.random()*100000)) + ext;
    var token = getStorage('token');
    wx.uploadFile({
      url: host + path,
      filePath:tempFilePaths,
      method: 'POST',
      name:'file',
      header: {
        "content-type": "multipart/form-data",
        'Accept': '*/*',
        "auth":token
       },
      formData: {
        'file':aliyunFileKey
      },
      success: function(res){
        console.log("成功",res);
        success(JSON.parse(res.data));
      },
      fail: function(res) {
          console.log("失败1",res);
      },
      complete: function(res) {
          // complete
          console.log('请求完成2',res);
      }
    })
}

function showLoading (title,icon='loading',time=1000){
    wx.showLoading({
        title: title,
        icon: icon,
        duration: time
    });
};

function back(num=1){
    wx.navigateBack({
        delta: num
    })
}

module.exports={
    patchUploadImage: patchUploadImage,
    patchUploadFile:patchUploadFile,
    baseRequest: baseRequest,
    showLoading: showLoading,
    hiddenLoading: wx.hideLoading,
    back: back,
    baseUpload:baseUpload
};
