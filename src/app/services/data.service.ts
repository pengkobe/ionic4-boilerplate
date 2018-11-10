/*
 * 后台数据请求服务
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as querystring from 'querystring';
import { Cacheable } from './offlinecache.service';

import { baseUrl } from '../config';
import { NativeService } from './native.service';

@Injectable()
export class DataService {
  baseUrl: string = baseUrl;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  constructor(public http: HttpClient, public native: NativeService) {}

  amapHttpUtil(url: string, options: Object): Observable<Object> {
    const params = new HttpParams({
      fromString: querystring.stringify(options),
    });
    return this.http.get(url, {
      headers: this.headers,
      params: params,
    });
  }

  @Cacheable({ pool: 'test' })
  testCachedData(): Observable<any> {
    const obs = Observable.create(observer => {
      setTimeout(() => {
        observer.next(Math.random());
        observer.complete();
      }, 10);
    });
    obs.pipe(
      map(res => {
        return res;
      })
    );
    return obs;
  }
}
