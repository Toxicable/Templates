import {Response} from "@angular/http";
import {AuthHttpResult} from "../../auth/models/auth-http-result";
/**
 * Created by Fabian on 11/10/2016.
 */
export class HttpExceptions{

    private handleError (response: Response) {
        //TODO: Add logging here
        console.log("Server Error: ");
        console.log(response);

        let res = response.json();
        let result = new AuthHttpResult();
        result.errors = res.modelState[""].map(x => x);

        return Promise.reject("man, something went wrong here soz :/");
    }
}