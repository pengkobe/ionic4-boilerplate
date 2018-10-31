/**
 * App 更新服务
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { GlobalService } from './global.service';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { Observable } from 'rxjs';

declare var window;

@Injectable()
export class UpdateService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  constructor(
    public platform: Platform,
    public _global: GlobalService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public transfer: FileTransfer,
    private fileOpener: FileOpener
  ) {}

  /**
   * 检查更新
   */
  checkUpdate() {
    const appSystem = this.platform.is('android') ? 'android' : 'ios';
    this.getServerVersion(appSystem).subscribe(data => {
      let appVersionInfo;
      if (data && data.length > 0) {
        appVersionInfo = data[0];
      }
      if (window.cordova) {
        window.cordova.getAppVersion.getVersionNumber().then(version => {
          if (this.compare(appVersionInfo.version, version)) {
            this.showUpdateConfirm(
              appVersionInfo.Content,
              appVersionInfo.downloadUrl
            );
          }
        });
      }
    });
  }

  /**
   * 版本号对比
   * @param curV 当前版本
   * @param reqV 请求版本
   */
  compare(curV, reqV) {
    if (curV && reqV) {
      const arr1 = curV.split('.');
      const arr2 = reqV.split('.');
      const minLength = Math.min(arr1.length, arr2.length);
      let diff = 0,
        position = 0;
      while (
        position < minLength &&
        (diff = parseInt(arr1[position], 10) - parseInt(arr2[position], 10)) ===
          0
      ) {
        position++;
      }
      diff = diff !== 0 ? diff : arr1.length - arr2.length;
      return diff > 0;
    } else {
      console.log('版本号不能为空');
      return false;
    }
  }

  /**
   * 比对版本号并更新
   * @param appSystem 系统名
   */
  getServerVersion(appSystem): Observable<any> {
    return new Observable(responseObserver => {
      this.http
        .get(this._global.serverAddress + 'api/version', {})
        .subscribe(res => {
          responseObserver.next(res);
          responseObserver.complete();
        });
    });
  }

  /**
   * 更新提示框
   * @param updateContent 内容
   * @param downloadUrl 下载地址
   */
  async showUpdateConfirm(updateContent, downloadUrl) {
    const prompt = await this.alertCtrl.create({
      header: '发现新版本',
      message: updateContent,
      buttons: [
        {
          text: '以后再说',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: '立即升级',
          handler: () => {
            this.downloadApkFile(this.platform.is('android'), downloadUrl);
          },
        },
      ],
    });
    await prompt.present();
  }

  /**
   * Android 版下载
   * @param isAndroid
   * @param downloadUrl
   */
  downloadApkFile(isAndroid, downloadUrl: string) {
    if (isAndroid) {
      const trustHosts = true;
      const options = {};
      const fileTransfer: FileTransferObject = this.transfer.create();
      window.resolveLocalFileSystemURL(
        window.cordova.file.externalApplicationStorageDirectory,
        fileEntry => {
          fileEntry.getDirectory(
            'Download',
            { create: true, exclusive: false },
            async dir => {
              const targetPath: string = dir.toInternalURL() + 'TomatoBang.apk';
              let loading = null;
              loading = await this.loadingCtrl.create({
                message: `下载中...`,
              });
              await loading.present();
              fileTransfer
                .download(downloadUrl, targetPath, trustHosts, options)
                .then(
                  result => {
                    this.fileOpener.open(
                      targetPath,
                      'application/vnd.android.package-archive'
                    );
                    if (loading) {
                      loading.dismiss();
                    }
                  },
                  async error => {
                    if (loading) {
                      loading.dismiss();
                    }
                    const alert = await this.alertCtrl.create({
                      message: '下载失败!',
                      buttons: ['OK'],
                    });
                    await alert.present();
                  }
                );
              // 下载进度
              fileTransfer.onProgress((evt: ProgressEvent) => {
                const downloadProgress = window.parseInt(
                  (evt.loaded / evt.total) * 100,
                  10
                );
                loading.data.content = `<div>已下载${downloadProgress}%</div>`;
                if (downloadProgress >= 100) {
                  loading.dismiss();
                }
              });
            }
          );
        }
      );
    } else {
      // ios 跳转到 app store
      window.location.href = downloadUrl;
    }
  }
}
