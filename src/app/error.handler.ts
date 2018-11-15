import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class MyErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }

  handleError(error: any): void {}
}
