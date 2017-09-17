const network = require('../../utils/network');
const util = require('../../utils/util')
Page({
    data:{
        circleObj:{},
        id:'',
        opreation:false,
        coverUrl:''
    },
    onLoad(param){
        const that = this;
        let id = param.id;
        that.setData({
            id:id
        })
        wx.setNavigationBarTitle({
            title:param.title
        })
    },
    getInfoDetail(id){
        const that = this;
        network.baseRequest(`/api/circle/${id}`,{},'POST',function (res) {
            if(res.data && res.data.data){
                let userBean = util.getStorage('userBean');
                that.setData({
                    circleObj: res.data.data,
                    opreation:userBean.id == res.data.data.creator.id,
                    coverUrl:util.scaleImg(res.data.data.coverUrl,{h:60,m:'fill'})
                })
            }
        })
    },
    onShow(){
        this.getInfoDetail(this.data.id)
    },
    circleCard(){
        wx.navigateTo({
            url:'../circleCard/index'
        })
    },
    circleInfo(){
        if(!this.data.opreation)return;
        wx.navigateTo({
            url:`../circleInfo/index?id=${this.data.id}&content=${this.data.circleObj.content}&title=${this.data.circleObj.title}&coverUrl=${this.data.circleObj.coverUrl}`
        })
    },
    inviteJoin(){
        wx.navigateTo({
            url:`../inviteJoin/index?id=${this.data.id}`
        })
    }
})