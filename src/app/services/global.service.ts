import { Subject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { baseUrl, qiniuDomain } from '../config';

const subject: Subject<any> = new Subject<any>();
const tokenSubject: Subject<any> = new Subject<any>();
const settingSubject: Subject<any> = new Subject<any>();

@Injectable()
export class GlobalService {
  public notificationSubject: Subject<any> = new Subject<any>();
  public serverAddress = baseUrl;

  private _isActive = false;
  private _isFirstTimeOpen: boolean;
  private _token: string;
  private _userinfo: any;
  private _jpushAlias: any;
  private _isAlwaysLight = false;
  private _languageType;

  constructor(public events: Events) {}

  public bioUpdate(bio: String) {
    this.events.publish('bio:update', bio);
  }

  public get projectChangeMonitor(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
  /**
   * 配置改变
   */
  public get settingState(): Observable<any> {
    return settingSubject.asObservable();
  }

  get appIsActive() {
    return this._isActive;
  }

  set appIsActive(value) {
    this._isActive = value;
  }

  public get userinfostate(): Observable<any> {
    return subject.asObservable();
  }

  public get tokenState(): Observable<any> {
    return tokenSubject.asObservable();
  }

  /**
   * authorization token
   */
  get token() {
    if (this._token) {
      return this._token;
    } else {
      return localStorage.getItem('token');
    }
  }
  set token(value) {
    this._token = value;
    localStorage.setItem('token', value);
    tokenSubject.next(value);
  }

  get jpushAlias() {
    if (this._jpushAlias) {
      return this._jpushAlias;
    } else {
      const jpushaliasStr = localStorage.getItem('jpushalias');
      if (jpushaliasStr) {
        try {
          this._jpushAlias = JSON.parse(jpushaliasStr);
          return this._jpushAlias;
        } catch (error) {
          return null;
        }
      } else {
        return null;
      }
    }
  }

  set jpushAlias(value: any) {
    if (typeof value === 'string') {
      if (value === '') {
        this._jpushAlias = null;
        localStorage.removeItem('jpushalias');
      } else {
        this._jpushAlias = JSON.parse(value);
        localStorage.setItem('jpushalias', value);
      }
    } else if (typeof value === 'object') {
      this._jpushAlias = value;
      localStorage.setItem('jpushalias', JSON.stringify(value));
    }

    subject.next(value);
  }

  get userinfo() {
    if (this._userinfo) {
      return this._userinfo;
    } else {
      const userStr = localStorage.getItem('userinfo');
      if (userStr) {
        try {
          this._userinfo = JSON.parse(userStr);
          return this._userinfo;
        } catch (error) {
          return null;
        }
      } else {
        return null;
      }
    }
  }

  set userinfo(value: any) {
    if (typeof value === 'string') {
      if (value === '') {
        this._userinfo = null;
        localStorage.removeItem('userinfo');
      } else {
        this._userinfo = JSON.parse(value);
        localStorage.setItem('userinfo', value);
      }
    } else if (typeof value === 'object') {
      this._userinfo = value;
      localStorage.setItem('userinfo', JSON.stringify(value));
    }

    subject.next(value);
  }

  get isFirstTimeOpen() {
    if (this._isFirstTimeOpen) {
      return this._isFirstTimeOpen;
    } else {
      const isFirstTimeOpen = localStorage.getItem('isFirstTimeOpen');
      if (isFirstTimeOpen === 'false') {
        return false;
      } else {
        return true;
      }
    }
  }

  set isFirstTimeOpen(value) {
    this._isFirstTimeOpen = value;
    let str = '';
    if (value) {
      str = 'true';
    } else {
      str = 'false';
    }
    localStorage.setItem('isFirstTimeOpen', str);
  }

  get isAlwaysLight() {
    if (this._isAlwaysLight) {
      return this._isAlwaysLight;
    } else {
      const isAlwaysLight = localStorage.getItem('isAlwaysLight');
      if (isAlwaysLight === 'false') {
        this._isAlwaysLight = false;
      } else {
        this._isAlwaysLight = true;
      }
      return this._isAlwaysLight;
    }
  }

  set isAlwaysLight(value: boolean) {
    this._isAlwaysLight = value;
    let str = '';
    if (value) {
      str = 'true';
    } else {
      str = 'false';
    }
    localStorage.setItem('isAlwaysLight', str);
  }

  get languageType() {
    if (this._languageType) {
      return this._languageType;
    } else {
      const languageType = localStorage.getItem('languageType');
      this._languageType = languageType;
      return languageType;
    }
  }
  set languageType(value: string) {
    this._languageType = value;
    localStorage.setItem('languageType', value);
  }

  /**
   * 打开通知
   * @param data
   */
  openNotificationCallback(data) {
    this.notificationSubject.next({
      type: 'open',
      data: data,
    });
  }

  /**
   * 收到通知
   * @param data
   */
  receiveNotificationCallback(data) {
    this.notificationSubject.next({
      type: 'receive',
      data: data,
    });
  }

  /**
   * 设置别名
   * @param data
   */
  setTagsWithAliasCallback(data) {
    this.notificationSubject.next({
      type: 'setAlias',
      data: data,
    });
  }
}
