/**
 * Created by Fabian on 6/10/2016.
 */
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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var admin_routes_1 = require("./admin.routes");
var roles_component_1 = require("./roles/roles.component");
var auth_http_service_1 = require("../auth/auth-http.service");
var core_1 = require('@angular/core');
var admin_component_1 = require("./admin.component");
var users_component_1 = require("./users/users.component");
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                admin_routes_1.adminRouting
            ],
            declarations: [
                admin_component_1.AdminComponent,
                roles_component_1.RolesComponent,
                users_component_1.UsersComponent
            ],
            providers: [auth_http_service_1.AuthHttp],
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map