// strategy.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;    
    wx.request({
      url: 'https://jacktrane.cn/wx/travelApi.php?city='+options.city,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        // var list = JSON.parse(res.data);
        console.log(res.data);
        that.setData({
          items: res.data
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})