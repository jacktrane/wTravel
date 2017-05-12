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
  getUserInfo: function () {
    var that = this
    if (this.globalData.userInfo) {
      // typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              // typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getUserOpenid: function () {
    var that = this
    if (this.globalData.openid) {
      // typeof cb == "function" && cb(this.globalData.openid)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log(res.code);
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
                // typeof cb == "function" && cb(that.globalData.openid)
              },
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },
  getUserid: function (cb) {
    var that = this
    if (this.globalData.id) {
      typeof cb == "function" && cb(this.globalData.id)
    } else {
      //调用登录接口
      this.getUserInfo(function (userInfo) {
        console.log(userInfo);
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      });
    }
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null,
    openid: null,
    id:null
  }
})