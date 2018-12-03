"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const conference_component_1 = require("./conference.component");
const conference_routes = [
    { path: '', pathMatch: 'full', redirectTo: '/conference' },
    { path: 'join/:slug', component: conference_component_1.ConferenceComponent },
    { path: 'conference', component: conference_component_1.ConferenceComponent },
];
exports.conference_routing = router_1.RouterModule.forChild(conference_routes);
//# sourceMappingURL=conference.routing.js.map