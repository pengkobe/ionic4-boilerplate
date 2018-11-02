import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

Raven.config(
  'https://8583117beafb40a8be2906252ee80fcc@sentry.io/240912'
).install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}
