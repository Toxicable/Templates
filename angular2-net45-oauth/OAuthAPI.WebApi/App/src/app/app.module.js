"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Fabian on 24/09/2016.
 */
var core_1 = require('@angular/core');
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var auth_1 = require("../auth");
var home_component_1 = require("./home/home.component");
var not_found_component_1 = require("./not-found/not-found.component");
var navigation_component_1 = require("./navigation/navigation.component");
var alert_component_1 = require("./alert/alert.component");
var alert_service_1 = require("./alert/alert.service");
var auth_http_service_1 = require("../auth/auth-http.service");
var admin_module_1 = require("../admin/admin.module");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                auth_1.AuthModule,
                admin_module_1.AdminModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                not_found_component_1.NotFoundComponent,
                navigation_component_1.NavigationComponent,
                alert_component_1.AlertComponent
            ],
            providers: [auth_1.AuthService, auth_http_service_1.AuthHttp, alert_service_1.AlertService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map