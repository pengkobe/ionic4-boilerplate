import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {
    NavController
} from '@ionic/angular';

@Injectable()
export class MYHttpInterceptor implements HttpInterceptor {
    status = {
        '400': '错误的请求,由于语法错误,该请求无法完成.',
        '401': '未经授权,服务器拒绝响应.',
        '403': '已禁止,服务器拒绝响应.',
        '404': '未找到,无法找到请求的位置.',
        '405': '方法不被允许,使用该位置不支持的请求方法进行了请求.',
        '406': '不可接受,服务器只生成客户端不接受的响应.',
        '407': '需要代理身份验证,客户端必须先使用代理对自身进行身份验证.',
        '408': '请求超时,等待请求的服务器超时.',
        '409': '冲突,由于请求中的冲突,无法完成该请求.',
        '410': '过期,请求页不再可用.',
        '411': '长度必需,未定义“内容长度”.',
        '412': '前提条件不满足,请求中给定的前提条件由服务器评估为 false.',
        '413': '请求实体太大,服务器不会接受请求,因为请求实体太大.',
        '414': '请求 URI 太长,服务器不会接受该请求,因为 URL 太长.',
        '415': '不支持的媒体类型,服务器不会接受该请求,因为媒体类型不受支持.',
        '416': 'HTTP 状态代码 {0}',
        '500': '内部服务器错误.',
        '501': '未实现,服务器不识别该请求方法或者服务器没有能力完成请求.',
        '503': '服务器当前不可用(过载或故障).'
    };

    constructor(private navCtrl: NavController, ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 200) {
                    if (event.body.status === 'fail' && event.body.description === 'Token verify failed') {
                        ok = 'fail';
                        this.navCtrl.navigateForward(['login']);
                    }
                    ok = 'succeed';
                } else {
                    ok = 'failed';
                    if (this.status['' + event.status]) {
                        ok = 'failed:' + this.status['' + event.status];
                        console.error(this.status['' + event.status]);
                        if (event.status === 401) {
                            this.navCtrl.navigateForward(['login']);
                        }
                    }
                }
            }
        }, error => ok = 'failed,' + error), finalize(() => {
            const elapsed = Date.now() - started;
            const msg = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
            console.log(msg);
        }));
    }
}


