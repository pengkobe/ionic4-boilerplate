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
import { Router } from '@angular/router';

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

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet)
  routerOutlets: QueryList<IonRouterOutlet>;

  selectedTheme: String;

  constructor(
    public platform: Platform,
    public events: Events,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public global: GlobalService,
    public native: NativeService,
    public updateService: UpdateService,
    public translateservice: TranslateService,
    public globalservice: GlobalService,
    public emitservice: EmitService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router
  ) {
    this.emitservice.getActiveTheme().subscribe(val => {
      if (val) {
        this.selectedTheme = val;
      }
    });
    this.initializeApp();
    this.initTranslate();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#f8f8f8');
      if (window.cordova) {
        this.native.initNativeService();
        this.updateService.checkUpdate();
        this.registerBackButtonAction();
        this.native.initAppCenter();
      }
    });

    this.events.subscribe('qrScanner:show', () => {
      this.hideNav = true;
    });
    this.events.subscribe('qrScanner:hide', () => {
      this.hideNav = false;
    });
  }

  initTranslate() {
    this.translateservice.addLangs(['en', 'zh']);
    this.translateservice.setDefaultLang('en');
    if (this.globalservice.languageType) {
      this.translateservice.use(this.globalservice.languageType);
    } else {
      const browserLang = this.translateservice.getBrowserLang();
      this.translateservice.use(
        browserLang.match(/en|zh/) ? browserLang : 'en'
      );
    }

    this.emitservice.eventEmit.subscribe(val => {
      if (val === 'languageType') {
        this.translateservice.use(this.globalservice.languageType);
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
        const element = await this.menuCtrl.getOpen();
        if (element !== null) {
          this.menuCtrl.close();
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
            const toast = await this.toastCtrl.create({
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

  navigate(url) {
    return this.router.navigateByUrl(url);
  }
}
