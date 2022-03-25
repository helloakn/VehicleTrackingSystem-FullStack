//import type { NextPage } from 'next'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import getConfig from 'next/config';
const { serverRuntimeConfig,publicRuntimeConfig } = getConfig();
const Swal = require('sweetalert2');

import DashboardLayout from '../../components/layouts/dashboardlayout'
import Header from '../../components/header';
import styles from '../../styles/vehicle.module.css';

import Authorization from '../../components/authorization';

export default function NewAdmin({ query }) {

    const [state, setState] = React.useState({
      name:"",
      email:"",
      password:""
    });

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
    
    }, []);//end useEffect

    function handleChange(e) {
        if (e.target.files) {
            setState({ ...state, [e.target.name]: e.target.files[0] });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
    }
    
    const formSubmitEvent = async event => {
        event.preventDefault() // don't redirect the page
        let auth = new Authorization();
        let authUser =auth.getAuthUser();
        const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "admin/create";
        
        const res = await fetch(_url, {
          body: JSON.stringify({
            name: state.name,
            email: state.email,
            password: state.password,
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token':authUser.token
          },
          method: 'POST'
        });
        let result = await res.json();console.log(result);

        if(result.code !=200){
          let tmpHtml = "";
          for (const [key, value] of Object.entries(result.error)) {
            tmpHtml += value.map(function(element,i){
              return element+"<br/>";
            });
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#3175b7',
            showCancelButton: false,
            html: tmpHtml,
            confirmButtonText : "Ok"
          })
        }else{
          let responseData = JSON.stringify(result.data);
          console.log(responseData);
          document.location = "/admin";
        }
      }//end login event

    
  return (
    <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div style={{display:"flex",alignItems: 'center',justifyContent: 'center'}}>
          <i className="fas fa-user-shield" style={{marginRight:5,fontSize:30,color:"#0f4e62"}}></i>
          <label style={{fontSize:12}}>Admin : SetUp</label></div>}
        buttons={
          <div>
            <Link href="/admin">
              <a className="btn-light">
                <i className="fas fa-chevron-circle-left"></i>
                <label>Back</label>
              </a>
            </Link>
          </div>
        }
        activePage="admin"
    >
       <div className={styles.mainContainer}>
            <form className="frmVehicle" onSubmit={formSubmitEvent} style={{marginTop:-200}}>
                <div className="frmRow">
                    <label>Admin Name *</label>
                    <input 
                  type="text" 
                  className="textBox"
                  placeholder="Admin Name" 
                  name="name" 
                  onChange={handleChange}
                  value={state.owner_name}
                />
                </div>
                <div className="frmRow">
                    <label>eMail *</label>
                    <input 
                  type="text" 
                  className="textBox"
                  placeholder="email address" 
                  name="email" 
                  onChange={handleChange}
                  value={state.email}
                />
                </div>
                <div className="frmRow">
                    <label>Password *</label>
                    <input 
                  type="text" 
                  className="textBox"
                  placeholder="password" 
                  name="password" 
                  onChange={handleChange}
                  value={state.password}
                />
                </div>
                

                <div className="frmRow" style={{flexDirection:"row-reverse",marginBottom:10}}>
                    <button className="btn-confirm">
                        Save
                    </button>
                    <Link href="/admin">
                        <a className="btn-confirm" style={{backgroundColor:"#ffffff",color:"#60abc4",marginRight:20}}>
                            
                               Back
                        </a>
                    </Link>
                </div>
            </form>
           
          
       </div>
    </DashboardLayout>
  )
}

