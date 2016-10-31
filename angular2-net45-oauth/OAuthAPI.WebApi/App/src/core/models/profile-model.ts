/**
 * Created by Fabian on 5/10/2016.
 */
export interface ProfileModel{
    aud: string;
    exp: number;
    iss: string;
    nameid: string;
    unique_name: string;
    email_confirmed: boolean;
    roles: string[];
    first_name: string;
    last_name: string;
}