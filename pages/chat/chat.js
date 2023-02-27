// pages/chat.js
const request = require("../../utils/request");


Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: '',
        footerHeight: 0,
        keywords: '',
        searchList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getFooterHeight();

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

    sendMessage(){
        let { keywords,searchList } = this.data;
        request.myRequest({
            url: '/send',
            data: {
                message: keywords
            },
            success: (res) => {
                let timestamp = new Date().valueOf();
                let searchItem = {
                    timestamp,
                    callback: res,
                    enter: keywords,
                    code: 200
                };
                this.setData({
                    searchList: [...searchList,searchItem]
                }, () => {
                    this.setData({
                        index: `id_${timestamp}`
                    })
                })
            },
            error: (error) => {
                console.log(error)
            }
        },true)
    },
    onInput(e){
        let key = e.currentTarget.dataset.key,
        value = e.detail.value;
        this.setData({
          [key]:value
        })
    },

    triggerToBottom(){
       let querys = wx.createSelectorQuery();
        querys.select('#scroll').boundingClientRect()
        querys.exec((res) => {
          let item = res[0];
          console.log(item)
          let {timestamp} = this.data.searchList[this.data.searchList.length - 1];
          this.setData({
            index: `id_${timestamp}`
          })
        })
    },

    getFooterHeight() {
        let querys = wx.createSelectorQuery();
        querys.select('.footer').boundingClientRect()
        querys.exec((res) => {
          let item = res[0];
          // console.log(item)
          this.setData({
            footerHeight: item ? item.height : 0
          })
        })
      
    }
})