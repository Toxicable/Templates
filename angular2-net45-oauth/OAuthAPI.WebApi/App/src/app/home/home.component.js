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
 * Created by Fabian on 30/09/2016.
 */
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var alert_service_1 = require("../alert/alert.service");
var auth_http_service_1 = require("../../auth/auth-http.service");
var HomeComponent = (function () {
    function HomeComponent(router, alertService, authHttp) {
        this.router = router;
        this.alertService = alertService;
        this.authHttp = authHttp;
        this.testResult = "";
    }
    HomeComponent.prototype.testAuth = function () {
        var _this = this;
        this.authHttp.get("api/accounts/isauthenticated")
            .then(function (x) { return console.log(x); }, function (res) {
            _this.alertService.sendAlert("Your are not logged in");
            //this.router.navigateByUrl("/auth/login")
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './home.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, alert_service_1.AlertService, auth_http_service_1.AuthHttp])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map