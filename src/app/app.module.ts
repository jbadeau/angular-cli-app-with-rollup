//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyCommonModule } from './common/common.module';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule, MyCommonModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
