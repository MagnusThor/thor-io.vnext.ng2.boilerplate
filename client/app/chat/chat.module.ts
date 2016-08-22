import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule }   from '../shared/shared.module';
import { ChatComponent} from './chat.component'

import { chat_routing } from './chat.routing';


@NgModule({
  imports:      [ CommonModule,chat_routing,SharedModule.forRoot()  ],
  declarations: [ ChatComponent ],
  exports:      [ ChatComponent ]
})
export class ChatModule { }