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

## 上传至蒲公英

https://www.pgyer.com/doc/view/fastlane

## 一些疑问

* [是否支持 windows](https://github.com/fastlane/fastlane/issues/3594)

## 参考
* https://fastlane.tools/
* https://docs.fastlane.tools/
* https://www.3pillarglobal.com/insights/automatic-ionic-and-ios-builds-with-jenkins-and-f

### demo 项目

* https://github.com/tim-hoffmann/ionic-fastlane-travisci-hockeyapp
* https://github.com/janpio/ionic-fastlane
* https://github.com/mikepsinn/qm-ionic-quantimodo/blob/master/fastlane/Fastfile