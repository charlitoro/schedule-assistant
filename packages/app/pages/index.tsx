import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { NextPage, NextPageContext } from 'next'
import Planner from '../components/Planner';
import withData from "../plugins/apollo";
import { parseCookies } from '../utils/cookies';

const LoginPage = dynamic( () => import('./login') );

interface Props {
    loggedStudent: string;
}

const Index: NextPage<Props> = ( { loggedStudent }: Props ) => {
    if( !loggedStudent ) {
        return <LoginPage />;
    }
    return <Planner />
}

Index.getInitialProps = async ( { req }: NextPageContext ) => {
    const cookies = parseCookies( req );
    return { loggedStudent: cookies.studentId };
}

export default withData ( Index );
