# Docker

## 镜像切换

鉴于国内网络问题，后续拉取 Docker 镜像十分缓慢，需要配置加速器来解决，
新版的 Docker 使用 `/etc/docker/daemon.json（Linux）` 或者 `%programdata%\docker\config\daemon.json（Windows）` 来配置 Daemon。
请在该配置文件中加入（没有该文件的话，先建一个）

```json
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
```

## 安装

参考教程: http://www.runoob.com/docker/windows-docker-install.html (文中有提到在 win10 环境下需要开启 hyperV 功能，实际上只支持 win10 专业版)  

windows 安装非常简单，主要会安装以下几个组件  

- Kitematic，为 Windows提供了与 Mac 相同的用户体验和功能，支持 powershell 等，可视化方式从 docker hub 拉取镜像和运行镜像
- Docker Machine，可以让你在windows的命令行中运行docker引擎命令
- Docker Cli，用来运行docker引擎创建镜像和容器
- Docker Compose. 用来运行docker-compose命令
- Docker Quickstart Terminal，是一个已经配置好 Docker 的命令行环境
- VirtualBox， 虚拟机

## 镜像

### ionic-docker

基于 docker 镜像，Github 地址: https://github.com/marcoturi/ionic-docker

windows 下环境下运行一直识别不出 ionic 项目，按照 Issue 中修改 myApp 为 Sources 也不行。  

linux 下环境下运行

```bash
alias ionic="docker run -ti --rm --net host --privileged -v /dev/bus/usb:/dev/bus/usb -v ~/.gradle:/root/.gradle -v $PWD:/myApp:rw marcoturi/ionic ionic"
```

作者只是修改了这个项目的一些配置，连文档都没改过来，直接参考这个就 ok: https://hub.docker.com/r/agileek/ionic-framework ，按照文档进行使用就 ok，只是挂载的时候需要注意路径问题

### docker-ionic

https://github.com/beevelop/docker-ionic

## 报错

* boot2docker.iso，不一定能下下来，会导致报错 `wsarecv: An existing connection was forcibly closed by the remote host.` 个人因为装了代理，后来关闭代理后才解决
* 和 windows 结合开发有各种不确定的问题，一方面 windows 不是直接的宿主机而是依赖于 linux 虚拟机，虚拟机自然有其局限性，此外，对于两者这届的环境和目录处理需要倍加小心

## 参考

* 推荐: https://github.com/beevelop/docker-ionic
* 推荐: https://github.com/marcoturi/ionic-docker
* https://hub.docker.com/r/agileek/ionic-framework/~/dockerfile/
* https://github.com/svenlaater/travis-ci-ionic-yml/blob/master/Dockerfile-node-java-android