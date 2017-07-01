// pages/test/test.js
Page({
  data: {
    flag: false
  },
  a: function () {
    this.setData({ flag: false })
  },
  b: function () {
    this.setData({ flag: true })
  } 
})