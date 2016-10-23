/**
 * Created by Fabian on 21/10/2016.
 */
import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {HttpExceptions} from "../core/http-exceptions/http-exceptions";

@Injectable()
export class UserService{
    constructor(private authHttp: AuthHttp


    ){}

    getUsers(){
        return this.authHttp.get('/api/users/getUsers')
            .catch( error => HttpExceptions.handleError(error))
    }

}