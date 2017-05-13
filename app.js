//app.js
App({
  data: {
    longitude: ''

  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              // console.log(that.globalData.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
      
    }
  },
  getUserOpenid: function (cb) {
    var that = this
    if (this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData.openid)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            // console.log(res.code);
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid: 'wx567353ce8052ed6b',
                secret: '45f8f69ccd95729cb542aae353245a20',
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                that.globalData.openid = res.data.openid;
                typeof cb == "function" && cb(that.globalData.openid)
              },
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
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

        that.setData({
          city: resCity
        })
      }
    })
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null,
    openid: null,
    id:null,
    oriCity:null,
    servers:'https://jacktrane.cn/wx/'
  }
})