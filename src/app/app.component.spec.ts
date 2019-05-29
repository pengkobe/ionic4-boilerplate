import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  IonicRouteStrategy,
  Events,
} from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MyApp } from './app.component';

describe('AppComponent', () => {
  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, routerSpy, eventsSpy;

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
      backButton: {subscribeWithPriority: () => true},
    });
    routerSpy = jasmine.createSpyObj('events', ['subscribe', 'events']);
    eventsSpy = jasmine.createSpyObj('Events', ['subscribe']);
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, AppRoutingModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [MyApp],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        // { provide: Platform, useValue: platformSpy },
        { provide: Events, useValue: eventsSpy },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
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
    // expect(platformSpy.ready).toHaveBeenCalled();
    console.log('statusBarSpy', statusBarSpy);
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });
});
