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
 * Created by Fabian on 2/10/2016.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var auth_http_result_1 = require("../auth-http/models/auth-http-result");
var auth_service_1 = require("./auth.service");
var AuthHttp = (function () {
    function AuthHttp(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    AuthHttp.prototype.get = function (endpoint) {
        var _this = this;
        return this.authService.tryGetAccessToken()
            .then(function (token) {
            var options = _this.getHeaders(token);
            return _this.http.get(endpoint, options).toPromise();
        }, function (res) { return Promise.reject("refresh_token expired"); });
    };
    AuthHttp.prototype.post = function (endpoint, data) {
        var _this = this;
        return this.authService.tryGetAccessToken()
            .then(function (token) {
            var options = _this.getHeaders(token);
            return _this.http.post(endpoint, data, options).toPromise();
        }, function (res) { return Promise.reject("refresh_token expired"); });
    };
    AuthHttp.prototype.getHeaders = function (accessToken) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        });
        return new http_1.RequestOptions({ headers: headers });
    };
    AuthHttp.prototype.handleError = function (response) {
        //TODO: Add logging here
        console.log("Server Error: ");
        console.log(response);
        var res = response.json();
        var result = new auth_http_result_1.AuthHttpResult();
        result.errors = res.modelState[""].map(function (x) { return x; });
        return Promise.reject("man, something went wrong here soz :/");
    };
    AuthHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], AuthHttp);
    return AuthHttp;
}());
exports.AuthHttp = AuthHttp;
//# sourceMappingURL=auth-http.service.js.map