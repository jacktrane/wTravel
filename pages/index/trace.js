// userPub.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    server: app.globalData.servers,
    playing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    wx.setNavigationBarTitle({ title: app.globalData.oriCity });
    var that = this;
    wx.request({
      url: app.globalData.servers + 'listApi.php',
      data: {
        method: 'interation',
        city: app.globalData.oriCity,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          items: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  scroll: function (e, res) {
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
 

  openModal: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var user_id = app.globalData.id;
    var pub_id = e.currentTarget.dataset.id;
    this.setData({
      pub_id: pub_id
    })
    this.util(currentStatu)
  },
  

  requestModal: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var user_id = app.globalData.id;
    var user_name = app.globalData.userInfo.nickName;
    var pub_id = this.data.pub_id;
    var that = this;
    console.log(e.detail.value);
    console.log(pub_id);
    console.log(user_id);
    wx.request({
      url: app.globalData.servers + 'listApi.php',
      data: {
        method: 'comment',
        user_id: user_id,
        content: e.detail.value.content,
        pub_id: pub_id
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '表单不能为空',
            // icon: 'warn',
            duration: 2000
          });
        }

      },
      fail: function (res) {
        console.log(res)
      }
    })
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  // 播放声音
  playVoice: function (e) {
    var that = this;
    // console.log(e.currentTarget.dataset.url);
    var url = e.currentTarget.dataset.url;
    wx.downloadFile({
      url: url,
      success: function (res) {
        console.log(res);
        wx.playVoice({
          filePath: res.tempFilePath,
          success: function () {
            that.setData({
              playing: true
            })
          }
        })
      }
    })

  },
  // 停止录音
  stopVoice: function () {
    wx.stopVoice();
    this.setData({
      playing: false
    })
  }
})