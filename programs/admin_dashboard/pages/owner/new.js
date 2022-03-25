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

export default function NewOwner({ query }) {

    const [state, setState] = React.useState({
        owner_name:""
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
        const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "owner/create";
        
        const res = await fetch(_url, {
          body: JSON.stringify({
            name: state.owner_name,
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
          document.location = "/owner";
        }
      }//end login event

    
  return (
    <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div style={{display:"flex",alignItems: 'center',justifyContent: 'center'}}>
          <i className="fas fa-user-tie" style={{marginRight:5,fontSize:30,color:"#0f4e62"}}></i>
          <label style={{fontSize:12}}>Owner : SetUp</label></div>}
        buttons={
          <div>
            <Link href="/owner">
              <a className="btn-light">
                <i className="fas fa-chevron-circle-left"></i>
                <label>Back</label>
              </a>
            </Link>
          </div>
        }
        activePage="owner"
    >
       <div className={styles.mainContainer}>
            <form className="frmVehicle" onSubmit={formSubmitEvent} style={{marginTop:-200}}>
                <div className="frmRow">
                    <label>Owner Name *</label>
                    <input 
                  type="text" 
                  className="textBox"
                  placeholder="Owner Name" 
                  name="owner_name" 
                  onChange={handleChange}
                  value={state.owner_name}
                />
                </div>
                

                <div className="frmRow" style={{flexDirection:"row-reverse",marginBottom:10}}>
                    <button className="btn-confirm">
                        Save
                    </button>
                    <Link href="/owner">
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

