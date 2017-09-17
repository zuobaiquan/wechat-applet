var network = require('../../utils/network');
const util = require('../../utils/util');
var app = getApp();
Page({
    data:{
        list:[],
        page:0,
        size:20,
        loadMoreFlag:false
    },
    onShow(){
        this.getList(0,20);
    },
    //获取列表
    getList(page,size=20){
        const that = this;
        util.showToast({title:'加载中...',icon:'loading'})
        network.baseRequest('/api/circle/recommend',{page:page,size:size},'GET', res => {
            let list = []
            wx.hideToast();
            if(res.statusCode == 200 && res.data.code == 0 && res.data.data){
                 list = res.data.data.content;
                list.forEach((v,k)=>{
                    v.coverUrl = util.scaleImg(v.coverUrl,{h:44,w:44,m:'fill'})
                })
                that.setData({
                    list:page == 0 ? list : that.data.list.concat(list)
                })
                if(list.length<that.data.size){
                    that.setData({
                        loadMoreFlag:true
                    })
                }else {
                    that.setData({
                        loadMoreFlag:false
                    })
                }
            }else if(res.statusCode == 200 && res.data.code != 0){
                util.showInfo(res.data.message);
            }

        })
    },
    //加入圈子
    addCircle(e){
        let id = e.currentTarget.dataset.id;
        let content = e.currentTarget.dataset.content;
        let coverUrl = e.currentTarget.dataset.coverurl;
        network.baseRequest(`/api/circle/${id}/join`,{id:id},'POST',function(res){
            util.showToast({title:'加入成功',icon:'success',duration:1500,success:function(){
                app.setGlData('circleDetailCoverUrl',coverUrl);
                wx.navigateTo({
                    url:`../circleDetail/index?id=${id}&content=${content}`
                })
            }})
        })
        // wx.navigateTo({
        //     url:`../about/index?id=${id}`
        // })
    },
    //查看详情
    gotoCircle(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url:`../circleDetail/index?id=${id}`
        })
    },
    onReachBottom(){
        if(this.data.loadMoreFlag)return;
        this.getList(++this.data.page,this.data.size);
    }
});