import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import {
  Platform,
  IonicRouteStrategy,
  ToastController,
  Events,
  ModalController,
  ActionSheetController,
  PopoverController,
  IonRouterOutlet,
  MenuController,
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MyApp } from './app.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, routerSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', [
      'styleDefault',
      'overlaysWebView',
      'backgroundColorByHexString',
    ]);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', {
      ready: platformReadySpy,
      is: () => true,
    });
    routerSpy = jasmine.createSpyObj('Router', ['url']);

    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, AppRoutingModule],
      declarations: [MyApp],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: Router, useValue: routerSpy },
        ToastController,
        Events,
        ModalController,
        ActionSheetController,
        PopoverController,
        IonRouterOutlet,
        MenuController,
        AlertController,
        NavController,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        LoadingController,
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MyApp);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(MyApp);
    expect(platformSpy.ready).toHaveBeenCalled();
    console.log('statusBarSpy', statusBarSpy);
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });
});
