const network = require('../../utils/network');
const util = require('../../utils/util');
Page({
    data:{
        shareFriendFlag:false,
        windowFlag:false,
        tags:[],
        types:[],
        styles:[],
        occasions:[],
        tagName:'',
        tagsLength:false,
        ids:''
    },
    shareFriend(){
        this.setData({shareFriendFlag:!this.data.shareFriendFlag})
    },
    //获取标签名
    getTagVal(e){
      this.setData({
          tagName:e.detail.value
      })
    },
    onLoad(option){
        let ids = option.ids;
        this.setData({
            ids:ids
        })
        console.log(ids)
    },
    onShow(){
        const that = this;
        network.baseRequest('/api/tag/',{},'GET',function (res) {

             res.data.data.userCreateTag.concat(res.data.data.sysTypeTag,res.data.data.sysStyleTag).forEach((v,k)=>{
                v.checked = false
            })
            res.data.data.userCreateTag.length === 0 ? that.data.tagsLength = true :'';
            that.setData({
                tags:res.data.data.userCreateTag,
                types:res.data.data.sysTypeTag,
                styles:res.data.data.sysStyleTag,
                occasions:res.data.data.occasion,
                tagsLength:that.data.tagsLength

            })
        })
    },
    onHide(){
        util.setStorage('imgSrcArr',[]);
    },
    //选择标签
    checkFn(e){
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        switch (type){
            case 'type':
                this.data.types[index]['check'] = !this.data.types[index]['check'];
                this.setData({
                    types:this.data.types
                })
                break;
            case 'style':
                this.data.styles[index]['check'] = !this.data.styles[index]['check'];
                this.setData({
                    styles:this.data.styles
                })
                break;
            case 'occasion':
                this.data.occasions[index]['check'] = !this.data.occasions[index]['check'];
                this.setData({
                    occasions:this.data.occasions
                })
                break;
            case 'diy':
                this.data.tags[index]['check'] = !this.data.tags[index]['check'];
                this.setData({
                    tags:this.data.tags
                })
                break;
        }

    },
    //确定
    confirm(){
        let tags = [];
        let allTags = this.data.tags.concat(this.data.types,this.data.styles,this.data.occasions);
        let urls = util.getStorage('imgSrcArr')
        allTags.forEach((v,k)=>{
            console.log(v)
            if (v.check){
                tags.push(v.id)
            }
        });
        let obj = {
            tags:tags.length == 0 ? null : tags,
            syncToTopic:this.data.shareFriendFlag,
            urls: urls
        }
        if(!!this.data.ids){
            obj.clothesIds = this.data.ids.split(',').map((v,k) => {
                return Number(v);
            })

            this.sendData(obj,'PUT','编辑成功')
        }else {
            this.sendData(obj);
        }

    },
    sendData(obj={},method='POST',title='提交成功'){
        network.baseRequest('/api/clothes/',obj,method,function (res) {
            if(res.statusCode == 200 && res.data.code == 0){
                util.showToast({
                    title:title,
                    icon:'success',
                    duration:1000,
                    success:function () {
                        util.setStorage('imgSrcArr',[]);
                        wx.navigateBack({
                            delta:1
                        });
                    }
                })
            }else{
                util.showInfo('失败');
            }
        })
    },
    //关闭弹框
    close(){
        this.setData({
            windowFlag:false
        })
    },
    //取消
    goback(){
      util.setStorage('imgSrcArr',[]);
        wx.navigateBack({
            delta:1
        });
    },
    //添加标签
    addTag(){
        const that = this;
        if(!that.data.tagName.trim())return;
        network.baseRequest('/api/tag/',{name:that.data.tagName},'POST',function(res){
            that.setData({
                windowFlag:false,
                tagsLength:false
            })
            if(res.statusCode == 200){
                that.data.tags.unshift(res.data.data);
                that.setData({
                    tags:that.data.tags
                })
            }
            util.showInfo(res.data.message? res.data.message :'添加成功！')
        },'application/x-www-form-urlencoded')
    },
    //删除标签
    deleTag(e){
        let index = e.currentTarget.dataset.index;
        let tagId = e.currentTarget.dataset.tagid;
        const that = this;
        util.showInfo('确定是否删除？','',true,function () {
            network.baseRequest('/api/tag/'+tagId,{},'DELETE',function (res) {
                that.data.tags.splice(index,1);
                console.log(that.data.tags.length)
                that.data.tags.length == 0 ? that.data.tagsLength = true : that.data.tagsLength = false
                that.setData({
                    tags:that.data.tags,
                    tagsLength:that.data.tagsLength
                })
            })
        })

    },
    //创建
    openWindow(){
        this.setData({
            windowFlag:true
        })
    }
})