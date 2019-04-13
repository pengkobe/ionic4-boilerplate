# 版本更新

## 基于 `cordova-hot-code-push-plugin` 插件热更新

[cordova-hot-code-push-plugin](https://github.com/nordnet/cordova-hot-code-push) 插件可以用来热更新包括不涉及到原生更改的内容，需要注意的是这个插件已经停维了。

### 插件安装

```bash
cordova plugin add cordova-hot-code-push-plugin
# Add plugin for local development( 本地开发调试用 )
cordova plugin add cordova-hot-code-push-local-dev-addon
# Install Cordova Hot Code Push CLI client
npm install -g cordova-hot-code-push-cli
# Start local server by executing:
cordova-hcp server
```

### 热更新构建步骤

```bash
# build 生成文件
npm run build --prod
# 生成 chcp.json 文件与 manifest.json 文件
cordova-hcp build
```

> 需要对 www/chcp.json 进行稍许更改，模板可以参考 version_update/chcp.json

修改完成后，将整个 `www` 内的内容上传至服务器，需要保证与 `config.xml` 中 `chcp` 下节点 `config-file` 配置的服务器路径的一致。  

```xml
<chcp>
    <config-file url="http://path/to//chcp.json" />
    <native-interface version="1" />
    <auto-download enabled="true" />
    <auto-install enabled="true" />
</chcp>
```

## APK 更新

此方法基于 json 文件中的配置进行检测，当然，你也可以通过在数据库中建表的方式解决。

```bash
ionic cordova build android --prod
```  

*注意：在 build apk 之前，先进行热更新构建*  

更新 `apk_version.json` 文件

```json
{
  "version": "0.1.1",
  "updateContent": "修复已知的若干 bug",
  "downloadUrl": "http://path/to/YOUR_APK_FILE_NAME.apk",
  "size": "36M",
  "datetime": "2019-01-14 21:45.01"
}

```

* 将生成的 apk 文件上传到 `downloadUrl` 对应的路径下。
* 将更新后的 `apk_version.json` 文件上传到 `src/services/update.service.ts` 文件里 `getServerVersion` 方法中请求地址匹配路径下

## 热更新插件 cordova-plugin-code-push

由于插件`cordova-hot-code-push-plugin` 已经停维，最好基于微软热更新插件 [cordova-plugin-code-push](https://github.com/Microsoft/cordova-plugin-code-push) 来进行热更新。

### 准备

* 使用 npm 命令全局安装 typescript、typings、tslint、code-push-cli 四个插件

```bash
npm install -g typescript
npm install -g typings
npm install -g tslint
npm install -g code-push-cli
```

### 生成 AppCenter 账号

* 使用 `code-push login` 命令登录服务端，该命令会打开浏览器窗口让我们登录 AppCenter
* 使用 github 帐号可以进行登录，登录成功会返回一个权限 token
* 将 token 填到到命令终端中，回车就会登录成功

### 在服务端创建应用

* 使用命令 `code-push app add <appName> <os> <platform>` 创建应用, 如
  ```bash
  code-push app add ionic4-boilerplate android cordova
  code-push app add ionic4-boilerplate ios cordova
  ```
* 执行命令后会生成 android cordova 和 ios cordova 的应用信息，我们要把 android 和 ios 对应的 Production 和 Staging 编码分别记录下来  


当上面的一切都准备就绪了就开始安装插件

### 插件安装

* 命令终端进入app目录，安装热更新插件及插件依赖
  ```bash
  ionic cordova plugin add cordova-plugin-code-push
  npm install --save @ionic-native/code-push     // ionic4
  npm install --save @ionic-native/code-push@4   // ionic2/3
  ```
  
> 插件依赖于 cordova-plugin-whitelist，使用 `cordova plugin list` 命令可以查看是否安装白名单插件
如果没有安装执行命令 `ionic cordova plugin add cordova-plugin-whitelist` 进行安装

* 在config.xml添加如下配置允许与 AppCenter 服务器进行通信

  ```bash
  <access origin="*" />
  ```
  
### 热更新代码
 
#### 引入模块

在 app.module.ts 引入 CodePush 模块, 并在 providers 中声明

```js
import { CodePush } from '@ionic-native/code-push/ngx';

...

providers: [CodePush]
...

```
 

#### 动态配置在服务端创建应用后得到的四个key

* 创建一个 Constants.js 文件，将 4 个 code-push key 添加为常量

```js
/**
 * 是否为开发者模式
 */
export const DEBUG = {
  // 是否 debug 模式
  IS_DEBUG: true
}

/**
 * 热更新发布的 key
 */
export const CODE_PUSH_DEPLOYMENT_KEY = {
  ANDROID: {
    Production: 'Your_Android_Production_Key',
    Staging: 'Your_Android_Staging_Key'
  },
  IOS: {
    Production: 'Your_IOS_Production_Key',
    Staging: 'Your_IOS_Staging_Key'
  }
}

```
 
### 热更新同步方法

将以下代码放到 `app.component.ts` 文件中，在构造函数 `constructor(){}` 中调用 sync() 方法。
> 此种用法不能用于生产环境，生产环境中必须有友好的提示与 UI 交互。

```js
import { CodePush } from '@ionic-native/code-push';
import { DEBUG, CODE_PUSH_DEPLOYMENT_KEY } from './Constants';

  sync()
  {
    if (!this.isMobile()) return;
    let deploymentKey = '';
    if (this.isAndroid() && DEBUG.IS_DEBUG)
    {
      deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ANDROID.Staging;
    }
    if (this.isAndroid() && !DEBUG.IS_DEBUG)
    {
      deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ANDROID.Production;
    }
    if (this.isIos() && DEBUG.IS_DEBUG)
    {
      deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.IOS.Staging;
    }
    if (this.isIos() && !DEBUG.IS_DEBUG)
    {
      deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.IOS.Production;
    }
   
    this.codePush.sync({
      deploymentKey: deploymentKey
    }).subscribe((syncStatus) => {
      console.log(syncStatus);
      if(syncStatus === 1){  // 下载完成并准备好时自动重启应用
        this.codePush.restartApplication();
      }
    });
  }

  /**
   * 是否是真机环境
   * @returns {boolean}
   */
  isMobile(): boolean
  {
    return this.platform.is("mobile") && !this.platform.is("mobileweb");
  }

  /**
   * 是否 android 环境
   * @returns {boolean}
   */
  isAndroid(): boolean
  {
    return this.isMobile() && this.platform.is("android");
  }

  /**
   * 是否是 ios 环境
   * @returns {boolean}
   * @memberof NativeService
   */
  isIos(): boolean
  {
    return this.isMobile && (this.platform.is("ios") || this.platform.is("ipad") || this.platform.is("iphone"));
  }
```

### 发布热更新

1. 使用命令 ` code-push deployment list Your_App_Name` 可以查看发布状态
2. 使用 `ionic cordova build Your_Target_Platform` 命令编译代码
3. 使用以下命令 ` code-push release-cordova <appName> <platform> [options]` 发布热更新内容，发布成功后可以再 AppCenter 官网查看
 > ps: 默认发布 Staging 版本,也就是开发版

### 参考

- [参考1](https://www.jianshu.com/p/e7c07653d21f)
- [参考2](https://www.jianshu.com/p/6e96c6038d80?from=timeline)
