/**
 * Created by Fabian on 21/10/2016.
 */
import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {HttpExceptions} from "../core/http-exceptions/http-exceptions";
import {LoadingBarComponent} from "../shared/loading-bar/loading-bar.component";
import {LoadingBarService} from "../core/common/loading-bar.service";
import { Observable }           from 'rxjs/Observable';

@Injectable()
export class RoleService{
    constructor(private authHttp: AuthHttp,
                private loader: LoadingBarService

    ){}

    removeFromRole(userId: string, roleId: string): Observable<any>{
        this.loader.load();
        return this.authHttp.post('/api/roles/removeFromRole', {userId, roleId})
            .finally(() =>this.loader.done())
            .catch( error => HttpExceptions.handleError(error))

    }

}