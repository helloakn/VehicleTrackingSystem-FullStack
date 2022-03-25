
import React, { useEffect, useRef,MouseEvent } from "react"


import Link from 'next/link'
import Authorization from '../authorization';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import styles from './../../styles/DashboardLayout.module.css'


import Header from '../header';


let APP_DOMAIN = publicRuntimeConfig.NEXT_PUBLIC_AppDomain;


interface IMainLayout {
    children: React.ReactNode;
    head:React.ReactNode;
    title:string;
    activePage:string;
    pageName:string;
    buttons:string;
 }

export default function DashboardLayout({ children, ...props }:IMainLayout) {
    const [state, setState] = React.useState({
        admin_name:""
    });

    useEffect(() => {
        let auth = new Authorization();
        let getAuthUser =auth.getAuthUser();
        setState({ ...state, 'admin_name':getAuthUser.name });
    }, []);

    function LogOut(e:MouseEvent){
        e.preventDefault();
        //alert('haha');
       // return;
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        
        document.location="/";
    }
    
    return (
    <>
        {
        props.head?
            props.head:
            <Header title={props.title} />
        }
  


        {/* Start Body */ }
            <div className={styles.mainContainer}> 
                <div className={styles.header}> 
                    <div>Vehicle Tracking System</div>
                    <div>Welcome : {state.admin_name}</div>
                </div>
                <div className={styles.body}> 
                    <div className={styles.navigation}> 
                            <Link href="/vehicle" >
                            
                                <a className={props.activePage=="vehicle"?styles.activeMenu:styles.menu}>
                                    <i className="fas fa-car" style={{fontSize:25}}></i>
                                    <label>Vehicle</label>
                                </a>
                            </Link>

                            <Link href="/vehicle-type" >
                                <a className={props.activePage=="vehicle-type"?styles.activeMenu:styles.menu}>
                                    <i className="fas fa-cubes" style={{fontSize:25}}></i>
                                    <label>Vehicle Type</label>
                                </a>
                            </Link>

                            <Link href="/gps-adapter" >
                            
                                <a className={props.activePage=="gps-adapter"?styles.activeMenu:styles.menu}>
                                <i className="fas fa-location-arrow" style={{fontSize:25}}></i>
                                    <label>Gps Adapter</label>
                                </a>
                            </Link>
                            
                       
                            <Link href="/owner" >
                            
                                <a className={props.activePage=="owner"?styles.activeMenu:styles.menu}>
                                    <i className="fas fa-user-tie" style={{fontSize:25}}></i>
                                    <label>Owner</label>
                                </a>
                            </Link>

                            <Link href="/admin" >
                                <a className={props.activePage=="admin"?styles.activeMenu:styles.menu}>
                                    <i className="fas fa-user-shield" style={{fontSize:25}}></i>
                                    <label>Admin</label>
                                </a>
                            </Link>

                            <Link href="/logout" >
                                <a className={props.activePage=="logout"?styles.activeMenu:styles.menu} onClick={LogOut}>
                                    <i className="fas fa-power-off" style={{fontSize:25,color:"#96293b",marginTop:90}}></i>
                                    <label style={{color:"red"}}>LogOut</label>
                                </a>
                            </Link>
                    </div> 
                    <div className={styles.bodyRight}> 
                        <div className={styles.bodyHeader}> 
                            {props.pageName} {props.buttons} 
                        </div> 
                        <div className={styles.bodyContainer}> 
                            {children}
                        </div> 
                    </div> 
                </div>
            </div>
        {/* END Body */ }
       
    </>
    )//end return
}//send class
