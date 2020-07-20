import React, { useEffect } from "react";
import Router from 'next/router'
import dynamic from "next/dynamic";
import { NextPage, NextPageContext } from 'next'
import Planner from '../components/Planner';
import withData from "../plugins/apollo";
import { parseCookies } from '../utils/cookies';
import { isEmpty, get } from "lodash";
import {CookieProps} from "../utils/interfaces";

const LoginPage = dynamic( () => import('./login') );

const Index: NextPage<CookieProps | undefined> = ( { id, code, name }: CookieProps ) => {

    useEffect(() => {
        if (id) return;
        Router.replace("/", "/login", { shallow: true });
    }, [id]);

    if( isEmpty(id) || isEmpty(code) ) {
        return <LoginPage />;
    }
    return <Planner id={id} code={code} name={name}/>
}

Index.getInitialProps = async ( { req }: NextPageContext ) => {
    try {
        const cookies = parseCookies( req );
        const student: CookieProps =  JSON.parse( cookies.student );
        console.log( student );
        return student;
    } catch (e) {
        return { id: undefined }
    }
}

export default withData ( Index );
