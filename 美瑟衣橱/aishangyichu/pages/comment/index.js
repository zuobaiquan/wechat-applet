var network = require('../../utils/network');
var app = getApp();
var util = require('../../utils/util');
Page({
    data:{
        topicId:'',
        cancelPopup:false,
        toUser:null,
        placeholder:'分享这一刻的想法...'
    },
    onLoad(params){
        this.setData({
            topicId:params.topicId-0,
            toUser: params.userId,
            placeholder: params.name?'回复@'+params.name:'分享这一刻的想法...'
        });
        wx.setNavigationBarTitle({
            title:params.title
        })
    },
    //发布评论
    submit(e){
        var content = e.detail.value.content;
        var data ={
            topicId:this.data.topicId,
            content:content
        };
        if(this.data.toUser != 0){
            data.toUser = this.data.toUser;
        }
        network.showLoading('发布中...','loading',1000000);
        network.baseRequest('/api/topic/comment',data,'PUT', res => {
            var obj = {
                topicId:this.data.topicId,
                commentList:res.data.data
            };
            console.log(res);
            if(res.statusCode == 200){
                app.setGlData('comment',obj);
                network.hiddenLoading();
                network.back();
            }else{
                network.hiddenLoading();
                util.showInfo(res.data.message);
            }
        })
    },
    //取消
    cancel(){
        this.setData({cancelPopup:true});
    },
    cancelCancel(){
        this.setData({cancelPopup:false});
    },
    cancelConfirm(){
        network.back();
    }
});