// strategy.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;    
    wx.request({
      url: 'https://jacktrane.cn/wx/travelApi.php?q=list&city='+options.city,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        that.setData({
          items: res.data
        })
      }
    })
  },
  nav: function(e){
    var url = e.currentTarget.dataset.url;
    var urlRes = url.slice(0, -5);
    wx.navigateTo({
      url: './straContent?url='+urlRes
    })
    
  }
})