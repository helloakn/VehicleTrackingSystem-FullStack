
import React, { useEffect, useRef } from "react"

import Script from 'next/script'
import Link from 'next/link'

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import styles from './../../styles/MainLayout.module.css'
//import styles from '../styles/MainLayout.module.css'



import Header from '../header';


let APP_DOMAIN = publicRuntimeConfig.NEXT_PUBLIC_AppDomain;

interface IProps {
    head: string;
    
 }

interface IMainLayout {
    children: React.ReactNode;
    head:React.ReactNode;
    title:string;
 }

export default function MainLayout({ children, ...props }:IMainLayout) {
    
    return (
    <>
        {
        props.head?
            props.head:
            <Header title={props.title} />
        }
  


        {/* Start Body */ }
            <div className={styles.mainContainer}> 
            {children}  
            </div>
        {/* END Body */ }
       
    </>
    )//end return
}//send class
