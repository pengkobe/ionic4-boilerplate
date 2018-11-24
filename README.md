# ionic4-boilerplate

[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]

[travis-image]: https://img.shields.io/travis/pengkobe/ionic4-boilerplate.svg?style=flat-square
[travis-url]: https://travis-ci.org/pengkobe/ionic4-boilerplate
[david-image]: https://img.shields.io/david/pengkobe/ionic4-boilerplate.svg?style=flat-square
[david-url]: https://david-dm.org/pengkobe/ionic4-boilerplate

boilerplate for ionic4  
migrate from : https://github.com/pengkobe/ionic-boilerplate

> I am working on it right now. please don't fork and clone! ☺

## 使用

```bash
git clone https://github.com/pengkobe/ionic4-boilerplate
cd ionic4-boilerplate
npm install
# git commit tool
npm install -g commitizen
commitizen init cz-conventional-changelog --save --save-exact
```

## 支持项

- [x] 运行环境介绍
- [x] 开发流程
  - [x] git
  - [x] 测试
  - [x] 代码规范
  - [x] 工具集成
  - [ ] 部署
- [x] 版本更新( apk )
- [x] 支持多语言[中/英]
- [x] http
  - [x] rebirth-http
- [x] 本地存储
  - [x] rebirth-storage
- [x] 钩子( hooks )
- [x] 支持主目录相对定位
- [x] tslint 与 scsslint
- [x] 定义好目录结构
- [x] 集成 echarts
- [x] 去除开机白屏等待
- [x] 物理返回键双击退出
- [x] 错误上报
- [x] NGRX
  - [x] TODO Demo
- [x] 主题切换示例
- [x] 常用组件
  - [x] 二维码扫描
  - [x] 日历组件
- [x] PWA
- [x] Cordova 插件说明与示例
  - [x] 断网检测
  - [x] 本地通知
  - [x] 远程推送
- [x] 用户行为统计
- [x] 技巧与工具分享

## 运行环境介绍

本脚手架运行环境为( base on command: `ionic info`):

```bash
Ionic:

   Ionic Framework            : @ionic/angular 4.0.0-beta.15
   @angular-devkit/core       : 0.8.6
   @angular-devkit/schematics : 0.8.6
   @angular/cli               : 6.2.6
   @ionic/ng-toolkit          : not installed
   @ionic/schematics-angular  : not installed

Cordova:

   cordova (Cordova CLI) : 8.0.0
   Cordova Platforms     : android 7.1.4
   Cordova Plugins       : cordova-plugin-ionic-keyboard 2.1.3, cordova-plugin-ionic-webview 2.2.0, (and other plugins)

System:

   NodeJS            : v8.9.1
   npm               : 5.5.1
   OS                : Windows 10
```

## 开发流程

see: [code-spec](./doc/code-spec.md)

## 版本更新

支持 APK 更新与线上代码热更新  
see: [version-update](./doc/version-update.md)

## 支持多语言[中/英]

基于 ngx-translate  
see：https://github.com/ngx-translate/core

版本需要与 angular 对应的版本相匹配

```bash
npm install @ngx-translate/core@10.0.2 --save
npm install @ngx-translate/http-loader@3.0.1 --save
```

## http

基于 rebirth-http 进行开发，可以大大节省开发工作量和代码维护难度。

## 本地存储

- 结合 rebirth-storage 实现，支持了 localstorage 和内存两种方式
- 使用 `@ionic/storage`，尽量不使用 localstorage，系统清内存时会被删掉

## 钩子

位于文件夹 `hooks` 下, 可以写各个声明周期的钩子，目前引进的钩子有

- `020_remove_sass_from_platforms`, 删除不必要的 sass 文件
- `010_update_config`, 根据 package.json 中的版本号更新 config.xml
- `010_init_directories`, 用于创建 plugins 与 platforms 文件夹

## 支持主目录相对定位

通过在 tsconfig.json 中增加配置可以解决

```
  "baseUrl": "./src/",
    "paths": {
      "@app/env": ["environments/environment"],
      "@components/*": ["app/components/*"],
      "@services/*": ["app/services/*"],
      "@modals/*": ["app/modals/*"],
      "@directives/*": ["app/directives/*"],
      "@pipes/*": ["app/pipes/*"],
      "@app/*": ["app/*"],
      "@root/*": ["./*"],
      "echarts": ["../node_modules/echarts/dist/echarts.min.js"]
    }
```

## tslint 与 scsslint

详情参见项目目录下 `tslint.json` 与 `.scss-lint.yml`

## 定义好目录结构

按照职能进行区分，增加 share 与 core 等文件夹存放公有的模块和服务。

## 集成 echarts

脚手架已集成 echarts  
see: https://golb.hplar.ch/2017/02/Integrate-ECharts-into-an-Ionic-2-app.html

## 去除开机白屏等待

在 config.xml 中替换 Splash Screen 相关配置为如下:

```bash
<preference name="FadeSplashScreenDuration" value="300" />
<preference name="SplashShowOnlyFirstTime" value="false" />
<preference name="SplashScreen" value="screen" />
<preference name="SplashScreenDelay" value="3000" />
<preference name="AutoHideSplashScreen" value="false" />
<preference name="FadeSplashScreen" value="false" />
<preference name="ShowSplashScreen" value="true" />
```

## 物理返回键双击退出

详情参见源代码下 `src/app/app.component.ts` 下方法 `registerBackButtonAction`

## 错误上报

基于 raven-js 上报错误信息至第三方平台。  
文档地址：https://docs.sentry.io/clients/javascript/

```bash
npm install raven-js --save
```

## NGRX

脚手架已集成 NGRX  
see: https://github.com/ngrx

## 主题切换示例

参见代码

## 常用组件

这里提供的常用组件有这些( 更多待开发 )

- [x] 二维码扫描
- [x] 日历

## PWA

集成教程可以参见:  
https://www.joshmorony.com/create-a-pwa-with-angular-service-workers-in-ionic-4/  
需要注意的是，ionic4 目前是基于 Angular6 进行开发，所以安装时需要指定之前的版本

```bash
ng add @angular/pwa@0.8.7 --project app
```

可以参见 issue: https://github.com/angular/angular-cli/issues/12914

## Cordova 插件说明与示例

脚手架使用到的 Cordova 插件列表  
see: [cordova-plugin](./doc/cordova-plugin.md)

## 用户行为统计

### 方案 1

基于 TalkingData 进行统计，Github 上有相应 Cordova 插件，需要在官网下载最新库文件，手动进行集成

- 官网：https://www.talkingdata.com/
- 集成文档: http://doc.talkingdata.com/posts/143
- Cordova 插件模板: https://github.com/TalkingData/AppAnalytics_SDK_Cordova

### 方案 2

- 基于 微软的 [appcenter-sdk-cordova](https://github.com/Microsoft/appcenter-sdk-cordova)
- 官网: https://appcenter.ms/
- 文档: https://docs.microsoft.com/en-us/appcenter/sdk/analytics/cordova

## 技巧与工具

see: [tools](./doc/tools.md)

## License

MIT@[yipeng.info](https://yipeng.info)
