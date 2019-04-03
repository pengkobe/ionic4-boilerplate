# 开发流程与代码规范

## Git

### 仓库

托管在[码云](https://gitee.com/)或者 Github 私有仓库

### 分支管理

参见下图
![git 分支管理规范](./img/git-version-ctrl.png)

### 提交流程

参见教程:[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html),
本脚手架基于 commitizen 与 commitlint 来对提交信息做验证, 脚本示例如下，commitlint 具体介绍，下面也会提到:

```bash
git add YOUR_EDITED_FILES
git cz
git push
```

## 测试

使用 Ionic/Angular 默认测试工具即可, 根据需求可以微调配置

```bash
# 单元测试
npm run test
# 端到端测试
npm run e2e
```

## 代码规范

### 业界参考

- JavaScript 代码规范, 参见业界公认的 [airbnb JavaScript 规范](https://github.com/airbnb/javascript)
- Angular 规范, 直接参考官网[styleguide](https://angular.io/guide/styleguide), Angular 默认已集成部分检测工具, 如 `tslint-angular`, 如需手动验证，可以执行命令 `npm run lint`
- Scss, 基于 scsslint 可验证 sass 代码是否规范, 参见: https://sass-guidelin.es/#tools

## 工具集成

### 安装 commitizen

[commitizen](https://github.com/commitizen/cz-cli  ), 可以实现代码提交可视化，可以使用以下脚本安装

```bash
 # 全局安装
 npm install -g commitizen
 # 初始化
 commitizen init cz-conventional-changelog --save --save-exact
```

默认提交类目主要有以下几个

- feat: 新功能（ feature ）
- fix: 修补 bug
- docs: 文档（ documentation ）
- style: 格式（ 不影响代码运行的变动 ）
- refactor: 重构（ 即不是新增功能, 也不是修改bug的代码变动 ）
- test: 测试相关更改
- chore: 构建过程或辅助工具的变动
- build: 与构建工具相关的更改
- ci: 持续集成相关的更改

### commitlint

基于 [commitlint](https://github.com/marionebl/commitlint) 验证 git message 是否规范  

本脚手架使用 angular 规则, 详情参见:
https://github.com/marionebl/commitlint/tree/master/@commitlint/config-angular

### standard-version

本脚手架使用 [standard-version](https://github.com/conventional-changelog/standard-version) 可以基于 `Git Commit Message` 生成 changelog, 需要对文档中生成规则进行熟悉。执行下述基本可以安装 standard-version，其也有全局安装选项，可以自由选择

```bash
npm i --save-dev standard-version

# 全局安装
npm i -g standard-version
```

### husky

通过 [husky](https://www.npmjs.com/package/husky) 可以执行生命周期内的相关钩子, 自动验证代码的是否符合规范  

```bash
npm install husky --save-dev
```

### type doc

[type doc](https://github.com/TypeStrong/typedoc/) 可以自动根据注释生成文档的工具
> 前提是你按照标准的格式写好注释  

建议全局安装

```bash
npm install typedoc --global
typedoc
```

### better-npm-run

[better-npm-run](https://github.com/benoror/better-npm-run) 能够去除配置文件硬编码, 可以直接在 package.json 中配置命令行参数

```bash
 npm install better-npm-run --save-dev
```

### ionic docker (TODO:)

[ionic docker](https://github.com/marcoturi/ionic-docker) 能够屏蔽部署环境差异, 可惜对 Windows 支持不大好，必须要基于虚拟机进行安装，否则大家可以使用一套环境相同的开发环境。
