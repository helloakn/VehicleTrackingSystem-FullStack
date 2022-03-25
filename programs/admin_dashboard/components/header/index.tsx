import React, { useEffect, useRef } from "react"

import Script from 'next/script'
import Head from 'next/head'
import getConfig from 'next/config';

const { serverRuntimeConfig,publicRuntimeConfig } = getConfig()
let APP_DOMAIN = publicRuntimeConfig.NEXT_PUBLIC_AppDomain;
export default function Header({...props }) {

    return (
        <Head>
            <title>{props.title?props.title:"Vehicle Tracking System : Admin Dashboard"}</title>
            <base href={APP_DOMAIN} />
            
            <meta name="a.validate.02" content="YaNi53bzv7MsOb9ZmhTMGEKxy7Rn3I_ZoIYa" />

            <link rel="icon" href="/media/logo.svg" />
            <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.13.1/css/all.css"
            integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q"
            crossOrigin="anonymous"
            />
        

        </Head>
    )
}
