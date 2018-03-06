
# 阳光花艺公众号

- Email : whevether@qq.com
- 微博 : [@keep_wan](https://weibo.com/5530559065/profile)

## 简介
这是一个使用vue 写的阳光花艺公众号,有充值下单功能等'
## 线上地址
<p><a href="http://flowerweb.okbounty.com/" title="演示" rel="nofollow" target="_blank">在线演示地址</a></p>

## 演示动图
| 效果 |动图 | 🎉🎉 |
| :----:  | :----: | :----: |
| ![image1](https://github.com/whevether/yghy-wx/tree/master/screen/yghy.gif) 


## 主要功能
- [x] 花分类
- [x] 搜索花
- [x] 分享商品
- [x] 余额充值
- [x] 创建收货地址
- [x] 查询订单
- [x] 查询账单
- [x] 备注

## 开发环境 以及运行方法和一些常见问题
-  微信web开发者工具
-  @vue/cli 3.0.0 beta 1
- node version: 9.X
- yarn version: 1.3.2
- 在微信开发者后台配置js安全域以及支付授权目录.开发环境这个安全域不能是localhost.而是需要内网穿透的地址;而上线就填写正式的线上地址域名;  
- 1. 首先yarn serve 或npm serve运行  vue 的http服务;
- 2. 打开内网穿透ngrok,输入一个域名前缀,开发环境这个域名也就是你安全域的名字.
- 3. 打开微信web开发工具输入这个内网穿透的域名.前提是你的事服务号.并且有开发者权限才能调式;
- 4. 里面的http 以及wx jssdk 我都是封装成插件形式调用的; 可以直接  this.$http this.$wx这样调用;具体插件封装方法可以看我这么写的;
- 5. 常见的无法调用jssdk 或者无法调起支付.一般是微信配置jsddk 的参数时签名错误; 无法调起微信支付是因为微信的安卓跟ios 支付目录获取方式不一样.ios 是默认根目录下所有的.  安卓则是你在哪个目录调用就需要配置那个目录的路由路劲
- 6. 获取用户openID 需要用code 去跟后台交换openId;并且这个code 不能重复使用.有时间过期限制;

## Contact me
- Email : whevether@qq.com
- 微博 : [@p_prod](https://weibo.com/5530559065/profile)



