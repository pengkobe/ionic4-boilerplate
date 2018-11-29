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

## 参考

* https://github.com/marcoturi/ionic-docker
* https://hub.docker.com/r/agileek/ionic-framework/~/dockerfile/
* https://github.com/svenlaater/travis-ci-ionic-yml/blob/master/Dockerfile-node-java-android