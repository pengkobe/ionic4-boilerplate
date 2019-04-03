# jenkins

[jenkins](https://jenkins.io/) 是一个自动化部署，支持自动对程序进行构建和发布，能够与 SVN 和 GIT 做集成，与日常开发部署流程结合，可以大大提高开发效率。

## 安装

```bash
java -jar jenkins.war --httpPort=8080
```

找到初始化密码,位置为 `C:\Users\you_user_name\.jenkins\secrets\initialAdminPassword`

个人选择安装了社区默认的插件

设置账户密码: username/password
Jenkins URL: http://localhost:8080/

### 基于 docker

拉取 jenkins 并运行容器，使用 `http://YOUR_IP:10080` 访问

```bash
docker pull docker.io/jenkins/jenkins
docker run --name jenkins -p 10080:8080 docker.io/jenkins/jenkins
```

## 如何集成 Ionic 项目

### IOS

集成步骤还是有点小麻烦，有许多东西需要配置，具体可以参考下述两篇文章

* [iOS持续集成—Jenkins(最新最全)](https://www.jianshu.com/p/9cb3d8c8c78d)
* [Jenkins持续集成ionic iOS项目](https://www.jianshu.com/p/d7822a92b575)

#### IOS 上传至蒲公英

https://www.pgyer.com/doc/view/jenkins_ios

### Android

#### Android 上传至蒲公英

https://www.pgyer.com/doc/view/jenkins

## 参考

* https://jenkins.io/doc ， 支持 pdf 版下载，使用更便捷