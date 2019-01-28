# Ionic Android

see more from: https://yipeng.info/p/58aededee78659dd0b37f5c2

## 准备

1. 安装 JDK，在该[地址](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)选择对应的版本下载即可，当然，最后还是跑 CSDN 上去下载了。安装好后，配置环境变量(JAVA_HOME)，并加入到 path 即可(%JAVA_HOME%/bin)

2. 安装 ADT, 打开 SDK Manager 并配置好代理服务器，勾选需要用到的工具有

   - Android SDK Platform-tools（平台）
   - Android SDK Build-tools（编译）
   - API(23): SDK Platform（编译依赖版本）
   - Android Support Repository（corrswalk 需要）
   - Google Repository（corrswalk 需要）
   - 设置国内镜像代理为：http://www.androiddevtools.cn/

3. 配置好 Android 开发环境:[参考](http://www.cnblogs.com/zoupeiyang/p/4034517.html)，主要是一系列的环境变量得配置
4. 注意:这里并没有说到要安装 ant ，主要原因是 ionic/cordova cli 在初次运行时若检测到没有安装，则会自动安装，不过安装过程还真是折腾，有一次挂了一网上都没有结果，第二天开个 VPN 才接着开始下。

## 流程

- 打开 Android SDK Manager，会自动检查更新，正常情况下是无法成功的，因为你无法跨域，所以，你最好设置代理服务器。[androiddevtools.cn/](http://www.androiddevtools.cn/) 上有需要的代理服务器，注意设置端口

## 环境变量

主要有以下所述几个

```bash
JAVA_HOME:C:\Program Files\Java\jdk1.8.0_65

_JAVA_OPTIONS:-Xmx512M

ANDROID_HOME:C:\Users\path\to\adt-bundle-windows-x86-20131030\sdk

ANDROID_PLATFORM_TOOLS:%ANDROID_HOME%\platforms

ANDROID_TOOLS:%ANDROID_HOME%\tools

ANT_HOME:C:\Users\path\to\apache-ant-1.9.5-bin\apache-ant-1.9.5
ClASSPATH:.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;C:\Users\path\to\apache-ant-1.9.5-bin\apache-ant-1.9.5\lib

Path:C:\ProgramData\Oracle\Java\javapath;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;%ANDROID_HOME%;C:\Users\path\to\apache-ant-1.9.5-bin\apache-ant-1.9.5\bin;C:\Users\path\to\adt-bundle-windows-x86-
20130917.467161976\adt-bundle-windows-x86-20130917\sdk\tools;C:\Users\path\to\adt-bundle-
windows-x86-20130917.467161976\adt-bundle-windows-x86-20130917\sdk\platform-tools;

```

## Android 依赖

使用 _SDK Manager.exe_ 进行安装，装完之后的大小为：4.2G，高版本向低版本兼容，没必要一次装几个版本

- Android SDK Tools
- Android SDK Platform-tools
- Android SDK Build-tools
- Android API
  - SDK Platform
  - TV/Wear SDK（可以不装，卸载掉就行）
- Extra
  - Android Support Repository

## Android 查看 sha1

### CMD

Android 开发 app 时，必须使用 keystore 进行签名，否则应用将无法安装在手机等设备上  
链接： http://jingyan.baidu.com/album/a3f121e4dece5ffc9052bbd9.html?picindex=1

1. 进入 `C:\Program Files\Java\jdk1.8.0_65\bin`
2. 运行命令 `keytool -list -keystore C:/Users/YOUR_USER_NAME/.android/debug.keystore -storepass android`

### Eclipse

打开 eclipse，走以下路径可以找到
`window -> preference -> Android -> build -> sha1`

## Android 签名

生成命令

```bash
# 使用 keytool 生成安全钥匙和证书
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
# 编译生成 Apk 包
cordova build --release android
# JAR 文件签名和验证
./jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk your_key
# 对打包的 Android 应用程序进行优化
zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk

```

### 使用 360 加固签名

这个时候，首先需要生成无签名的包，若包已签名则会报错，ionic 可以直接敲入命令`ionic build android -release`来生成：

```bash
自签名失败：jarsigner 无法对 jar 进行签名 java.util.zipexception
```

## ERROR List

- [unable to find attribute android:fontVariationSettings and android:ttcIndex](https://stackoverflow.com/questions/49162538/running-cordova-build-android-unable-to-find-attribute-androidfontvariation)

## 其它

### Gradle

从 Cordova-Android 6.4.0 开始, 必须安装 Gradle 才能 build Android，如果你使用的是 Windows, 需要将 Gradle 加到 path 中

## 参考

- [Ionic Android 应用 Release 指南](https://segmentfault.com/a/1190000002617037)
