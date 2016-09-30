/**
 * Created by Fabian on 29/09/2016.
 */
export class LoginResponse{
    ".expires": Date;
    ".issued": Date
    access_token: string;
    refresh_token: string;
    "as:client_id": string;
    expires_in: number;
    token_type: string;
    userName: string;
}