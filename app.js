// app.js
App({
  async onLaunch() {
    // 使用 callContainer 前一定要 init 一下，全局执行一次即可
    wx.cloud.init()
    // 下面的请求可以在页面任意一处使用
    const result = await wx.cloud.callContainer({
      config: {
        env: 'prod-0gjuj5w334e8025e', // 微信云托管的环境ID
      },
      path: '/', // 填入业务自定义路径和参数，根目录，就是 / 
      method: 'GET', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': 'springboot-jd5j', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      }
      // dataType:'text', // 默认不填是以 JSON 形式解析返回结果，若不想让 SDK 自己解析，可以填text
    })
    console.log(result)
  }
})
