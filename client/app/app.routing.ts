import { RouterModule, Routes } from '@angular/router';

const APP_ROUTES: Routes = [
  { path: 'chat', loadChildren: 'app/chat/chat.module'},
  { path: '**', pathMatch:'full', redirectTo: '/chat' } 
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);