import * as express from 'express';
import * as bodyParser from "body-parser";
import { authSession } from "./plugins/authSession";

const server = express();
const port = 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.post( '/login', authSession );

server.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
