/**
 * Created by Fabian on 25/09/2016.
 */
import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class AuthService {
    constructor(private http: Http) {}

    private baseUrl = "http://localhost:51475/api/";

    private getTokena(): Promise<any> {
        return this.http.get(this.baseUrl )
            .toPromise()
            .then()
            .catch(this.handleError);
    }
    getToken(): Promise<any> {
        //let body = JSON.stringify(this.fakeModel);
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Accept': " "
        });
        let t = "username=fabianwiles@live.com&password=luv86tox8&confirmpassword=luv86tox8&grant_type=password";
        let y = {
            username: "fabianwiles@live.com",
            password: "luv86tox8",
            confirmpassword: 'luv86tox8',
            grant_type: 'password'
        };
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "token",  y, options)
            .toPromise()
            .then((res) => {
                console.log(res)
                let dataObject = res.json();
                localStorage.setItem("access_token", dataObject.access_token);
            })
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        console.log(res);
        let body = res.json();
        return body.data || { };
    }


    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}