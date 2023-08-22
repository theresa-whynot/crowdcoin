import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import HeaderCC from './Header';

const Layout = (props) => {
    return (
        <Container>
            <Head>
                <title>CrowdCoin</title>
                <link rel="icon" href="/favicon.ico" />
            <link
                async
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
            </Head>
            <HeaderCC/>
            {props.children}
        </Container>
    )
}

export default Layout;

