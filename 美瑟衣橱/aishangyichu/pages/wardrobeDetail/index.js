const network = require('../../utils/network');
const util = require('../../utils/util');
Page({
    data:{
        resultArr:[],
        repeatResultArr:[],
        tagsFlag:false,
        check:false,
        show:true,
        type:'',
        id:'',
        count:0,
        selectImgs:[],
        clothesId:[],
        uid:null,
        yourself:false
    },
    edit(){
        this.setData({
            show:false,
            type:'edit'
        })
    },
    //选择某张图片
    select(e){

        let parent_index = e.currentTarget.dataset.idx;
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        this.data.resultArr[parent_index]['imgs'][index]['check'] = !this.data.resultArr[parent_index]['imgs'][index]['check'];

        if(this.data.resultArr[parent_index]['imgs'][index]['check']){
            this.data.clothesId.push(id);
        }else{
            let index_i = this.data.clothesId.indexOf(id);
            index_i!=-1 && this.data.clothesId.splice(index_i,1);
        }
        this.setData({
            count:this.data.clothesId.length
        })
        if(this.data.count>9){
            util.showInfo('最多只能选择 9 张图片');
            return;
        }
        this.setData({
            resultArr:this.data.resultArr,
            clothesId: this.data.clothesId,
            count:this.data.clothesId.length
        })
    },
    delete(){
        this.setData({
            show:false,
            type:'delete'
        })
    },
    getDataList(id){
        let that = this;
        let sysInfo = util.getSystemInfoSync();
        that.setData({
            resultArr:[],
            repeatResultArr:[]
        });
        network.baseRequest('/api/clothes/',{tagId:id,uid:this.data.uid},'GET',function (res) {
            let list = res.data.data;
            let item = {},timeNum = '';
            let today = util.formatTime(new Date()).split(' ')[0];
            // list.sort((a,b)=>{
            //     return a.createTime - b.createTime;
            // })
            list.forEach((v,k)=>{
                let timeFormat = util.formatTime(new Date(v.createTime)).split(' ')[0];
                v.formatTime = today == timeFormat ? '今天': timeFormat;
                v.timeNum = timeFormat.replace(/\//g,'');
                return v;
            })
            item.time = list[0] && list[0].formatTime;
            item.imgs = [];
            item.notscaleimgs = [];
            item.tags = list[0] && list[0].tags;
            timeNum = list[0] && list[0].timeNum;
            list.length!=0 ? that.data.resultArr.push(item) : '';
            list.forEach((v,k)=>{
                if(v.timeNum == timeNum){
                    item.imgs.push({ url: util.scaleImg(v.url,{w:Math.floor(sysInfo.pixelRatio*sysInfo.screenWidth/2),m:'fill'}),check:false,id:v.id});
                    item.notscaleimgs.push(v.url);
                    item.tags = Array.prototype.concat(item.tags,v.tags);
                }else{
                    timeNum = v.timeNum;
                    item = {
                        time:v.formatTime,
                        imgs:[],
                        tags:[],
                        notscaleimgs:[]
                    };
                    item.tags.push(v.tags);
                    item.imgs.push({url:util.scaleImg(v.url,{w:Math.floor(sysInfo.pixelRatio*sysInfo.screenWidth/2),m:'fill'}),check:false,id:v.id});
                    item.notscaleimgs.push(v.url);
                    that.data.resultArr.push(item);
                }
            });
            that.data.resultArr.forEach((v,k)=>{
                let arr = [];
                v.tags.forEach((v1,k1)=>{
                    if(!!v1.name)arr.push(v1.name);
                })
                v.tags = [...new Set(arr)];
            })
            that.setData({
                resultArr:that.data.resultArr,
                repeatResultArr:that.data.resultArr
            });
            console.log(that.data.resultArr);
        })
    },
    edit_delete_result(){
        let that = this;
        if(this.data.clothesId.length == 0) return;
        if(this.data.type == 'edit'){
            console.log('edit')
            wx.navigateTo({
                url: '../selectTags/index?ids='+that.data.clothesId.join(',')
            })
            that.cancel();
        }else if(this.data.type == 'delete'){
            console.log('delete')
            network.baseRequest('/api/clothes/',{clothesIds:this.data.clothesId},'DELETE',function (res) {
                console.log(res)
                if(res.statusCode == 200 && res.data.code == 0){
                    util.showToast({title:'删除成功！',icon:'success'})
                    that.getDataList(that.data.id)
                    that.setData({
                        show:true,
                        clothesId:[],
                        resultArr:that.data.resultArr,
                        count:0
                    })
                }
            })
        }
    },
    cancel(){
        this.setData({
            show:true,
            resultArr:this.data.repeatResultArr,
            count:0,
            clothesId:[],
        })
    },
    onLoad(option){
        const that = this;
        let id = option.id;
        that.setData({
            id:id,
            uid:option.uid?option.uid-0:0,
            yourself:option.uid ? false : true
        });
        wx.setNavigationBarTitle({
            title:option.title
        })

    },
    onShow(){
        let id = this.data.id;
        if(id == 0){
            this.setData({
                tagsFlag:true
            })
        }
        this.getDataList(id)
    },
    //预览图片
    previewImage(e){
        var urls = e.currentTarget.dataset.urls;
        var curr = e.currentTarget.dataset.curr;
        util.previewImg(urls,curr);
    },
});