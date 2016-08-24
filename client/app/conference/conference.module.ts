import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule }   from '../shared/shared.module';
import { ConferenceComponent} from './conference.component'


import { conference_routing } from './conference.routing';


@NgModule({
  imports:      [ CommonModule,conference_routing,SharedModule.forRoot(),  ],
  declarations: [ ConferenceComponent ],
  exports:      [ ConferenceComponent ]
})
export class ConferenceModule { }