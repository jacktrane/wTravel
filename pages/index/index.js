//index.js
//获取应用实例
var app = getApp();
var map;
Page({
  data: {
    motto: '玩命加载中...',
    userInfo: {
      nickName: '吴泽强',
    },
    openId: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    if (!map) {
      map = wx.createMapContext('map');
    }
    //获取用户userinfo
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    // 获取用户openid，存入data数据
    app.getUserOpenid(function (openid) {
      console.log(openid);
      //更新数据
      that.setData({
        openid: openid
      })
    });

    wx.getLocation({
      type: 'wgs84',

      success: function (res) {
        var longitude = res.longitude, latitude = res.latitude;
        console.log(latitude);
        var info = wx.getSystemInfoSync();
        var lo = 100.9, la = 39.9;
        that.setData({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          markers: [{
            latitude: latitude,
            longitude: longitude,
            name: '微信小程序社区',
            address: '北京市海淀区北四环西路66号',
            desc: '我在这里'
          }, {
            latitude: la,
            longitude: lo,
            name: '<p style="color:black">微信小程序社区</p>',
            desc: '我在这里'
          }],
          scale: 6,
          controls: [{
            id: 1,
            iconPath: '../../images/icon.png',
            position: {
              left: info.windowWidth - 70,
              top: info.windowHeight - 70,
              width: 50,
              height: 50
            },
            clickable: true
          }, {
            id: 2,
            iconPath: '../../images/icon.png',
            position: {
              left: info.windowWidth - 70,
              top: info.windowHeight - 120,
              width: 50,
              height: 50
            },
            clickable: true
          }]

        });
      }
    })
    
  },

  showLocation: function (e) {
    var that = this;
    var location = that.data.location;
    wx.openLocation({
      latitude: location.latitude,      // 纬度，范围为-90~90，负数表示南纬
      longitude: location.longitude,    // 经度，范围为-180~180，负数表示西经
      scale: 28,               // 缩放比例
      name: '微信小程序社区',   // 位置名
      address: '我还是在这里'       // 地址的详细说明
    });
  },
  // 地图的控件问题
  controltap: function (e) {
    var that = this;
    var itemList = ['文字', '语音', '图文']
    switch (e.controlId) {
      case 1: {
        wx.showActionSheet({
          itemList: itemList,
          success: function (res) {
            if (!res.cancel) {
              // console.log(itemList[res.tapIndex])
              wx.navigateTo({
                url: '../publish/tabBar?name=' + itemList[res.tapIndex] + '&longitude=' + that.data.location.longitude + '&latitude=' + that.data.location.latitude
              })
            }
          }
        })
      };
      case 2: {
        map.moveToLocation();
      };
    }

  }

})
