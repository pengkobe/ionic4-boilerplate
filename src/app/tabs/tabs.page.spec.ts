import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
import { HomePage } from '../pages/home/home.page';
import { TestPage } from '../pages/test/test.page';
import { TabsPageRoutingModule } from './tabs.router.module';
import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { GlobalService } from '@services/global.service';
import { TranslateService } from '@ngx-translate/core';
import { EmitService } from '@services/emit.service';

import { ChildrenOutletContexts } from '@angular/router';

import { Events, IonRouterOutlet, NavController } from '@ionic/angular';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  let routerSpy;
  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['url']);
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        SharedModule,
        TabsPageRoutingModule,
        HttpClientModule,
      ],
      declarations: [TabsPage, HomePage, TestPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        GlobalService,
        TranslateService,
        EmitService,
        Events,
        IonRouterOutlet,
        { provide: Router, useValue: routerSpy },
        ChildrenOutletContexts,
        NavController,
        Location,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/tabs' },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
