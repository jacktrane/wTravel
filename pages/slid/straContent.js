// straContent.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.url);
    var that = this;
    wx.request({
      url: app.globalData.servers + 'travelApi.php?q=content&url=' + options.url,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        WxParse.wxParse('title', 'html', res.data.title, that, 5);              
        WxParse.wxParse('content', 'html', res.data.content, that, 5);            
        // that.setData({
        //   title: res.data.title,
        //   content: res.data.content
        // })
      }
    });
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