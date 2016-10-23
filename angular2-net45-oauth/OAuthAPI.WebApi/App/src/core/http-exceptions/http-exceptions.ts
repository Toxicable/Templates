import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BadTokenRequest} from "./models/bad-token-request";
import {BadRequest} from "./models/bad-request";
/**
 * Created by Fabian on 11/10/2016.
 */

@Injectable()
export class HttpExceptions{

    // private catchErrorCodes(errorResponse){
    //
    // }

    public handleError (res: Response) {
        //TODO: add logging here

        switch (res.status){
            case 400:
                return this.handleBadRequest(res);
            case 500:
                return this.handleInternalServerError(res);
            default:
                Observable.throw(["an Unhandled error occured"])
        }
    }

    public handleInternalServerError(res: Response){
        console.log(res);

        return Observable.throw(res);
    }
    public handleTokenBadRequest(res: Response) {
        //bad request
        let badRequest = res.json() as BadTokenRequest;
        let error = badRequest.error_description

        //need to put it in an array since that's what's expected everywhere to kee pit consistant
        return Observable.throw([error])
    }

    private handleBadRequest(res: Response) {
        //bad request
        let badRequest = res.json() as BadRequest;
        let errors = badRequest.modelState[""];//.map(x => x);

        return Observable.throw(errors)
    }


}