// pages/chat.js
const request = require("../../utils/request");
function stringTrim(string){
    return string.replace(/\n\n/,"")
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: '',
        listHeight: 600,
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
                console.log(res)
                let searchItem = {
                    timestamp,
                    callback: stringTrim(res),
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
        }, {
            loading: true,
            message: '检索中,请稍等'
        })
    },
    bindInput(e){
        let key = e.currentTarget.dataset.key,
        value = e.detail.value;
        // console.log(key)
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
    getPageListHeight(){
        
        let querys = wx.createSelectorQuery();
        querys.select('.search-list').boundingClientRect()
        querys.exec((res) => {
          let item = res[0];
          // console.log(item)
          this.setData({
            listHeight: item ? item.height : 0
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

          this.getPageListHeight();
        })
      
    }
})