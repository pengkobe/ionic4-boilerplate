/**
 * 常用原生服务
 *  - 网络状态监听
 *  - 屏幕常亮设置
 *  - 文件下载
 *  - 本地通知
 *  - 应用统计相关
 */

import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { GlobalService } from './global.service';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { Network } from '@ionic-native/network/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics/ngx';
import { AppCenterCrashes } from '@ionic-native/app-center-crashes/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';

declare var window;

@Injectable()
export class NativeService {
  headimgurl: String;
  toast: any;

  private _isOffline = false;

  constructor(
    public platform: Platform,
    public globalservice: GlobalService,
    private insomnia: Insomnia,
    private toastCtrl: ToastController,
    private transfer: FileTransfer,
    private network: Network,
    private localNotifications: LocalNotifications,
    private appCenterAnalytics: AppCenterAnalytics,
    private appCenterCrashes: AppCenterCrashes
  ) {}

  /**
   * 初始化
   */
  initAppCenter() {
    this.appCenterAnalytics.setEnabled(true).then(() => {
      this.appCenterAnalytics
        .trackEvent('Init', { TEST: 'yipeng.ionic3' })
        .then(() => {
          console.log('AppCenter Analytics event tracked');
        });
    });

    this.appCenterCrashes.setEnabled(true).then(() => {
      this.appCenterCrashes.lastSessionCrashReport().then(report => {
        console.log('Crash report', report);
      });
    });
  }

  initNativeService() {
    this.listenInsomniaState();
    this.listenNetworkState();
  }

  isOffline() {
    return this._isOffline;
  }

  listenInsomniaState() {
    if (this.globalservice.isAlwaysLight) {
      this.insomnia
        .keepAwake()
        .then(
          () => console.log('insomnia init success'),
          e => console.log('insomnia init error', e)
        );
    }
  }

  listenNetworkState() {
    this.createToast();
    const offlineOnlineThrottle = this.throttle(msg => {
      if (this._isOffline === true) {
        this.toast.setMessage(msg);
        this.toast.present();
      }
    }, 2400);
    this.network.onDisconnect().subscribe(() => {
      this._isOffline = true;
      console.log('network was disconnected :-(');
      offlineOnlineThrottle('OFFLINE！');
    });

    this.network.onConnect().subscribe(() => {
      this._isOffline = false;
      this.toast.dismissAll();
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('got network:wifi!');
        }
      }, 3000);
    });
  }

  /**
   * throttle
   * @param fn
   * @param delay
   * @return Function
   */
  throttle(fn, delay) {
    let timer = null;
    return function(msg) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(msg);
      }, delay);
    };
  }

  /**
   * create toast
   * @param msg message to show
   */
  async createToast(msg = '') {
    this.toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      cssClass: 'my-toast-style',
      showCloseButton: true,
      closeButtonText: '关闭',
    });
  }

  /**
   * 本地通知
   * @param obj
   */
  localNotify(obj: { id; text; sound?; data?; trigger? }) {
    this.localNotifications.schedule([obj]);
  }

  /**
   * @deprecated see:https://cordova.apache.org/blog/2017/10/18/from-filetransfer-to-xhr2.html
   * file download
   * @param remotepath
   * @param targetPathWithFileName
   */
  filedownload(remotepath, targetPathWithFileName) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          Authorization: this.globalservice.token,
        },
      };
      const trustHosts = true;
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer
        .download(
          window.encodeURI(remotepath),
          targetPathWithFileName,
          trustHosts,
          options
        )
        .then(result => {
          resolve(result.toURL());
        })
        .catch(err => {
          reject(err);
        });
      fileTransfer.onProgress((evt: ProgressEvent) => {
        // show download progress
      });
    });
  }

  /**
   * get files by prefix
   */
  getFiles(prefix: string): Promise<FileEntry[]> {
    return new Promise((resolve, reject) => {
      window.requestFileSystem(
        LocalFileSystem.PERSISTENT,
        0,
        fs => {
          fs.root.createReader().readEntries((entries: FileEntry[]) => {
            resolve(entries.filter(e => e.isFile && e.name.includes(prefix)));
          }, reject);
        },
        reject
      );
    });
  }

  /**
   * get files from local or download from server
   */
  getLocalFileOrDowload(
    remoteFileUri: string,
    fileName: string,
    prefix: string,
    onProgress?: (e: ProgressEvent) => void
  ): Promise<FileEntry> {
    return new Promise((resolve, reject) => {
      window.requestFileSystem(
        LocalFileSystem.PERSISTENT,
        0,
        fs => {
          fs.root.getFile(
            prefix + fileName,
            undefined,
            fe => {
              fe.file(f => {
                if (f.size > 0) {
                  resolve(fe);
                } else {
                  this.syncRemoteFile(
                    fs,
                    remoteFileUri,
                    fileName,
                    prefix,
                    onProgress
                  )
                    .then(resolve)
                    .catch(reject);
                }
              }, reject);
            },
            (err: FileError) => {
              if (err.code === FileError.NOT_FOUND_ERR) {
                this.syncRemoteFile(
                  fs,
                  remoteFileUri,
                  fileName,
                  prefix,
                  onProgress
                )
                  .then(resolve)
                  .catch(reject);
              } else {
                reject(err);
              }
            }
          );
        },
        reject
      );
    });
  }

  syncRemoteFile(
    fs: FileSystem,
    remoteFileUri: string,
    fileName: string,
    prefix: string,
    onProgress?: (e: ProgressEvent) => void
  ): Promise<FileEntry> {
    return new Promise((resolve, reject) => {
      fs.root.getFile(
        prefix + fileName,
        { create: true, exclusive: false },
        fileEntry =>
          this.download(fileEntry, remoteFileUri, onProgress)
            .then(resolve)
            .catch(err => {
              // a zero lenght file is created while trying to download and save
              fileEntry.remove(() => {});
              reject(err);
            }),
        reject
      );
    });
  }

  download(
    fileEntry: FileEntry,
    remoteURI: string,
    onProgress?: (e: ProgressEvent) => void
  ): Promise<FileEntry> {
    return new Promise((resolve, reject) => {
      const client = new XMLHttpRequest();
      client.open('GET', remoteURI, true);
      client.responseType = 'blob';
      if (onProgress) {
        client.onprogress = onProgress;
      }
      client.onload = () => {
        const blob = client.response;
        if (blob) {
          fileEntry.createWriter(fileWriter => {
            fileWriter.onwriteend = () => resolve(fileEntry);
            fileWriter.onerror = reject;
            fileWriter.write(blob);
          }, reject);
        } else {
          reject('could not get file');
        }
      };
      client.send();
    });
  }
}
