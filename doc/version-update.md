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