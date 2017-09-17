const network = require('../../utils/network')
let until = require('../../utils/util')
Page({
    data:{
        title:'',
        content:'',
        coverUrl:'',
        scalecoverUrl:'',
        id:''
    },
    onLoad(param){
        this.setData({
            title:param.title,
            content:param.content,
            coverUrl:param.coverUrl,
            scalecoverUrl:until.scaleImg(param.coverUrl,{h:200,m:'fill'}),
            id:param.id
        })
    },
    camera(){
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有

            success: function (res) {
                network.patchUploadImage(res.tempFilePaths,function (tempFilePaths) {
                    that.setData({
                        coverUrl:tempFilePaths[0],
                        scalecoverUrl:until.scaleImg(tempFilePaths[0],{h:200,m:'fill'})
                    });
                })

            }
        })
    },

    formSubmit(e){
        let obj = e.detail.value;
        network.baseRequest('/api/circle/edit',obj,'PUT',function (res) {
            if(res.statusCode == 200 && res.data.code == 0){
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    onShareAppMessage(){

    }
})