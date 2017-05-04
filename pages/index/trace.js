// pages/index/trace.js
var util = require('../../utils/util.js')
var playTimeInterval
var recordTimeInterval
Page({
  data: {
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00:00',
    formatedPlayTime: '00:00:00'
  },
  onHide: function() {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
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
  stopRecord: function() {
    wx.stopRecord()
  },

  stopRecordUnexpectedly: function () {
    var that = this
    wx.stopRecord({
      success: function() {
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
        if(that.data.playTime < that.data.recordTime) {
            playTimeInterval = setInterval(function () {
              var playTime = that.data.playTime + 1;
              
              console.log('播放', playTime)
              that.setData({
                playing: true,
                formatedPlayTime: util.formatTime(playTime),
                playTime: playTime
              })
              if(that.data.playTime >= that.data.recordTime) {
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

  // pauseVoice: function () {
  //   clearInterval(playTimeInterval)
  //   wx.pauseVoice()
  //   this.setData({
  //     playing: false
  //   })
  // },
  // stopVoice: function () {
  //   clearInterval(playTimeInterval)
  //   this.setData({
  //     playing: false,
  //     formatedPlayTime: util.formatTime(0),
  //     playTime: 0
  //   })
  //   wx.stopVoice()
  // },
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



// Page({
//   data:{},
//   onLoad:function(options){
//     // 页面初始化 options为页面跳转所带来的参数
//   },
//   onReady:function(){
//     // 页面渲染完成
//   },
//   onShow:function(){
//     // 页面显示
//   },
//   onHide:function(){
//     // 页面隐藏
//   },
//   onUnload:function(){
//     // 页面关闭
//   },
//   chooseImg: function(){
//     var that = this;
//     wx.chooseImage({
//       count: 9, // 默认9
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {
//         that.setData({
//           tempFilePaths:res.tempFilePaths
//         })
//       }
//     })
//   },
//   getImageInfo:function(e){
//     var imgUrl = e.currentTarget.id;
//     var that = this;
//     wx.getImageInfo({
//       src: imgUrl,
//       success: function (res) {
//         that.setData({
//           info:"图片长度:"+res.height+"图片宽度:"+res.width
//         })
//       }
//     })
//   },

// })