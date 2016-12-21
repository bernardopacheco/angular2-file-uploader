import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FileSelectDirective }  from './file-select.directive';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ FileSelectDirective ]
})
export class AppModule { }
