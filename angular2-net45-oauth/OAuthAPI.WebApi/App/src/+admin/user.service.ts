import {Injectable} from "@angular/core";
import {AuthApiService} from "../core/services/auth-api.service";

@Injectable()
export class UserService{
    constructor(private api: AuthApiService
    ){}

    getUsers(){
        return this.api.get('/api/users/getUsers');
    }

}