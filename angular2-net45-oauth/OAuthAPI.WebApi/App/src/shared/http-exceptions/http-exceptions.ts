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
        let errors = badRequest.error_description

        return Observable.throw([errors])
    }

    private static handleBadRequest(res: Response) {
        //bad request
        let badRequest = res.json() as BadRequest;
        let errors = badRequest.modelState[""].map(x => x);

        return Observable.throw(errors)
    }


}