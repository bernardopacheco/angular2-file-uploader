import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSelectDirective } from './file-select.directive';
import { FileUploaderService } from './file-uploader.service';
import { FileValidatorService } from './file-validator.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ FileSelectDirective ],
  providers: [ FileUploaderService, FileValidatorService ],
  exports: [ FileSelectDirective, CommonModule ]
})
export class FileUploaderModule { }
