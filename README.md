# ionic4-boilerplate

boilerplate for ionic4  
migrate from : https://github.com/pengkobe/ionic-boilerplate

> I am working on it right now. please don't fork and clone! ☺

## 使用

```bash
git clone https://github.com/pengkobe/ionic4-boilerplate
cd ionic4-boilerplate
npm install
npm install -g commitizen
commitizen init cz-conventional-changelog --save --save-exact
```

## 支持项

> 部分参考自: https://github.com/pengkobe/reading-notes/issues/420

- [x] 开发流程与代码规范, see [README-dev-spec](./doc/code-spec.md)
  - git √
  - 实用工具 √
  - 持续集成 √
  - 部署
- [x] 运行环境介绍
- [x] 错误上报
- [x] http
- [x] 本地存储
- [x] 钩子( hooks )
- [x] 版本更新( apk )
- [x] 代码热更新
- [x] 目录结构支持从项目主目录相对定位
- [x] tslint 与 scsslint
- [x] 定义好目录结构
- [x] Angular 最佳实践自动检测
- [×] 支持多语言[中/英]
- [×] 集成 echarts ×
- [ ] 测试支持[单元测试/端到端测试]
- [ ] 远程推送
- [ ] 物理返回键双击退出
- [ ] 去除开机白屏等待
- [ ] 支持本地通知与远程通知
- [ ] Cordova 插件
- [ ] NGRX
- [ ] 技巧与工具( VSCODE、谷歌控制台等 )
- [ ] 主题( 换肤 )
- [ ] 常用组件
- [ ] 用户行为

## 运行环境介绍

本脚手架运行环境为( base on command: `ionic info`):

```bash
Ionic:

   Ionic Framework            : @ionic/angular 4.0.0-beta.13
   @angular-devkit/core       : 0.8.6
   @angular-devkit/schematics : 0.8.6
   @angular/cli               : 6.2.6
   @ionic/ng-toolkit          : not installed
   @ionic/schematics-angular  : not installed

Cordova:

   cordova (Cordova CLI) : 8.0.0
   Cordova Platforms     : android 7.0.0
   Cordova Plugins       : cordova-plugin-ionic-keyboard 2.1.3, cordova-plugin-ionic-webview 2.2.0, (and 4 other plugins)

System:

   NodeJS            : v8.9.1
   npm               : 5.5.1
   OS                : Windows 10
```

## 代码规范

代码规范与常见工具说明  
see: [code-spec](./doc/code-spec.md)

## 版本更新

支持 APK 版本更新与线上代码热更新  
see: [version-update](./doc/version-update.md)

## Cordova 插件

脚手架使用到的 Cordova 插件列表
see: [cordova-plugin](./doc/cordova-plugin.md)

## 国际化

基于 ngx-translate, see：https://github.com/ngx-translate/core

版本需要与 angular 对应的版本相匹配

```bash
npm install @ngx-translate/core@9.1.1 --save
npm install @ngx-translate/http-loader@2.0.1 --save
```

## NGRX

脚手架已集成 NGRX  
see: https://github.com/ngrx

## 钩子

位于文件夹 `hooks` 下, 可以写各个声明周期的钩子，目前包含的钩子有

- 020_remove_sass_from_platforms, 删除不必要的 sass 文件
- 010_update_config, 根据 package.json 中的版本号更新 config.xml
- 010_init_directories, 用于创建 plugins 与 platforms 文件夹

## 本地存储

使用 `@ionic/storage`，尽量不使用 localstorage，系统清内存时会被删掉

## 错误上报

基于 raven-js 上报错误信息至第三方平台。  
文档地址：https://docs.sentry.io/clients/javascript/

```bash
npm install raven-js --save
```

## 用户行为

基于 TalkingData 进行统计，Github 上有相应 Cordova 插件，需要在官网下载最新库文件，手动进行集成

- 官网：https://www.talkingdata.com/
- 集成文档: http://doc.talkingdata.com/posts/143

## 集成 echarts

see: https://golb.hplar.ch/2017/02/Integrate-ECharts-into-an-Ionic-2-app.html

## 技巧与工具( VSCODE、谷歌控制台等 )

see: [tools](./doc/tools.md)

## 常用组件

这里提供的常用组件有这些( 更多待开发 )

- 二维码扫描
- 日历，see: https://github.com/HsuanXyz/ion2-calendar

## 换肤

一个高大上的 App 肯定少不了换肤功能，但是 Ionic 已经足够好，已经帮我们实现大部分了，具体实现可以参考:  
https://ionicframework.com/docs/theming/

## 参考

https://github.com/marcoturi/ionic-boilerplate

## License

MIT@[yipeng.info](https://yipeng.info)
