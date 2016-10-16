import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {BadRequest, BadTokenRequest} from "./models";
/**
 * Created by Fabian on 11/10/2016.
 */
export class HttpExceptions{

    private catchErrorCodes(errorResponse){

    }

    public static handleError (res: Response) {
        //TODO: add logging here

        switch (res.status){
            case 400:
                return HttpExceptions.handleBadRequest(res)
        }
    }

    public static handleTokenBadRequest(res: Response) {
        //bad request
        let badRequest = res.json() as BadTokenRequest;
        let error = badRequest.error_description

        //need to put it in an array since that's what's expected everywhere to kee pit consistant
        return Observable.throw([error])
    }

    private static handleBadRequest(res: Response) {
        //bad request
        let badRequest = res.json() as BadRequest;
        let errors = badRequest.modelState[""].map(x => x);

        return Observable.throw(errors)
    }


}