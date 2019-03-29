# 版本更新

## 热更新

基于 cordova 插件: `cordova-hot-code-push-plugin`, see: https://github.com/nordnet/cordova-hot-code-push

### 插件安装

```bash
cordova plugin add cordova-hot-code-push-plugin
# Add plugin for local development
cordova plugin add cordova-hot-code-push-local-dev-addon
# Install Cordova Hot Code Push CLI client:
npm install -g cordova-hot-code-push-cli
# Start local server by executing:
cordova-hcp server
```

### 热更新构建

```bash
npm run build --prod
cordova-hcp build
```

> 注意: 需要对 www/chcp.json 进行稍许更改，模板可以参考 version_update/chcp.json

修改完成后，将整个 `www` 内的内容上传至服务器，需要保证与 `config.xml` 中 `chcp` 下节点 `config-file` 配置的服务器路径的一致性。  

## APK 更新

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
* 将更新后的 `apk_version.json` 文件上传到 `update.service.ts` 文件里 `getServerVersion` 方法指定的路径下

### TODO

由于插件`cordova-hot-code-push-plugin` 已经停维，最好基于微软热更新插件进行更新。

## 新热更新插件code-push

### 前奏
* 使用npm命令全局安装typescript、typings、tslint、code-push-cli四个插件

```bash
npm install -g typescript
npm install -g typings
npm install -g tslint
npm install -g code-push-cli
```


### 申请服务器
* 使用code-push login命令登录服务端，该命令会打开浏览器窗口让我们登录code-push服务端
* 我是使用github帐号登录，你可以使用其他帐号，登录成功会返回一个权限token
* 将token填到到命令终端中，回车就会登录成功


### 在服务端创建应用
* 使用命令code-push app add <appName> <os> <platform>创建应用
  ```bash
  code-push app add moon_admin_android android cordova
  code-push app add moon_admin_ios ios cordova
  ```
* 执行命令后会生成如下图所示的android cordova和ios cordova的应用信息，我们要把android和ios的Production和Staging分别记录下来

> 当上面的一切都准备就绪了就开始安装插件

### 插件安装
* 命令终端进入app目录，安装热更新插件及插件依赖
  ```bash
  ionic cordova plugin add cordova-plugin-code-push
  npm install --save @ionic-native/code-push@4
  ```
  
> 注意1. 使用cordova plugin list命令查看是否安装白名单插件cordova plugin list
如果没有安装请执行命令
ionic cordova plugin add cordova-plugin-whitelist
2. ionic3 和ionic4 安装的插件不一样

* 在config.xml添加如下配置允许与CodePush服务器通信
  ```bash
  <access origin="*" />
  ```
  这个我们项目也是有的
  
 ### 热更新代码
 * 在app.module.ts声明CodePush插件，将CodePush加到providers中
 

### 动态配置在服务端创建应用后得到的四个key
* 创建一个hcp-instance.js文件，将4个code-push key添加为常量

```
/**
 * debug开发者模式
 */
export const DEBUG = {
  //是否debug模式，true:是, false:否
  IS_DEBUG: true
}

/**
 * 热更新发布的key
 */
export const CODE_PUSH_DEPLOYMENT_KEY = {
  ANDROID: {
    Production: '你的android Production key',
    Staging: '你的android Staging key'
  },
  IOS: {
    Production: '你的ios Production key',
    Staging: '你的ios Staging key'
  }
}
```
 
### 热更新同步方法

将以下代码放到app.component.ts文件中，然后在构造函数（constructor(){}）中调用this.sync()方法或者将以下代码放到任何一个.ts文件中，然后在app.component.ts的构造函数中调用sync()方法。

```js
import { CodePush } from '@ionic-native/code-push';
import { DEBUG, CODE_PUSH_DEPLOYMENT_KEY } from './Constants';

  sync()
  {
    //如果不是真机环境return
    if (!this.isMobile()) return;
    //发布的key
    let deploymentKey = '';
    //如果是Android环境 并且是 debug模式
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
    //热更新同步
    this.codePush.sync({
      deploymentKey: deploymentKey
    }).subscribe((syncStatus) => {
      console.log(syncStatus);
      if(syncStatus === 1){
        //重启app
        this.codePush.restartApplication();
      }
    });
  }

  /**
   * 是否是真机环境
   * @returns {boolean}
   * @memberof NativeService
   */
  isMobile(): boolean
  {
    return this.platform.is("mobile") && !this.platform.is("mobileweb");
  }

  /**
   * 是否android真机环境
   * @returns {boolean}
   * @memberof NativeService
   */
  isAndroid(): boolean
  {
    return this.isMobile() && this.platform.is("android");
  }

  /**
   * 是否是ios真机环境
   * @returns {boolean}
   * @memberof NativeService
   */
  isIos(): boolean
  {
    return this.isMobile && (this.platform.is("ios") || this.platform.is("ipad") || this.platform.is("iphone"));
  }
```

### 发布热更新
好了一切准备就绪

1. 使用以下命令查看发布状态

   ```js
  code-push deployment list <appName>
  ```
  
2. 先build android生成文件
  
3. 使用以下命令发布更新

  ```
  code-push release-cordova <appName> <platform> [options]
  ```
 
 > ps: 默认发布"Staging"部署状态,也就是开发版
 
 发布完后我们可以使用步骤1来查看热更新版本
 
 [参考1](https://www.jianshu.com/p/e7c07653d21f)
 [参考2](https://www.jianshu.com/p/6e96c6038d80?from=timeline)

 
