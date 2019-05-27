import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnsenModule } from 'ngx-onsenui';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as Pages from './pages';
import * as Services from './services';

@NgModule({
  declarations: [
    AppComponent,
    Pages.PuzzleGridComponent,
    Pages.PuzzleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnsenModule,
    MomentModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    Services.PuzzleService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
