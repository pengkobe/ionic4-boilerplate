import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { baseUrl } from '../config';
import { GlobalService } from './global.service';

declare var window;

@Injectable()
export class QiniuUploadService {
  private _qiuniutokeninfo: any;

  constructor(public http: HttpClient, public _g: GlobalService) {}

  public getUploadToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this._g.token,
      }),
    };

    return this.http.get(baseUrl + 'qiu/uploadtoken', httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      })
    );
  }

  public init(uploadToken): Observable<any> {
    return Observable.create(observer => {
      window.plugins.QiNiuUploadPlugin.init(
        uploadToken,
        data => {
          console.log('qiniu,init ret suncceed:', data);
          observer.next(data);
          observer.complete();
        },
        err => {
          console.log('qiniu,init ret err:', err);
          observer.error(err);
        }
      );
    });
  }

  public uploadLocFile(filePath, name) {
    return Observable.create(observer => {
      window.plugins.QiNiuUploadPlugin.simpleUploadFile(
        {
          filePath: filePath,
          name: name,
        },
        data => {
          console.log('qiniu uploadLocFile succeed:', data);
          observer.next({
            data: true,
            value: data,
          });
          observer.complete();
        },
        progress => {
          observer.next({
            data: false,
            value: progress,
          });
        },
        err => {
          console.log('qiniu,uploadLocFile ret err:', err);
          observer.error(err);
        }
      );
    });
  }

  /**
   * 七牛初始化
   */
  initQiniu(): Observable<any> {
    return Observable.create(observer => {
      if (this._qiuniutokeninfo) {
        const timespan = new Date().getTime() - this._qiuniutokeninfo.getTime();
        const timespan_milliseconds = timespan % (3600 * 1000);
        const timespan_minutes = Math.floor(
          timespan_milliseconds / (60 * 1000)
        );
        if (timespan_minutes < 115) {
          observer.next(true);
        } else {
          this.getQiniuTokenAndInit(observer);
        }
      } else {
        this.getQiniuTokenAndInit(observer);
      }
    });
  }

  getQiniuTokenAndInit(observer) {
    this.getUploadToken().subscribe(
      data => {
        console.log('qiniutoken:', data);
        this._qiuniutokeninfo = data.uploadToken;
        this.init(data.uploadToken).subscribe(d => {
          observer.next(true);
        });
      },
      err => {
        console.log('qiniu init error:', err);
        observer.error(false);
      }
    );
  }
}
