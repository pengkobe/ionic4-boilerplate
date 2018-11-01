import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'StringTruncate'
})
export class StringTruncatemPipe implements PipeTransform {
  transform(value?: string, args?: any): any {
    const bitnum = args;
    if (value && value.length > bitnum) {
      return value.substr(0, bitnum) + '...';
    } else {
      return value;
    }
  }
}
