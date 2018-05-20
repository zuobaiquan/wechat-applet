const network = require('../../../utils/network.js');
const util = require('../../../utils/util.js');
var problemList=[{name:'',child:[]}];
Page({
  data: {
    problemListData:[]
  },
  onLoad: function () {
    var that=this;
    util.showToast({title:'加载中...',duration:10000})
    network.baseRequest('/api/question',{'page':0,'size':100},'get',function(data){
      const result=data.data.content
      problemList.shift()
      var tempCategory=[];
      result.map(item => {
          if(!tempCategory.includes(item.category.name)){
            tempCategory.push(item.category.name);
          }
          item.status=false
      });
      for(var kk=0;kk<tempCategory.length;kk++){
          problemList.push({
              name:tempCategory[kk],child:[]
          });
          for(var kkk=0;kkk<result.length;kkk++){
            if(tempCategory[kk]==result[kkk].category.name){
              problemList[kk].child.push(result[kkk])
            }
          }
      }
      that.setData({
        problemListData: problemList
      })
      wx.hideToast();
    });
  },
  toggleDetail(e){
    let [index,flag]=[e.currentTarget.dataset.index,e.currentTarget.dataset.flag];
    this.data.problemListData[index].child.map((item,index)=>{
      if(index==flag){
          item.status=!item.status
          this.setData({
            problemListData:this.data.problemListData
          })
          console.log(this.data.problemListData);
          return ;
      }
    })
  }
})
