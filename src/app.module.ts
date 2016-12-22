import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSelectDirective } from './file-select.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ FileSelectDirective ],
  exports: [ FileSelectDirective, CommonModule ]
})
export class FileUploaderModule { }
