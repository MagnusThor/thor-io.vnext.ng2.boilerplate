"use strict";
var router_1 = require('@angular/router');
var APP_ROUTES = [
    { path: 'conference', loadChildren: 'app/conference/conference.module' },
    { path: '**', pathMatch: 'full', redirectTo: '/conference' }
];
exports.app_routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map