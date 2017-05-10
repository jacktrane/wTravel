// pages/index/trace.js
Page({
  data:{
    showModalStatus: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  good:function() {

  },
  comment:function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '这是一个设定过全部属性模态弹窗',
      showCancel: true,
      confirmText: '好的',
      confirmColor: '#FF0000',
      cancelText: '算了',
      cancelColor: '#999999',
      success: function (res) {
        if (res.confirm) {
          // that.showToast;
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            success: function (res) {
              console.log("成功")
            },

          })
        } else {
          console.log('用户点击取消');
        }
      },
      fail: function () {
        console.log('接口调用失败');
      },
      complete: function () {
        console.log('接口调用结束')
      }
    })
  },
  
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
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
  }

})