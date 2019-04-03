# IOS

## 账号类型

- 个人开发者账号
  - 用于个人开发者上传和发布应用，在 apptore 上显示个人开发者信息。
  - 只能有一个开发者
  - 100 个 IOS 设备 UDID 测试
  - 不需要邓白氏码
- 团体账号
  - 用于团体、公司开发者上传和发布应用，在 apptore 上显示团体名称。
  - 允许多个账号管理；
  - 100 个 IOS 设备 UDID 测试
  - 需要邓白氏码
- 公司账号
  - 用于公司发布应用，使用该证书的应用不需要审核
  - 不能上传到 appstore；
  - 无 IOS 设别 UDID 数量限制
  - 需要邓白氏码
- 教育账号
  - 不能对外正式发布应用
  - 需要苹果特批

### 申请团体账号

1. 申请邓白氏码[DUNS]。苹果可以免费申请
2. 收到 DUNS 号之后，继续完善公司信息
3. 我们申请的时候是英文信息，如果需要显示中文公司名怎么办? 我们可以向苹果公司发送邮件，申请修改公司名，但是修改的机会只有一次，确认无误后，即可在 appstore 显示中文公司信息。

## 环境搭建

相比 android 而言，IOS 开发环境的搭建相对来说还是比较简单的，装好最新版 XCODE 就足以，当然，为了能够真机测试，你还得有苹果开发者账号才行，而且需要根据指引配置下开发证书

### 指令集与兼容性

#### Base SDK

当前编译用的 sdk 版本

#### Deployment Target

编译出的程序将在哪个系统版本上运行，xcode8.0 之后最低版本只能选择 8.0，可以手动添加更低版本。为了最大程度的兼容，应用的 deployment target 决定了应用所能工作的设备系统的最低版本。关于如何支持 7.0 及更低版本可以参考资料 [Xcode8 配置 Deployment Target 支持7.0及更低版本](http://www.jianshu.com/p/9beb55f23839)。

兼容性设置：Base SDK 选择 lastest IOS。Deployment Target 选择你所支持的最低版本。
不同指令集的对应关系：

1. armv6， 支持的机器 iPhone， iPhone2， iPhone3G 及对应的 iTouch
2. armv7， 支持的机器 iPhone4， iPhone4S
3. armv7s， 支持的机器 iPhone5， iPhone5C
4. arm64， 支持的机器：iPhone5S

当前机型设置指令集 Architecture 有三种值可选：armv7、 armv7s、 arm64

#### Target VS Project

1. project 就是一个项目，或者说工程，一个 project 可以对应多个 target。
2. targets 之间完全没有关系。但 target 和 project 有关系，target 的 setting 会从 project settings 中继承一部分。project 主要包括通用的设置，比如 info 和 build setting，target 的设置表现的更加全面和具体！
3. Target 指定了哪些内容?
   - Build Phases
     - Target Dependencies， 某些 Target 可能依赖某个 Target 输出的值， 这里设置依赖
     - Copy Bundle Resources， 是指生成的 product 的 .app 内将包含哪些资源文件
     - Compile Sources， 是指将有哪些源代码被编译
     - Link Binary With Libraries， 是指编译过程中会引用哪些库文件
   - Info
     - 这个 Info.plist 文件内定义了一个 iPhone 项目的很多关键性内容， 比如程序名称，需要申请的权限列表等，最终生成 product 的全局唯一 id 等等.每一个 Target 都能设置不同的

#### appVersion VS build

第一次提交的版本是 1.0 这样子，然后 build 是 1.0.0，但是由于在审核前发现了 bug，需要重新提交一个包上去，这时比需要修改 build 的版本号，例如 1.0.1 这样子，保持 version 是 1.0。

### ios 证书

#### 在开发者中心配置 APP IDs

- Name：用来描述你的 AppId ，可以随便填，建议使用项目名称(不允许中文哦);
- Bundle ID( Explicit App ID )：这是你 appid 的后缀，这个需要仔细。因为这个内容和你的程序直接相关，后面很多地方要用到，规范的格式写法是 com.yourcompany.yourappname， 建议使用项目中的 Bundle ID
- Bundle ID(Wildcard App ID)：通配符 App ID，这种类型的 App ID 用来标识一组应用程序，例如，`com.yipeng.*` 可以用来标识 Bundle ID 为 com.yipeng.app1 和 com.yipeng.app2 等所有 Bundle ID 以 com.yipeng 开头的应用程序，需要注意的是如果你要使用推送服务，那么你要新建的这个新的 App ID 必须是 Explicit 类型的 App ID，这样儿，苹果的 Apns 才能识别到唯一的一个应用从而进行推送提醒，而不会出现所谓一呼百应的现象
- APP service：设置 app 需要那些服务，比如推送通知，苹果支付等。Push Notification 指远程通知，如果选择还需要进行相关配置才能生效！

##### 创建证书请求文件

1. 打开应用程序 --> 实用工具 --> 钥匙串访问
2. 在证书助理中，选择 `从证书颁发机构求证书`，填你申请 idp 的电子邮件地址，常用名称，默认就好，CA 电子邮件地址空，
3. 将证书存储到磁盘
4. 生成的 CertificateSigningRequest.certSigningRequest 的证书请求文件（ CSR 文件尽量每个证书都制作一次，将常用名称区分开来，因为该常用名称是证书中的密钥的名字）,目的就是生成了一对公钥和私钥，保存在我们电脑上的钥匙串中。代码的签名也就是使用这种基于非对称密钥的加密方式，用私钥进行签名，用公钥进行验证。  

#### 创建证书( Certificates )

证书，是我们进行真机调试与发布的第一步。

- Development，证书用来开发和调试应用程序
- Production，主要用来分发应用程序
- APNS，推送证书，同创建开发者证书制作，只是选择的项不一样，分别下载下述两个推送证书，双击打开，再在钥匙串中分别导出两个证书的 p12 文件，如果使用的是极光推送，则在极光推送应用后台设置里导入两个 p12 文件。

  ```bash
  development:Apple push notification services ssl
  production:apple push notification service ssl
  ```

直接选择我们上一步保存在桌面的 CertificateSigningRequest.certSigningRequest 的证书请求文件即可，提交上去后就会生成一个 cer 证书，有效期为一年.
点击 DownLoad，双击安装。（如果安装不上，可以直接将证书文件拖拽到钥匙串访问的列表中）.

#### Provisioning Profile

描述文件，专门用于将 Certificates、Identifiers、Devices 结合起来，形成一个描述证书、标示符的描述文件。Provisioning Profiles 放入我们的 xcode 中， xcode 知道我们的证书和哪些设备之类的信息相匹配。而且这个 Provisioning Profile 文件会在打包时嵌入.ipa 的包里。**有这个文件应用程序才能在设备上运行**，它也分为两类

- Development，在装有开发证书或副本的电脑上使用，开发人员选择该授权文件通过电脑将程序安装到授权文件记录的设备中，即可进行真机测试。需要确保电脑有权限真机调试，即安装了开发证书或副本；在开发工具中程序的 Bundle identifier 和选中使用的授权文件的 App Id 要一致，连接调试的设备的 UDID 在选中的授权文件中有记录。
- Distribution，开发者帐号创建授权文件时选择 store 选项，选择 App Id，无需选择 UDID

#### Keychain(开发密钥)

安装证书成功的情况下证书下都会生成 Keychain，上面提到的证书副本就是通过配置证书的电脑导出 Keychain（就是.p12 文件）安装到其他机子上，让其他机子得到证书对应的权限。Developer Certification 就可以制做副本 Keychain 分发到其他电脑上安装，使其可以进行真机测试。

> DistributionCertification 只有配置证书的电脑才可使用，因此即使导出导出 Keychain 安装到其他电脑上，其他电脑也不可能具有证书的权限。

## 发布

在 XCODE 菜单中点击 archive ，会打包成 ipa 文件，打包成功后，先 verify 再上传到苹果官网进行审核，填写资料虽然有点小麻烦，但是很有必要。具体流程这里就不赘述了，网上有附有截图的完整教程。

### Account 的配置

在 `Xcode -> Preferences` 下有 Account 的配置界面，点击 `+` 选择 `Add Apple ID` ，必须登录之后才能在 xcode 使用相应的 PP 文件。点击 View Details 可以查看该 Apple Id 下的 Certificates 和 Provisioning Profile 证书文件，在这里你可以点击下载。

### 项目的配置

配置位于项目 `TARGETS -> general` 的 Identity 中， Team 选择对应的 Apple ID 即可。记得改变 build 和 version 对应的版本号.

### 证书配置

1. 在 xcode 项目中，需要在相关的 project，targets 里都要配置合适的 profile 才可以。在 XCode 的项目设置里 `build settings -> Provisioning Profile` 就可以选择对应的证书。
2. 设置 code signing identity：全选择为发布者模式。很多时候会提示 app 已经被自动设置为开发者模式。这时候需要关闭自动模式，在 target 下的 general 下 的 signing 取消勾选，同时下面有 signing(Release) 表示发布，选择对应 pp 文件。

### Archive

1. `project -> scheme -> edit scheme -> build configuration` 选择 release 然后 executable 选择应用
2. 打包的时候，必须选择非模拟器 device，在真机状态下选择 Product-->Archive (如果不是真机状态下，Archive 会是灰色不可用的)；然后点击 validate 按钮，validate 通过之后在点击 Export 导出 ipa 的包用与上传即可。
3. 使用 xcode 上传到 app store，会有验证工作，此时 app 使用的 bundleID 在 iTunes connect 中我的 app 中必须有 app 的套装 ID 和他对应，否则会报错提示匹配不到。

### Itunes Connect 设置与提交审核

选择 Itunes Connect，进入后选择 `我的 App`，点击左上角的 + 选择 `新建 App`，根据自己的 app 然后填写相应的信息即可，注意事项：

- 选择语言的时候，简体中文是 `Simplified Chinese`
- 套装 ID 与 SKU 主要是 app 的唯一标识，建议使用项目中 Bundle Identifier，即 com.company.projectname
- 上传 App Icon 的时候，需要上传 `1024*1024`的，而且不能有圆角效果
- 这里需要不同屏幕的截图，可以直接用模拟机运行后截图，也可以让 UI 给你切图，模拟器菜单 `File -> Save Screen shot`，图片会自动保存在桌面，保存的分辨率和你选择的 Scale 有关，需要和手机分辨率一致，window -> Scale -> 选择 100%。
- 上传的时候会提示 `无法载入文件` 的问题。原因是：截图保存的文件名有中文，修改下截图名称即可
- 屏幕尺寸：4.7 英寸/iphone6 5.5 英寸/iphone 6 plus 4 英寸/iphone5S 3.5 英寸/ iPhone 4S
- 使用 xcode 或 application loader 上传软件包，成功之后，可以在 itunesconnect 活动中查看所有构建版本，当处理完成就可以在构建版本中 `加号` 选择上传的应用，然后提交审核


## Cordova

把以上内容配置好后，基本上环境就搭好了，可以结合 Ionic/Cordova Cli 对程序进行打包和发布。得益于我们使用的是 Web 技术，开发要处理的仅仅是 webview 的兼容性问题。当然，发布 IOS 头疼的问题还是审核和配置，具体还得按照流程一步一步来。

### 问题集锦( 持续更新 )

我之前也整理过一个 ISSUE 集锦，具体可以参考: 
- https://github.com/pengkobe/reading-notes/issues/433
- https://github.com/pengkobe/reading-notes/issues/268

#### Invalid Signature - A sealed resource is missing or invalid

www 目录下的文件名称不能为乱码

### 莫名问题审核不通过

这往往是权限说明没配好
> 需在 info.plist 配置好权限申请说明

```xml
<key>NSBluetoothPeripheralUsageDescription</key>
<string>App需要您的同意,才能使用蓝牙进行签到</string>
<key>NSCameraUsageDescription</key>
<string>App需要您的同意才能扫码识别设备和签到.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>App需要您的同意,才能在使用期间访问位置进行考勤和签到</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>App需要您的同意,才能在后台扫描 iBeacon 设备.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>App需要您的同意,才能在使用期间访问位置进行定位</string>
<key>NSMainNibFile</key>
<string></string>
<key>NSMainNibFile~ipad</key>
<string></string>
<key>NSMicrophoneUsageDescription</key>
<string>App需要您的同意,才能访问麦克风进行录音</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>App需要您的同意才能使用相册访问照片</string>
```
