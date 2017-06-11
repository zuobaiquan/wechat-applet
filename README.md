# 微信小程序


官网：https://mp.weixin.qq.com/cgi-bin/wx

```
wxml: 微信里面标记
		<view>   ->	类似div，直接用
		<text>   ->	放文字
		<image>
		<button>
wxss:  微信里面css，跟咱之前css一样
js:  也差不多

整个小程序公共文件
pages  ->  每个小程序页面
app.js
app.json
app.wxss
```
```
wx:if="true"

wx:for="数据"
	{{item}}	{{index}}

<view class="li" wx:for="{{arr}}" wx:key="{{index}}">
    {{item}}  {{index}}
</view>
```

[框架](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)   https://mp.weixin.qq.com/debug/wxadoc/dev/framework/structure.html

[组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)   https://mp.weixin.qq.com/debug/wxadoc/dev/component/

[API](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)  https://mp.weixin.qq.com/debug/wxadoc/dev/api/