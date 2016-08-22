"use strict";
var router_1 = require('@angular/router');
var APP_ROUTES = [
    { path: 'chat', loadChildren: 'app/chat/chat.module' },
    { path: '**', pathMatch: 'full', redirectTo: '/chat' }
];
exports.app_routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map