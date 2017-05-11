// straContent.js
var WxParse = require('../../wxParse/wxParse.js')
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this;
    wx.request({
      url: 'https://jacktrane.cn/wx/travelApi.php?q=content&url=' + options.url,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data.title);
        var that = this;
        var title = res.data.title;
        var content = res.data.content;
        
        // that.setData({
        //   title :title,
        //   content: content
        // })
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