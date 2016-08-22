import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { app_routing } from './app.routing';
import { SharedModule }   from './shared/shared.module';

import { ChatModule } from './chat/chat.module';

import { ChatService } from './shared/services/chat.service';
import {ConnectionProvider} from './providers/thor-io.connection.provider'


@NgModule({
  imports:      [ BrowserModule,app_routing, 
                   SharedModule.forRoot(),ChatModule ],
  declarations: [ AppComponent ],
  providers:    [ ChatService,ConnectionProvider ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {


 }
