import { RouterModule, Routes } from '@angular/router';

const APP_ROUTES: Routes = [
  // { path: 'conference', loadChildren: 'app/conference/conference.module'},
  // { path: ' join/:slug',loadChildren: 'app/conference/conference.module'},
  // { path: '**', pathMatch:'full', redirectTo: '/conference' } 
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);