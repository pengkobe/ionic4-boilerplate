/**
 * 常用原生服务
 *  - 网络状态监听
 *  - 屏幕常亮设置
 *  - 文件下载
 *  - 本地通知
 */

import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { GlobalService } from './global.service';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { Network } from '@ionic-native/network/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
    private localNotifications: LocalNotifications
  ) {}


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
   * 本地通知
   * @param obj
   */
  localNotify(obj: { id; text; sound?; data?; trigger? }) {
    this.localNotifications.schedule([obj]);
  }
}
