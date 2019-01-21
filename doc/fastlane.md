# fastlane

一个快速打包发布 app 的工具， 能够大大提高开发人员的打包发布效率，你要是人工去整这些东西，非常容易出错，而且搞一次还得花不少时间。

## IOS 构建

### Mac 本地安装

```bash
xcode-select --install
# Using RubyGems
sudo gem install fastlane -NV
# Alternatively using Homebrew
# brew cask install fastlane
fastlane init
# to have your Fastfile configuration written in Swift (Beta)
fastlane init swift
```

### 证书管理

fastlane 提供了好几种证书管理的方式，非常方便团队协作，如: 

#### 手动导入证书

若你直接将证书加密放到仓库下，可以直接通过解压导入, 比如，本项目证书放置在 `sh/release/certificates` 文件夹下，可以解压后再导入  

解压（代码位于 `sh/release/decrypt-key.sh`）

```bash
#!/bin/sh

if [[ -z "$PROFILE_NAME" ]]; then
    echo "Error: Missing provision profile name"
    exit 1
fi

if [[ ! -e "./sh/release/certificates.tar.enc" ]]; then
    echo "Error: Missing encrypted certificates."
    exit 1
fi
openssl aes-256-cbc -K $encrypted_28b1957c839b_key -iv $encrypted_28b1957c839b_iv -in ./sh/release/certificates.tar.enc -out ./sh/release/certificates.tar -d
tar xvf ./sh/release/certificates.tar -C ./sh/release/certificates

```

fastlane 导入脚本

```bash
    # Import distribution certificate
    import_certificate(
      certificate_path: "sh/release/certificates/ios_distribution.p12",
      certificate_password: ENV["KEY_PASSWORD"],
      keychain_name: keychain_name,
      keychain_password: keychain_password
    )

    # Import push certificate
    import_certificate(
      certificate_path: "sh/release/certificates/ios_push_distribution.p12",
      certificate_password: ENV["KEY_PASSWORD"],
      keychain_name: keychain_name,
      keychain_password: keychain_password
    )
```

#### match

match 可以自动为你选择需要的证书，这也是官方推荐的方式，你只需要将你所有团队的所有证书统一一个仓库进行管理就 ok。  
可以参考这篇文章（[setup-fastlane-match-for-ios](https://medium.com/@danielvivek2006/setup-fastlane-match-for-ios-6260758a9a4e)
）进行设置

#### cert 与 sigh

可以方便你手动对证书进行管理。

- cert 可以自动帮你下载或者生成 `Certificates` ，**不要用于 第三方 CI 机器**
- sign 可以自动帮你下载 `Provisioning Profiles`

## 插件

使用到三个插件

- 集成 Cordova 构建的插件，[fastlane-plugin-cordova](https://github.com/bamlab/fastlane-plugin-cordova)
- [fastlane-plugin-ionic](https://github.com/janpio/ionic-fastlane)
- fastlane-plugin-pgyer

## 上传至蒲公英

参见[蒲公英官网教程](https://www.pgyer.com/doc/view/fastlane)

## 一些疑问

- [是否支持 windows?](https://github.com/fastlane/fastlane/issues/3594)，答案是`不支持`

## 参考

- [fastlane 官网](https://fastlane.tools/)
- [fastlane 官方文档](https://docs.fastlane.tools/)
- [automatic-ionic-and-ios-builds-with-jenkins-and-fastlane](https://www.3pillarglobal.com/insights/automatic-ionic-and-ios-builds-with-jenkins-and-f)

### demo 项目

- 基于 `match` 打包证书，然后上传至 hockeyapp，[ionic-fastlane-travisci-hockeyapp](https://github.com/tim-hoffmann/ionic-fastlane-travisci-hockeyapp)
- IOS 构建示例（基于 fastlane sigh）： https://github.com/macoscope/ContinuousIntegrationExample
- 一个涵盖 travis fastlane Jenkins 等一个大杂烩 Repo， [qm-ionic-quantimodo](https://github.com/mikepsinn/qm-ionic-quantimodo/blob/master/fastlane/Fastfile)