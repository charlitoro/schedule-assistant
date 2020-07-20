import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { get, isUndefined, omit } from 'lodash';
import { IUserLogin } from '../utils/interfaces';
import fetch from 'node-fetch';

const API_URL = 'https://rybk37gvz3.execute-api.us-east-1.amazonaws.com/prod/api';
const saltRounds = 10;

const queryAuthSession =`
query ($code: String){
  student(where:{code: $code}){
    id code name password
  }
}`;

const getUser = async ( origin: string, userLogin: IUserLogin, clientId: string ) => {
    const response = await fetch( API_URL, {
        method: 'POST',
        headers: { 'Authorization': clientId, 'origin': origin },
        body: JSON.stringify( {
            query: queryAuthSession,
            variables:{ code: userLogin.code }
        } )
    } ).then( res => res.json() )
    if( get( response, 'errors' ) ){
        throw new Error( 'Student not found' );
    }
    return get( response, 'data.student' );
}

export const authSession = async ( req: Request, res: Response ) => {
    const statusResponse: any = { statusCode: 502, message: 'Internal server error' };
    try {
        const clientId: string = get( req, 'headers.authorization' );
        const origin: string = get( req, 'headers.origin', '*' );
        if( isUndefined( clientId ) ) {
            statusResponse.statusCode = 400;
            statusResponse.message = 'Bad Request, not client id in headers';
            throw statusResponse;
        }
        const studentLogin: IUserLogin = get( req, 'body' );
        const student = await getUser( origin, studentLogin, clientId );
        const isValid = compareSync( studentLogin.password, student.password );
        if( isValid == false ){
            statusResponse.statusCode = 404;
            statusResponse.message = 'Student not found';
            throw statusResponse;
        }
        res.status(200).json( omit( student, ['password'] ) );
    } catch (error) {
        console.log( error.message );
        res.status( statusResponse.statusCode ).send( statusResponse.message );
    }
}