import * as express from 'express';
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { authSession } from "./plugins/authSession";
import { signUp } from "./plugins/signUp";

const server = express();
const port = 5000;
const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'https://planner.charlitoro.com',
    preflightContinue: false
};

server.use(cors(options));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.post( '/login', authSession );
server.post( '/sign-up', signUp )

server.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
