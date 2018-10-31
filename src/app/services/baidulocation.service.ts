/**
 * 百度定位服务
 */
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var window;

@Injectable()
export class BaiduLocationService {
  constructor(public plf: Platform) {}

  startLocation(callback): Promise<any> {
    return new Promise((resolve, reject) => {
      if (window.cordova) {
        if (this.plf.is('android')) {
          window.baidumap_location.getCurrentPosition(
            data => {
              resolve({
                code: 0,
                message: '定位成功',
                position: this.getPositionDesc(data),
              });
            },
            err => {
              reject({
                code: -1,
                message: '手机定位功能未开启(Android)',
              });
            }
          );
        } else {
          this.iosLocation(
            data => {
              resolve({
                code: 0,
                message: '定位成功',
                position: this.getPositionDesc(data),
              });
            },
            err => {
              reject(err);
            }
          );
        }
      }
    });
  }

  iosLocation(success, error) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(
            '(IOS)Latitude: ' +
              position.coords.latitude +
              'Longitude: ' +
              position.coords.longitude
          );
          // 坐标转换
          const point = new window.BMap.Point(
            position.coords.longitude,
            position.coords.latitude
          );
          window.BMap.Convertor.translate(point, 0, TranslatedPoint => {
            // 百度逆地址解析
            const geoc = new window.BMap.Geocoder();
            geoc.getLocation(
              TranslatedPoint,
              rs => {
                success(rs);
              },
              err => {
                error({ code: -1, message: '定位出错(IOS)' });
              }
            );
          });
        },
        err => {
          if (err.code === 1) {
            error({ code: -3, message: '手机定位功能未开启(IOS)' });
          } else {
            error({ code: -1, message: '定位出错(IOS)' });
          }
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      error({ code: -2, message: '不支持定位(IOS)' });
    }
  }

  getPositionDesc(data) {
    let addr, pois;
    const addrDatas = [],
      isAndroid = this.plf.is('android');
    if (isAndroid) {
      addr = data.addr.substring(2);
      pois = data.pois;
      if (pois == null) {
        addrDatas.push(addr);
      } else {
        if (Array.isArray(pois)) {
          if (pois.length === 0) {
            addrDatas.push(addr);
          } else {
            for (let i = 0; i < pois.length; i++) {
              if (pois[i].name) {
                addrDatas.push(addr + pois[i].name);
              }
            }
          }
        } else {
          if (pois.name) {
            addrDatas.push(addr + pois.name);
          }
        }
      }
    } else {
      addr = data.address;
      pois = data.surroundingPois;
      if (pois === null) {
        addrDatas.push(addr);
      } else {
        if (Array.isArray(pois)) {
          if (pois.length === 0) {
            addrDatas.push(addr);
          } else {
            for (let i = 0; i < pois.length; i++) {
              if (pois[i].title) {
                addrDatas.push(addr + pois[i].title);
              }
            }
          }
        } else {
          if (pois.title) {
            addrDatas.push(addr + pois.title);
          }
        }
      }
    }
    return addrDatas;
  }
}
