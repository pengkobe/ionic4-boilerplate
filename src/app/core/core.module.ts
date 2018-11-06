/**
 * 统一管理系统中通用服务
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GlobalService } from '@services/global.service';
import { QiniuUploadService } from '@services/qiniu.upload.service';
import { UpdateService } from '@services/update.service';
import { NativeService } from '@services/native.service';
import { DataService } from '@services/data.service';
import { BaiduLocationService } from '@services/baidulocation.service';
import { EmitService } from '@services/emit.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [],
  declarations: [],
  providers: [
    NativeService,
    UpdateService,
    GlobalService,
    QiniuUploadService,
    DataService,
    BaiduLocationService,
    EmitService,
  ],
})
export class CoreModule {}
