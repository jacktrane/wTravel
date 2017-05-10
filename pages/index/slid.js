// pages/index/slid.js
var app = getApp()

Page({
  data:{
    userInfo: {
      nickName: '吴泽强',
    },
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      // console.log(userInfo);
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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
  },
  nav:function(){
    wx.navigateTo({
      url: '../compass/compass'
    })
  }
})

