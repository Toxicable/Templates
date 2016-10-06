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
 * Created by Fabian on 25/09/2016.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.logout = function () {
        this.removeTokens();
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.validateToken()
            .then(function () { return true; }, function () { return false; });
    };
    AuthService.prototype.login = function (user) {
        var _this = this;
        return this.getTokens(user, "password").then(function (res) {
            _this.storeTokens(res);
            return Promise.resolve();
        }, function (res) {
            return Promise.reject(res);
        });
    };
    AuthService.prototype.register = function (data) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("api/accounts/create", data, options)
            .toPromise()
            .then(function (res) { return Promise.resolve(); })
            .catch(function (res) {
            var model = res.json();
            return Promise.reject(model.modelState[""][0]);
        });
    };
    AuthService.prototype.isInRole = function (role) {
        //let profile = this.storeTokens();
        //if(model.hasOwnProperty("role")){
        //TODO: Implement roles server side
        //return role === model.role
        //  }
        return false;
    };
    AuthService.prototype.tryGetAccessToken = function () {
        var _this = this;
        return this.validateToken()
            .then(function () { return _this.retrieveAccessToken(); }, function (res) { return Promise.reject(res); });
    };
    AuthService.prototype.validateToken = function () {
        var _this = this;
        var jwtHelper = new angular2_jwt_1.JwtHelper();
        var token = this.retrieveAccessToken();
        if (!token) {
            return Promise.reject("Token does not exist");
        }
        if (!jwtHelper.isTokenExpired(token)) {
            //fires if it's not empty or expired
            return Promise.resolve();
        }
        return this.getTokens({ refresh_token: this.retrieveRefreshToken() }, "refresh_token")
            .then(function (res) {
            //we good to reset the token here
            _this.storeTokens(res);
            Promise.resolve();
        }, function () {
            //This should only occur when the refresh token has expired so we're good to redirect here
            //we should remove it though so we don't have to check again later
            _this.removeTokens();
            return Promise.reject("refresh token has expired");
        });
    };
    AuthService.prototype.storeTokens = function (model) {
        var jwtHelper = new angular2_jwt_1.JwtHelper();
        var profile = jwtHelper.decodeToken(model.access_token);
        localStorage.setItem("access_token", model.access_token);
        localStorage.setItem("refresh_token", model.refresh_token);
        localStorage.setItem("profile", JSON.stringify(profile));
    };
    AuthService.prototype.removeTokens = function () {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("refresh_token");
    };
    AuthService.prototype.retrieveAccessToken = function () {
        return localStorage.getItem("access_token");
    };
    AuthService.prototype.retrieveRefreshToken = function () {
        return localStorage.getItem("refresh_token");
    };
    AuthService.prototype.retrieveProfile = function () {
        return JSON.parse(localStorage.getItem("refresh_token"));
    };
    AuthService.prototype.getTokens = function (data, grantType) {
        //data can be any since it can either be a refresh token or login details
        //The request for tokens must be x-www-form-urlencoded IE: parameter string, it cant be json
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        Object.assign(data, {
            grant_type: grantType,
            client_id: "AngularApp"
        });
        return this.http.post("api/token", this.encodeObjectToParams(data), options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) {
            var model = res.json();
            return Promise.reject(model.error_description);
        });
    };
    AuthService.prototype.encodeObjectToParams = function (obj) {
        return Object.keys(obj)
            .map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); })
            .join('&');
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map