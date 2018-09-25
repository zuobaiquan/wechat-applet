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



**微信小程序 view 视图层**

### **1.数据绑定**

WXML中的动态数据均来自对应Page的data。

#### 1.1简单绑定

数据绑定使用"Mustache"语法（双大括号）将变量包起来

```html
<view> {{ message }} </view>

Page({
  data: {
    message: 'Hello MINA!'
  }
})
```



#### 1.2组件属性(需要在双引号之内)

```html
<view id="item-{{id}}"> </view>
 
Page({
  data: {
    id: 0
  }
})
```



#### 1.3控制属性(需要在双引号之内)

```html
<view wx:if="{{condition}}"> </view>
 
Page({
  data: {
    condition: true
  }
})
```


#### 1.4关键字(需要在双引号之内)

true：boolean 类型的 true，代表真值。

false： boolean 类型的 false，代表假值。

```html
<checkbox checked="{{false}}"> </checkbox>

//特别注意：不要直接写 checked="false"，其计算结果是一个字符串，转成 boolean 类型后代表真值。
```


网易云音乐：http://music.163.com/api/personalized/djprogram

https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%E6%8E%A8%E8%8D%90-mv




