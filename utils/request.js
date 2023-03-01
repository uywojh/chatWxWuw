const config = require('../config/index.js');
const {httpUrl,apiVersion} = config;
const myRequest = (options,loadigMsgOptions = {
  loading: true,
  message: '正在加载,请稍等'
}) =>{
  try {
    var token = wx.getStorageSync('token')
    request({
      ...options,
      ...{
        token
      }
    },loadigMsgOptions)
  } catch (e) {
    console.log(e)
  }
}

const request = (options,loadigMsgOptions) => {
    let {
      method,
      url,
      data,
      success,
      error,
      header,
      complete,
      token,
    } = options;
    let { loading, message } = loadigMsgOptions;
    //设置默认数据传数格式
    let methonType = (header && header['content-type']) || "application/json";
    let methods = method || 'GET'
    //判断请求方式
    if (methods === 'PUT') {
      let p = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      }).join("&");
      url += '?' + p;
      data = {}
    }
  
    if (methods == "post") {
      methonType = "application/x-www-form-urlencoded"
    }
    
    if (wx.request) {
      if(loading) wx.showLoading({title: message});
      let header = {
        'content-type': methonType,
        'api-version': apiVersion,
        'platform': 'wx',
        "token": token
      };
      //开始正式请求
      wx.request({
        url: httpUrl + url,
        method: methods,
        header: header,
        data,
        //成功回调
        success: (res) => {
          let {code,data} = res.data;
          if(code === 200){
            success(data)
          }
        },
        //错误回调
        fail(res) {
            console.log(res);
          //检测是否传参errorData，如果有则执行回调errorData(res)
          if (error) {
            error(res)
          }
        },
        //检测是否传参completeData，如果有则执行回调completeData(res)
        complete(res) {
          if(loading){
            wx.hideLoading({
              fail:function(e){
                // console.log(e)
              }
            });
          }
          if (complete) {
            complete(res)
          }
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样提示
      wx.alert({
        title: '提示',
        content: '当前微信版本过低，无法使用此功能，请升级最新版本微信'
      });
    }
}

module.exports = {
    myRequest
}