import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { app_routing } from './app.routing';
import { SharedModule }   from './shared/shared.module';
import { ConferenceModule } from './conference/conference.module';
import { ConferenceService } from './shared/services/conference.service'
import {ConnectionProvider} from './providers/thor-io.connection.provider'
import { HttpModule,JsonpModule } from '@angular/http';

import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';



@NgModule({
  imports:      [ BrowserModule,app_routing, 
                   SharedModule.forRoot(),ConferenceModule,HttpModule,JsonpModule ],

  declarations: [ AppComponent ],
  providers:    [ ConnectionProvider,ConferenceService,{provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {


 }
