import { Routes, RouterModule } from '@angular/router';

import { ConferenceComponent }   from './conference.component';

const conference_routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/conference' },
  { path: 'join/:slug', component: ConferenceComponent},
  { path: 'conference', component: ConferenceComponent},
  
];

export const conference_routing = RouterModule.forChild(conference_routes);
