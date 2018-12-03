"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app.component");
const app_routing_1 = require("./app.routing");
const shared_module_1 = require("./shared/shared.module");
const conference_module_1 = require("./conference/conference.module");
const conference_service_1 = require("./shared/services/conference.service");
const thor_io_connection_provider_1 = require("./providers/thor-io.connection.provider");
const http_1 = require("@angular/http");
const common_1 = require("@angular/common");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_1.app_routing,
            shared_module_1.SharedModule.forRoot(), conference_module_1.ConferenceModule, http_1.HttpModule, http_1.JsonpModule],
        declarations: [app_component_1.AppComponent],
        providers: [thor_io_connection_provider_1.ConnectionProvider, conference_service_1.ConferenceService, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map