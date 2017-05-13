//index.js
//获取应用实例
var app = getApp();
var map;
Page({
  data: {
    userInfo: {
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


    // 获取用户openid，存入data数据
    app.getUserOpenid(function (openid) {
      //更新数据
      that.setData({
        openid: openid
      });
      //获取用户userinfo
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo,
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          avatarUrl: userInfo.avatarUrl,
          province: userInfo.province,
          city: userInfo.city
        });
        wx.request({
          url: app.globalData.servers+'userApi.php',
          data: {
            nickName: that.data.nickName,
            gender: that.data.gender,
            avatarUrl: that.data.avatarUrl,
            province: that.data.province,
            city: that.data.city,
            openid: that.data.openid
          },
          method: 'POST',
          header: {
            // 'Content-Type': 'application/json'
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            app.globalData.id = res.data.user_id;
            // console.log(res.data)
            // 地图的marker在这边
            that.setData({
              markers: res.data.list
            })
          }
        })
      });
      
    });
    wx.getLocation({
      type: 'wgs84',

      success: function (res) {
        var longitude = res.longitude, latitude = res.latitude;
        that.locateAnal(res.latitude, res.longitude);
        var info = wx.getSystemInfoSync();
        var lo = 100.9, la = 39.9;
        that.setData({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          scale: 12,
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

    // console.log(app.globalData);
    

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

  },
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
        var resCity = city.slice(0, -1);

        app.globalData.oriCity = resCity;
      }
    })
  }

})
