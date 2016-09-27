export class LoginModel {
    constructor(userName: String, password: String, confirmPassword: String) {
        this.userName = userName;
        this.password = password;
    }
    userName: String;
    password: String;
}