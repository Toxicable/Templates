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
var core_1 = require('@angular/core');
var auth_service_1 = require('../auth.service');
var forms_1 = require("@angular/forms");
var alert_service_1 = require("../../app/alert/alert.service");
var validation_service_1 = require("../../app/validation/validation.service");
var LoginComponent = (function () {
    function LoginComponent(formBuilder, authService, alertService) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.alertService = alertService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            userName: ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            password: ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]],
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.authService.login(this.loginForm.value).then(function (res) {
            _this.alertService.sendAlert("Successfully logged in");
        }, function (res) { return _this.alertService.sendAlert(res); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login.template.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, auth_service_1.AuthService, alert_service_1.AlertService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map