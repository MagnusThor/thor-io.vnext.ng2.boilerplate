"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const APP_ROUTES = [
// { path: 'conference', loadChildren: 'app/conference/conference.module'},
// { path: ' join/:slug',loadChildren: 'app/conference/conference.module'},
// { path: '**', pathMatch:'full', redirectTo: '/conference' } 
];
exports.app_routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map