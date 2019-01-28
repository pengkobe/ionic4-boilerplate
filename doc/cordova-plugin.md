# Cordova 插件

## build errors

- [error: resource android:attr/fontVariationSettings not found](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview/issues/205#issuecomment-371669478)

## ionic-native

参见官方文档( v4 已经正式上线了)：  
https://ionicframework.com/docs/native/

## 远程推送

jpush-phonegap-plugin, see: https://github.com/jpush/jpush-phonegap-plugin

```bash
cordova plugin add jpush-phonegap-plugin --variable APP_KEY=your_jpush_appkey
npm install --save @jiguang-ionic/jpush
```

### 社交分享

cordova-plugin-wechat

### 定位

cordova-plugin-baidumaplocation

## 错误集锦

这里放些平常比较常见的错误，供查阅。

```bash
Terminating app due to uncaught exception 'NSUnknownKeyException', reason: '[<WKWebViewConfiguration 0x7fb1d960cd00> setValue:forUndefinedKey:]: this class is not key value coding-compliant for the key _requiresUserActionForMediaPlayback
```

解决办法: [Not working iOS](https://github.com/katzer/cordova-plugin-background-mode/issues/406)

```bash
app due to uncaught exception 'NSInvalidArgumentException', reason: '*** -[NSURL URLByAppendingPathComponent:isDirectory:]: component, components, or pathExtension cannot be nil.'
```

解决办法: [iOS crash when loading the plugin](https://github.com/nordnet/cordova-hot-code-push/issues/128)

### android

```bash
not allowed to load local resources
```

解决: 这是因为 [webview](https://www.npmjs.com/package/cordova-plugin-ionic-webview) 插件升级导致的 bug，以前使用 `file://` 开头访问文件的方法得进行转换才能访问了，`window.Ionic.WebView.convertFileSrc()`  
