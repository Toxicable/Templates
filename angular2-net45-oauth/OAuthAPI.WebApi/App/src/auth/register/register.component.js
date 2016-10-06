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
var forms_1 = require('@angular/forms');
var auth_service_1 = require("../auth.service");
var validation_service_1 = require("../../app/validation/validation.service");
var alert_service_1 = require("../../app/alert/alert.service");
var router_1 = require("@angular/router");
var RegisterComponent = (function () {
    function RegisterComponent(formBuilder, authService, alertService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.alertService = alertService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            userName: ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            passwords: this.formBuilder.group({
                password: ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]],
                confirmPassword: ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]]
            }, { validator: validation_service_1.ValidationService.passwordComparisonValidator })
        });
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = Object.assign({}, this.registerForm.value, this.registerForm.value.passwords);
        //TODO: find better way to do this :/
        this.authService.register(data)
            .then(function (x) {
            _this.alertService.sendAlert("Successfully registered");
            _this.router.navigateByUrl("/auth/login");
        }, function (x) {
            _this.alertService.sendAlert("And error has occured: " + x);
        });
    };
    ;
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: './register.template.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, auth_service_1.AuthService, alert_service_1.AlertService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map