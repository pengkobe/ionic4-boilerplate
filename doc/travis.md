# Travis 基本使用

## 下载客户端

仓库地址: https://github.com/travis-ci/travis.rb

## 登录

travis login --github-token YOUR_TOKEN

## 单元测试

### xvfb

如果你选择语言为 nodejs，那么镜像会自带这个工具

## deploy

- https://docs.travis-ci.com/user/deployment
- 如何发布至 Github Release https://docs.travis-ci.com/user/deployment/releases/

### 上传至蒲公英

- https://www.pgyer.com/doc/view/travis_android
- https://www.pgyer.com/doc/view/travis_ios

## cocoapods

部分cordova 插件依赖于这个库，需要确保这个库已经安装，常见的安装方式有两种，一种是通过 `brew` 进行安装，一种是通过 `gem` 进行安装。

### 报错

- 提示版本不对: 注意镜像是否为 10.1
- 提示安装不成功，无法建立 link: [解决参考](https://stackoverflow.com/questions/37904588/cocoapods-not-installing/48335801#48335801)

### brew 安装

```bash
brew install cocoapods
pop setup
```

### gem 安装

```bash
mkdir -p $HOME/Software/ruby
export GEM_HOME=$HOME/Software/ruby
gem install cocoapods
gem installed
export PATH=$PATH:$HOME/Software/ruby/bin
pod --version
```

### github token 生成

`travis encrypt YOUR_GITHUB_RAW_TOKEN -r pengkobe/ionic4-boilerplate --add`

## 运行报错

- 无法成功安装 `oracle-java8-installer`,android 语言自带有 JDK，实际上无需安装
- error installing travis:ERROR: Failed to build gem native extension. 事实上在 windows 上生成的 enc 文件都是会报错的
- 加密多个文件时，必须得打包成一个文件进行加密，否则会报错！

## TDOO

- [ ] Storage 无法使用 `--prod` 选项
- [ ] 添加 IOS 证书/签名

## 参考

* https://github.com/samueltbrown/ionic-continuous-delivery-blog ,这篇文章年代有点久远，还是需要做一些修正才行
  - 文中对 XCode7+ iOS9 中的 App Transport Security 处理脚本其实不再需要了，默认就是设置为 true 了
  - update_xcconfig 那段也不需要了，高版本 Xcode 也已经默认移除了相关配置
* [为iOS建立Travis CI（史上最全版）](https://blog.csdn.net/qq_30817073/article/details/51719473) ,事实上还是比较全的