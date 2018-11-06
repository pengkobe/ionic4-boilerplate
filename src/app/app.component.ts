import { Component, ViewChildren, QueryList } from '@angular/core';
import {
  Platform,
  ToastController,
  Events,
  ModalController,
  ActionSheetController,
  PopoverController,
  IonRouterOutlet,
  MenuController,
} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { GlobalService } from '@services/global.service';
import { UpdateService } from '@services/update.service';
import { NativeService } from '@services/native.service';

import { TranslateService } from '@ngx-translate/core';
import { EmitService } from '@services/emit.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class MyApp {
  backButtonPressed = false;
  hideNav = false;

  pages: Array<{ title: string; component: any }>;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet)
  routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    public platform: Platform,
    public events: Events,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public global: GlobalService,
    public native: NativeService,
    public updateService: UpdateService,
    public translate: TranslateService,
    public globalservice: GlobalService,
    public emit: EmitService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router
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
    this.platform.backButton.subscribe(async () => {
      // close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {}

      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {}

      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);
      }

      // close side menua
      try {
        const element = await this.menu.getOpen();
        if (element !== null) {
          this.menu.close();
          return;
        }
      } catch (error) {}

      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === '/home') {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator['app'].exitApp(); // work in ionic 4
          } else {
            let toast = await this.toastCtrl.create({
              message: '再按一次退出应用',
              duration: 2000,
              position: 'top',
            });
            await toast.present();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
}
