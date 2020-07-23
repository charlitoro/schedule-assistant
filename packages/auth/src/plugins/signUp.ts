import {Request, Response} from "express";
import { genSaltSync, hashSync } from 'bcrypt';
import {get, isUndefined, set} from "lodash";
import {API_URL, IUserSignUp, mutationCreateStudent, SALT_ROUNDS} from "../utils/commons";
import fetch from "node-fetch";

const encryptPassword = async( password: string ) => {
    const salt = genSaltSync(SALT_ROUNDS);
    return  hashSync(password, salt);
}

const createStudent = async ( origin: string, clientId: string, data: IUserSignUp ) => {
    set( data, 'password', await encryptPassword( get( data, 'password' ) ) )
    const response = await fetch( API_URL, {
        method: 'POST',
        headers: { 'Authorization': clientId, 'origin': origin },
        body: JSON.stringify( {
            query: mutationCreateStudent,
            variables: data
        } )
    } ).then( res => res.json() )
    if( get( response, 'errors' ) ){
        throw { statusCode: 400, message: 'Student was not created' };
    }
    return get( response, 'data.createStudent' );
}

export const signUp = async ( req: Request, res: Response ) => {
    const statusResponse: any = { statusCode: 502, message: 'Internal server error' };
    try {
        const clientId: string = get( req, 'headers.authorization' );
        const origin: string = get( req, 'headers.origin', '*' );
        if( isUndefined( clientId ) ) {
            statusResponse.statusCode = 400;
            statusResponse.message = 'Bad Request, not client id in headers';
            throw statusResponse;
        }
        const studentSignUpData: IUserSignUp = get( req, 'body' );
        const idStudent = await createStudent( origin, clientId, studentSignUpData );
        res.status(200).json( idStudent );
    } catch (error) {
        console.log( error.message );
        res.status( error.statusCode ).send( error.message );
    }
}
