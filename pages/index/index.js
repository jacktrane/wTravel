//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '玩命加载中...',
    userInfo: {
      nickName: '吴泽强',
    },
    openId:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      // console.log(userInfo);
      //更新数据
      that.setData({
          userInfo:userInfo
        })
    });

    // 获取用户openid，存入data数据
    wx.login({
      success: function(res) {
        if (res.code) {
         console.log(res.code);
         wx.request({
           url: 'https://api.weixin.qq.com/sns/jscode2session',
           data: {
             appid:'wx567353ce8052ed6b',
             secret:'45f8f69ccd95729cb542aae353245a20',
             js_code:res.code,
             grant_type:'authorization_code'
           },
           method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'Content-Type': 'application/json'
            },
           success: function(res){
             that.setData({
                openId:res.data.openid
              })
           },
         })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    wx.checkSession({
      success: function(){
        //登录态未过期
      },
      fail: function(){
        //登录态过期
        wx.login()
      }
    });

    // 获取用户信息，存入data数据
    wx.getUserInfo({
      success: function(res) {
        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
        console.log(res.userInfo);
        that.setData({
          userInfo:res.userInfo
        })
      }
    });

    
    wx.getLocation({
      type: 'gcj02',
      
      success: function(res){
        var longitude = res.longitude, latitude = res.latitude;
        console.log(latitude);
        var lo = 100.9, la = 39.9;
        that.setData({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          markers:[{
            latitude: latitude,
            longitude: longitude,
            name: '微信小程序社区',
            desc: '我在这里'
          },{
            latitude: la,
            longitude: lo,
            name: '<p style="color:black">微信小程序社区</p>',
            desc: '我在这里'
          }],
          scale: 6,
          controls:[{
            id: 1,
            iconPath: '../images/icon.png',
            position:{
              left: 270,
              top: 500-50,
              width: 50,
              height: 50
            },
            clickable: true
          }]

        });
      }
    })
  },
  showLocation: function(e) {
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
  // controltap: function(e) {
  //   var that = this;
  //   wx.navigateTo({
  //     url: '../publish/tabBar?longitude=' + that.data.location.longitude + '&latitude=' + that.data.location.latitude
  //   })
  // },

  controltap: function () {
    var that = this;
    var itemList= ['文字', '语音', '图文']
    wx.showActionSheet({
      itemList:itemList,
      success: function (res) {
        if (!res.cancel) {
          // console.log(itemList[res.tapIndex])
          wx.navigateTo({
          url: '../publish/tabBar?name=' + itemList[res.tapIndex] + '&longitude=' + that.data.location.longitude + '&latitude=' + that.data.location.latitude
          })
        }
      }
    })
  }

})
