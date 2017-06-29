
Page({
  data: {
    cityList: [
      { 'picture': '../../images/community/community-icon.png', name: '城市名', noticeNum: 23, }, { 'picture': '../../images/community/community-icon.png', name: 'A城市名', noticeNum: 23,  }]
  },
  onLoad() {
    
  },

  searchChange(e){
    console.log(e.detail.value);
  }

})





