# Cordova

[Cordova](https://cordova.apache.org/) 是一个开源的 APP 开发框架，让你可以使用 web 开发技术开发移动应用，同时，它还提供了一个完善的插件系统，让你可以使用原生系统所有的能力。
![cordovaapparchitecture](https://cordova.apache.org/static/img/guide/cordovaapparchitecture.png)

## ionic-native

[ionic-native](https://ionicframework.com/docs/native/) 对 cordova 插件进行了封装，便于你在 ionic 应用中使用 cordova 插件，当然，它支持也不是很全面，无法囊括现有的所有插件，如有需求，你可以封装自己的 native 插件，官方提供了完善的[教程](https://github.com/ionic-team/ionic/blob/master/.github/CONTRIBUTING.md)，一步一步来即可。

需要注意的是，升级到 ionic4 后，相比之前的使用方式有少量更改，需要在插件后方添加 `ngx` 后缀，如

```js
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@ionic-native/three-dee-touch/ngx';
```

## 插件集成

一般情况下，你都不需要对插件进行多大改动，只需要引入进来，直接按照其公布的 API 使用即可，只不过插件系统需要与原生平台有着千丝万缕的联系，Cordova CLI 也一直在进行升级，需要持续关注官方的更新，一般情况下，你直接关注[官方博客](https://cordova.apache.org/blog/)即可, 重大更新和插件升级，都会在博客中第一时间进行发布。这里列举几个发生过异常的插件，供异常排除参考。

### 错误排查实例( 远程推送 )

[jpush-phonegap-plugin](https://github.com/jpush/jpush-phonegap-plugin)， 极光推送插件（测试环境为 Android），用于接收服务端推送，使用以下脚本安装，

```bash
cordova plugin add jpush-phonegap-plugin --variable APP_KEY=your_jpush_appkey
npm install --save @jiguang-ionic/jpush
```

这个插件在安装之后，没有异常提示，一切安好，就是死活收不到通知，在极光开发者后台管理界面推送也无法到达，显示并没有注入成功。  
这个时候就得使用 Android Studio 进行调试了，这时候就可以看到原生代码报错信息 **获取sdk版本失败!**

```
No implementation found for int cn.jiguang.service.Protocol.GetSdkVersion() (tried Java_cn_jiguang_service_Protocol_GetSdkVersion and Java_cn_jiguang_service_Protocol_GetSdkVersion__)
03-28 10:55:42.345 19227-19335/com.tomatobang.ionic E/JIGUANG-JCore: [JCoreGlobal] Get sdk version fail![获取sdk版本失败!]
```

最简单的办法，就是直接复制报错信息去 Google 和 Github 搜索，如果都没有遇到，那你得小心了，因为报错不一定与真实的原因相符，这时候，你可以按照以下步骤进行排查

1. 排除是 cordova-android 升级导致的，我们知道 cordova-android7.x 和之前的版本有较大的变化，项目文件夹都变了，而插件中 `plugin.xml` 中指定的打包路径可能还没更新，那么就会有问题
2. 去 ISSUE 提问，需要 @ 维护者，尽量提供详细的报错信息、运行环境信息，必要时提供复现 bug 的小 demo
3. 翻看最近更新内容和 ISSUE 列表，或许你可以找到些灵感
4. 直接调试原生代码
   - 要求熟悉 Android 项目结构，包括代码结构和各个配置文件的作用
   - 知道如何引入和安装第三方库
   - 懂一些 Java 代码

经过排查，最终发现是 jnlibs 文件夹中的 .so 文件并没有放置到指定路径，手动拷贝后就能够成功推送了，参考 [issue](https://github.com/jpush/jpush-phonegap-plugin/issues/339)

### 插件改造实例( 百度推送 )

我们这里使用的百度定位插件 [cordova-plugin-baidumaplocation](https://github.com/aruis/cordova-plugin-baidumaplocation) 只能提供给一个定位，而我们需要的是一个可以选择的周边位置列表，由此，我们知道这个插件无法满足我们的需求，从而需要对该插件进行改造，这里以改造 Android 插件为例，具体步骤如下

1. 查阅百度地图官方 Android SDK API 发现有提供周边位置列表的接口 `getPoiList`
2. 查阅 cordova-plugin-baidumaplocation 插件 java 代码，知道插件实现的基本逻辑
3. 改造代码
4. 在 Android Studio 上调试运行

### 从 0 创造插件示例( 集成小米、华为推送 )

在这里不做赘述，具体可以参考我开发的 [nxtpush-cordova-plugin](https://github.com/pengkobe/nxtpush-cordova-plugin) 插件，之前我也做过一些[记录](https://yipeng.info/p/5923df0f5713a3b321bf2f17)。具体如何开发一个 cordova 插件，官方也有[详细的介绍](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html)，具体以官网为准。

> 需要注意的事，插件维护起来是比较麻烦的，官方 SDK 升级你得跟进升级，不然你可能会遇到 Android 版本升级不能运行了或者接口对不上了等等


## 错误集锦（持续更新）

这里放些平常比较常见的错误，供查阅。

```bash
Terminating app due to uncaught exception 'NSUnknownKeyException', reason: '[<WKWebViewConfiguration 0x7fb1d960cd00> setValue:forUndefinedKey:]: this class is not key value coding-compliant for the key _requiresUserActionForMediaPlayback
```

解决办法: [Not working iOS](https://github.com/katzer/cordova-plugin-background-mode/issues/406)

```bash
app due to uncaught exception 'NSInvalidArgumentException', reason: '*** -[NSURL URLByAppendingPathComponent:isDirectory:]: component, components, or pathExtension cannot be nil.'
```

解决办法: [iOS crash when loading the plugin](https://github.com/nordnet/cordova-hot-code-push/issues/128)

```bash
error: resource android:attr/fontVariationSettings not found
```

解决办法: https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview/issues/205#issuecomment-371669478

```bash
not allowed to load local resources
```

解决办法: 这是因为 [webview](https://www.npmjs.com/package/cordova-plugin-ionic-webview) 插件升级导致的 bug，以前使用 `file://` 开头访问文件的方法得进行转换才能访问了，`window.Ionic.WebView.convertFileSrc()`
