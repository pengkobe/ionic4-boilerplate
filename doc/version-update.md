# 版本更新

## APK 更新

实现代码位于 `src/app/services/providers/update.service`

## 热更新

基于 cordova 插件: cordova-hot-code-push-plugin, see: https://github.com/nordnet/cordova-hot-code-push

### 安装与使用

```bash
cordova plugin add cordova-hot-code-push-plugin
# Add plugin for local development
cordova plugin add cordova-hot-code-push-local-dev-addon
# Install Cordova Hot Code Push CLI client:
npm install -g cordova-hot-code-push-cli
# Start local server by executing:
cordova-hcp server
```

### 构建

```bash
npm run build --prod
cordova-hcp build
```

> 注意: 需要对 www/chcp.json 进行稍许更改，模板可以参考 version_update/chcp.json

修改完成后，将整个 `www` 内的内容上传至服务器  
参考

- https://github.com/pengkobe/reading-notes/issues/352
