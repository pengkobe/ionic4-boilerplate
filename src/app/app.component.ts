import { Component } from '@angular/core';
import {
  Platform,
  ToastController,
  Events,
} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { GlobalService } from '@services/global.service';
import { UpdateService } from '@services/update.service';
import { NativeService } from '@services/native.service';

import { TranslateService } from '@ngx-translate/core';
import { EmitService } from '@services/emit.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class MyApp {
  backButtonPressed = false;
  hideNav = false;

  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public events: Events,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public global: GlobalService,
    public native: NativeService,
    public updateService: UpdateService,
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public globalservice: GlobalService,
    public emit: EmitService
  ) {
    this.initializeApp();
    this.initTranslate();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#f8f8f8');
      this.splashScreen.hide();

      this.updateService.checkUpdate();
      this.native.initNativeService();

      this.registerBackButtonAction();
    });

    this.events.subscribe('qrScanner:show', () => {
      this.hideNav = true;
    });
    this.events.subscribe('qrScanner:hide', () => {
      this.hideNav = false;
    });
  }

  initTranslate() {
    this.translate.addLangs(['en', 'zh']);
    this.translate.setDefaultLang('en');
    if (this.globalservice.languageType) {
      this.translate.use(this.globalservice.languageType);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
    }

    this.emit.eventEmit.subscribe(val => {
      if (val === 'languageType') {
        this.translate.use(this.globalservice.languageType);
      }
    });
  }

  /**
   * 物理键返回事件
   */
  registerBackButtonAction() {
    this.platform.backButton.subscribe(val => {
      // const activePortal =
      //   this.ionicApp._modalPortal.getActive() ||
      //   this.ionicApp._toastPortal.getActive() ||
      //   this.ionicApp._loadingPortal.getActive() ||
      //   this.ionicApp._overlayPortal.getActive();
      // if (activePortal) {
      //   activePortal.dismiss().catch(() => {});
      //   activePortal.onDidDismiss(() => {});
      //   return;
      // }
      // const activeNav = this.app.getActiveNav();
      // return activeNav.canGoBack() ? activeNav.pop() : this.showExit();
    });
  }

  /**
   * 确认是否关闭 App
   */
  async showExit() {
    if (this.backButtonPressed) {
      // TODO: 关闭 app
    } else {
      let toast = await this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top',
      });
      await toast.present();
      this.backButtonPressed = true;
      setTimeout(() => (this.backButtonPressed = false), 2000);
    }
  }
}
