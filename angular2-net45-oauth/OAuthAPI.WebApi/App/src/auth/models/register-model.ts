﻿export class RegisterModel {
    constructor(userName: String, password: String, confirmPassword: String) {
        this.userName = userName;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }s
    userName: String;
    password: String;
    confirmPassword: String;
}