// pages/publish/tabBar.js
var util = require('../../utils/util.js');
var playTimeInterval;
var recordTimeInterval;
var app = getApp();
Page({
  data: {
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00:00',
    formatedPlayTime: '00:00:00',
    server: app.globalData.servers
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options);
    var that = this;
    that.setData({
      name: options.name,
      longitude: options.longitude,
      latitude: options.latitude
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },
  onUnload: function () {
    // 页面关闭
  },

  // 表单提交的时候
  formSubmit: function (e) {
    var value = e.detail.value;
    var that = this;

    console.log(value.menu);
    if (value.menu == 1) {
      wx.request({
        url: app.globalData.servers + 'publishApi.php',
        data: {
          method: 'character',
          id: app.globalData.id,
          content: value.content,
          longitude: that.data.longitude,
          latitude: that.data.latitude,
          city: app.globalData.oriCity
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
            wx.navigateBack();
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

    } else if (value.menu == 2) {
      console.log(this.data.tempFilePath);
      wx.uploadFile({
        url: app.globalData.servers + 'uploadApi.php',
        filePath: that.data.tempFilePath,
        name: 'filePath',
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function (res) {
          // that.setData({
          //   sound_url: res.data
          // });
          wx.request({
            url: app.globalData.servers + 'publishApi.php',
            data: {
              method: 'voice',
              id: app.globalData.id,
              sound_url: res.data,
              longitude: that.data.longitude,
              latitude: that.data.latitude,
              city: app.globalData.oriCity
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
                wx.navigateBack();
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
        }
      })
    } else if (value.menu == 3) {
      wx.request({
        url: app.globalData.servers + 'publishApi.php',
        data: {
          method: 'picture',
          id: app.globalData.id,
          content: value.content,
          img_url: that.data.img_url,
          longitude: that.data.longitude,
          latitude: that.data.latitude,
          city: app.globalData.oriCity
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
            wx.navigateBack();
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
    }



  },

  // 选择图片
  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        wx.uploadFile({
          url: app.globalData.servers + 'uploadApi.php',
          filePath: tempFilePaths[0],
          name: 'filePath',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            that.setData({
              img_url: res.data
            });
            console.log(res.data);

          }
        })
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },


  // 开始录音
  startRecord: function () {
    this.setData({ recording: true });
    var that = this;
    recordTimeInterval = setInterval(function () {
      var recordTime = that.data.recordTime += 1
      that.setData({
        formatedRecordTime: util.formatTime(that.data.recordTime),
        recordTime: recordTime
      })
    }, 1000);
    wx.startRecord({
      success: function (res) {
        that.setData({
          hasRecord: true,
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.formatTime(that.data.playTime)
        })
      },
      complete: function () {
        that.setData({ recording: false });
        clearInterval(recordTimeInterval);
      }
    })
  },

  // 停止录音
  stopRecord: function () {
    wx.stopRecord()
  },

  stopRecordUnexpectedly: function () {
    var that = this
    wx.stopRecord({
      success: function () {
        console.log('停止播放成功')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        })
      }
    })
  },
  // 播放声音
  playVoice: function () {
    var that = this
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: function () {
        if (that.data.playTime < that.data.recordTime) {
          playTimeInterval = setInterval(function () {
            var playTime = that.data.playTime + 1;

            console.log('播放', playTime)
            that.setData({
              playing: true,
              formatedPlayTime: util.formatTime(playTime),
              playTime: playTime
            })
            if (that.data.playTime >= that.data.recordTime) {
              clearInterval(playTimeInterval);
            }
          }, 1000)
        }
      },
      complete: function () {
        clearInterval(playTimeInterval)
        var playTime = 0
        console.log('播放完毕')
        that.setData({
          playing: false,
          formatedPlayTime: util.formatTime(playTime),
          playTime: playTime
        })
      }
    })
  },
  // 清除录音
  clear: function () {
    clearInterval(playTimeInterval)
    wx.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    })
  }
})