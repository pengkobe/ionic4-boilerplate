import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsPage } from './tabs.page';
import { HomePage } from '../pages/home/home.page';
import { TestPage } from '../pages/test/test.page';
import { TabsPageRoutingModule } from './tabs.router.module';
import { SharedModule } from './../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
  IonicRouteStrategy,
} from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TabsPageRoutingModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [TabsPage, HomePage, TestPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
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
