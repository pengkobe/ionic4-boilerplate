# fastlane

一个快速打包发布 app 的工具。

## 安装

```bash
ruby -v
fastlane --version
export LANG=en_US.UTF-8
```

需要依赖于插件 `fastlane-plugin-cordova`


### IOS

```bash
xcode-select --install
# Using RubyGems
sudo gem install fastlane -NV
# Alternatively using Homebrew
brew cask install fastlane
fastlane init
# to have your Fastfile configuration written in Swift (Beta)
fastlane init swift
```

## 证书管理

fastlane 提供了好几种证书管理的方式，非常方便团队协作，

### match

可以参考这篇文章（[setup-fastlane-match-for-ios](https://medium.com/@danielvivek2006/setup-fastlane-match-for-ios-6260758a9a4e)
）进行设置

### cert 与 sigh

可以方便你手动对证书进行管理

## 上传至蒲公英

参见[蒲公英官网教程](https://www.pgyer.com/doc/view/fastlane)

## 一些疑问

* [是否支持 windows](https://github.com/fastlane/fastlane/issues/3594)

## Cordova

有集成 Cordova 构建的插件 [fastlane-plugin-cordova](https://github.com/bamlab/fastlane-plugin-cordova)

## 参考

* [fastlane 官网](https://fastlane.tools/)
* [fastlane 官方文档](https://docs.fastlane.tools/)
* [automatic-ionic-and-ios-builds-with-jenkins-and-fastlane](https://www.3pillarglobal.com/insights/automatic-ionic-and-ios-builds-with-jenkins-and-f)

### demo 项目

* 基于 `match` 打包证书，然后上传至 hockeyapp，[ionic-fastlane-travisci-hockeyapp](https://github.com/tim-hoffmann/ionic-fastlane-travisci-hockeyapp)
* [ionic-fastlane](https://github.com/janpio/ionic-fastlane)
  * 集成 ionic fastlane 插件
  * 集成 appcenter 插件
  * 集成 cordova fastlane 插件
* IOS 构建示例： https://github.com/macoscope/ContinuousIntegrationExample
* 一个涵盖 travis fastlane Jenkins 等一个大杂烩 Repo， [qm-ionic-quantimodo](https://github.com/mikepsinn/qm-ionic-quantimodo/blob/master/fastlane/Fastfile)