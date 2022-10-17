import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head><title>Find Locations</title></Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Document