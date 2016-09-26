export class LoginModel {
    constructor(userName: String, password: String, confirmPassword: String) {
        this.userName = userName;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    userName: String;
    password: String;
    confirmPassword: String;
}