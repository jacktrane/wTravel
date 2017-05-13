// pages/index/slid.js
var app = getApp()

Page({
  data: {
    userInfo: {
      nickName: '吴泽强',
    },
  },
  onLoad: function () {
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
  onReady: function () {
    // 页面渲染完成
    // var that = this;
    // wx.getLocation({
    //   success: function (res) {
    //     that.locateAnal(res.latitude, res.longitude);
    //   },
    // })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  // 指南针
  nav: function () {
    wx.navigateTo({
      url: '../compass/compass'
    })
  },
  travel: function(){
    var that = this;
    wx.navigateTo({
      url: '../slid/strategy?city=' + app.globalData.oriCity
    })
  },
  // 坐标逆地址解析
  locateAnal: function (lat, lng) {
    var that = this;
    wx.request({
      url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' + lng + '&key=CLDBZ-MMDKG-7GGQ2-IRHQQ-YP7X3-3OB6X&get_poi=1',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var city = res.data.result.address_component.city;
        var resCity = city.slice(0,-1);

        that.setData({
          city: resCity
        })
      }
    })
  }
})

