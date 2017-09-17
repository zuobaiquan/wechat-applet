let network = require('../../utils/network')
let util = require('../../utils/util')
Page({
    data:{
        showMask:true,
        id:'',
        circleObj:{},
        share:'',
        share_img:true,
        qrcodeurl:''
    },
    onLoad(param){
        let share = param.from_share,that = this;
        this.setData({
            id:param.id,
            share:share
        })
        let path = encodeURIComponent(`/pages/inviteJoin/index?from_share=from_share&id=${that.data.id}`);
        network.baseRequest('/api/wx/createwxaqrcode', {
                path:path,
                width:200
        },'GET',function(res){
            that.setData({
                qrcodeurl:res.data && res.data.data
            })
        })
    },
    onShow(){
        this.getInfoDetail(this.data.id)
    },
    getInfoDetail(id){
        const that = this;
        network.baseRequest(`/api/circle/${id}`,{},'POST',function (res) {
            console.log(res)
            if(res.data && res.data.data){
                that.setData({
                    circleObj: res.data.data
                })
            }
        })
    },
    onShareAppMessage() {
        return {
            title: `欢迎加入 ${this.data.circleObj.creator.nickName} 的圈子`,
            path: '/pages/inviteJoin/index?from_share=from_share&id='+this.data.id
        }
    },
    //加入圈子
    addCircle(){
        let id = this.data.id;
        network.baseRequest(`/api/circle/${id}/join`,{id:id},'POST',function(res){
            util.showToast({title:'回调成功',icon:'success',duration:1500,success:function(){

                wx.switchTab({
                    url: '/pages/index/index'
                })
            }})
        })
    },
    share_friend(){
        this.setData({
            share_img:false
        })
    }
});