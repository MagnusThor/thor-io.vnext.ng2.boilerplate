import { Routes, RouterModule } from '@angular/router';

import { ChatComponent }   from './chat.component';

const chat_routes: Routes = [
  { 
    path: '', 
    component: ChatComponent
    
  }
];

export const chat_routing = RouterModule.forChild(chat_routes);
