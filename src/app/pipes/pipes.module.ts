import { NgModule } from '@angular/core';

import { StringTruncatemPipe } from './stringTruncate.pipe';

export const pipes = [
  StringTruncatemPipe,
];

@NgModule({
  declarations: [pipes],
  exports: [pipes],
})
export class PipesModule {}
