/**
 * 常用原生服务
 * 1. 网络状态
 * 2. 文件下载
 * 3. 屏幕常亮
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

@Injectable()
export class NativeService {
  headimgurl: String;
  toast: any;

  private isOffline = false;

  constructor(
    public platform: Platform,
    public globalservice: GlobalService,
    private insomnia: Insomnia,
    private toastCtrl: ToastController,
    private transfer: FileTransfer,
    private network: Network,
    private localNotifications: LocalNotifications
  ) {}

  /**
   * 初始化
   */
  init() {}

  /**
   * 初始化 Native 服务
   */
  initNativeService() {
    this.listenInsomniaState();
    this.listenNetworkState();
  }

  /**
   * 监听屏幕显示状态
   */
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

  /**
   * 监听网络状态
   */
  listenNetworkState() {
    this.createToast();
    const offlineOnlineThrottle = this.throttle(msg => {
      if (this.isOffline === true) {
        this.toast.setMessage(msg);
        this.toast.present();
      }
    }, 2400);
    this.network.onDisconnect().subscribe(() => {
      this.isOffline = true;
      console.log('network was disconnected :-(');
      offlineOnlineThrottle('网络已断开！');
    });

    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.isOffline = false;
      this.toast.dismissAll();
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('got network:wifi!');
        }
      }, 3000);
    });
  }

  /**
   * 函数节流方法
   * @param Function fn 延时调用函数
   * @param Number delay 延迟多长时间
   * @return Function 延迟执行的方法
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
   * 显示消息
   * @param msg 消息
   */
  async createToast() {
    this.toast = await this.toastCtrl.create({
      message: '',
      duration: 3000,
      position: 'top',
      cssClass: 'my-toast-style',
      showCloseButton: true,
      closeButtonText: '关闭',
    });
  }

  /**
   * 文件下载
   * @param remotepath
   * @param targetPathWithFileName 带文件名的下载地址
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
        .download(remotepath, targetPathWithFileName, trustHosts, options)
        .then(result => {
          console.log('filedownload： 下载完成..');
          resolve(result.toURL());
        })
        .catch(err => {
          reject('ERR:下载出错');
          console.log('filedownload： 下载出错', err);
        });
      fileTransfer.onProgress((evt: ProgressEvent) => {
        console.log(evt);
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
