/**
 * Created by Fabian on 5/10/2016.
 */
export interface TokenResult{
    access_token: string;
    refresh_token: string;
    "as:client_id": string;
    ".issued": string;
    ".expires": string;
    expires_in: number;
    token_type: string;
}