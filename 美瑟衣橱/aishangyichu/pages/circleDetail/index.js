var network = require('../../utils/network');
var app = getApp();
var util = require('../../utils/util');
Page({
    data:{
        vote:'', //标志是赞同还是反对
        voteId:'',//投票id
        showVote:false, //是否弹出投票窗
        content:'',
        coverUrl:'',
        id:'',
        topicList:[],
        type:null,
        wardrobe:{},
        wardrobeList:[],
        showContent:true,
        fetchAll: false,
        uid:0
    },
    onLoad(params){
        var coverUrl = app.getGlData('circleDetailCoverUrl');
        var that = this;
        this.setData({
            content:params.content,
            coverUrl:coverUrl,
            id:params.id,
            title: params.title ? params.title :'留言',
            type: params.type,
            uid: params.uid
        });
        console.log(params)
        wx.setNavigationBarTitle({
            title: that.data.title
        });
        this.getTopicList();
    },
    onShow(){
        var comment = app.getGlData('comment');
        var sendTopic = app.getGlData('sendTopic');
        if(sendTopic){
            app.setGlData('sendTopic',false);
            if(this.data.type == 'leave'){
                network.baseRequest('/api/circle/wardrobe',{userId:this.data.uid},'GET',res => {
                    var wardrobe = res.data.data;
                    network.baseRequest('/api/topic/list',{circleId:wardrobe.id,page:0,size:20},'GET',res => {
                        var list = res.data.data.content.map(item => {
                            var imgs = item.photos.map(itemImg => {
                                return itemImg.url;
                            });
                            item.imgs = imgs;
                            item.createTime = util.swithTime(item.createTime);
                            return item;
                        });
                        this.setData({topicList:list})
                    });
                })
            }else{
                network.baseRequest('/api/topic/list',{circleId:this.data.id,page:0,size:20},'GET',res => {
                    var list = res.data.data.content.map(item => {
                        var imgs = item.photos.map(itemImg => {
                            return itemImg.url;
                        });
                        item.imgs = imgs;
                        item.createTime = util.swithTime(item.createTime);
                        return item;
                    });
                    this.setData({topicList:list})
                });
            }
            return;
        };
        if(comment){
            var topicList = this.data.topicList.map(item => {
                if(item.id == comment.topicId){
                    item.comments = comment.commentList;
                }
                return item;
            });
            this.setData({topicList:topicList});
        }
    },
    //弹出、关闭投票弹窗
    showOrcloseVote(e){
        var vote = e.currentTarget.dataset.vote;
        var id = e.currentTarget.dataset.id;
        if(vote == 1){
            this.setData({vote:'like'});
        }else if(vote == -1){
            this.setData({vote:'boring'});
        }else if(vote == 0){
            this.setData({vote:''})
        }
        this.setData({
            showVote:!this.data.showVote,
            voteId : id
        });
    },
    //发布话题
    addTopic(){
        if(this.data.type=='leave'){
            network.baseRequest('/api/circle/wardrobe',{userId:this.data.uid},'GET',res => {
                var wardrobe = res.data.data;
                wx.navigateTo({
                    url: `../publishCircle/index?id=${wardrobe.id}&title=${this.data.title}`
                })
            })
        }else{
            wx.navigateTo({
                url: `../publishCircle/index?id=${this.data.id}&title=${this.data.title}`
            })
        }
    },
    //请求话题
    getTopicList(){
        if(this.data.type == 'leave'){
            network.baseRequest('/api/circle/wardrobe',{userId:this.data.uid},'GET',res => {
                var wardrobe = res.data.data;
                network.baseRequest('/api/topic/list',{circleId:wardrobe.id,page:this.data.topicList.length,size:20},'GET',res => {
                    var data = res.data.data.content.map(item => {
                        var imgs = item.photos.map(itemImg => {
                            return itemImg.url;
                        });
                        item.imgs = imgs;
                        item.createTime = util.swithTime(item.createTime);
                        return item;
                    });
                    var list = this.data.topicList.concat(data);
                    this.setData({topicList:list})
                });
                this.setData({wardrobe:wardrobe});
            });
        }else{
            network.baseRequest('/api/topic/list',{circleId:this.data.id,page:this.data.topicList.length,size:20},'GET',res => {
                console.log(res);
                var data = res.data.data.content.map(item => {
                    var imgs = item.photos.map(itemImg => {
                        return itemImg.url;
                    });
                    item.imgs = imgs;
                    item.createTime = util.swithTime(item.createTime);
                    return item;
                });
                var list = this.data.topicList.concat(data);
                this.setData({topicList:list});
                console.log(this.data.topicList);
            })
        }
    },
    //投票
    vote(e){
        var vote = e.currentTarget.dataset.vote;
        network.baseRequest('/api/topic/vote',{topicId:this.data.voteId,vote:vote},'POST', res => {
            console.log(res);
            if(res.statusCode == 200){
                var list = this.data.topicList.map(item =>{
                   if(item.id ==res.data.data.id){
                       res.data.data.createTime = item.createTime;
                       item = res.data.data
                   }
                   return item;
                });
                this.setData({
                    showVote:false,
                    topicList: list
                });
            }
        })
    },
    //评论
    comment(e){
        var topicId = e.currentTarget.dataset.topicid;
        var userId = e.currentTarget.dataset.userid;
        var name = e.currentTarget.dataset.name;
        console.log(e);
        wx.navigateTo({
            url: `../comment/index?topicId=${topicId}&userId=${userId?userId:0}&name=${name?name:''}&title=${this.data.title}`
        })
    },
    //编辑资料
    editMaterial(){
      wx.navigateTo({
          url:`../circleDetailInfo/index?id=${this.data.id}&title=${this.data.title}`
      })
    },
    //预览图片
    previewImage(e){
        var urls = e.currentTarget.dataset.urls;
        var curr = e.currentTarget.dataset.curr;
        console.log(urls,curr);
        util.previewImg(urls,curr);
    },
    //关闭圈子说明
    closeContent(){
        this.setData({showContent:false});
    },
    //跳转衣橱
    goWardrobe(e){
        var uid = e.currentTarget.dataset.uid;
        wx.navigateTo({
            url:`../otherWardrobe/index?uid=${uid}`
        })
    },
    //上拉刷新
    onReachBottom(){
        this.getTopicList();
    },
    //停止事件传播的辅助函数
    stop(){
        return '';
    }
});