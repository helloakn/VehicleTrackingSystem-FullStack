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

function NewVehicle({ query }) {

    const [state, setState] = React.useState({
        vehicle_no: "",
        vehicle_type: "",
        gps_adapter:"",
        owner_name:""
    });

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
    
    let auth = new Authorization();
    let authUser =auth.getAuthUser();
    const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "vehicle/getfilter";
    setLoading(true);

    fetch(_url,{
        headers: {
        'Content-Type': 'application/json',
        'x-access-token':authUser.token
        },
        method: 'POST'
    })
        .then((res) => res.json())
        .then((data) => {
        setData(data)
        setLoading(false)
        })
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
        const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "vehicle/register";
        
        const res = await fetch(_url, {
          body: JSON.stringify({
            owner_id: state.owner_name,
            vehicle_type_id: state.vehicle_type,
            gps_adapter_id: state.gps_adapter,
            vehicle_no: state.vehicle_no
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
          document.location = "/vehicle";
        }
      }//end login event

    if (!data) return(
        <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div style={{display:"flex",alignItems: 'center',justifyContent: 'center'}}>
          <i className="fas fa-car" style={{marginRight:5,fontSize:30,color:"#0f4e62"}}></i>
          <label style={{fontSize:12}}>Vehicle : Register New Vehicle</label></div>}
        buttons={
          <div>
            <Link href="/vehicle">
              <a className="btn-light">
                <i className="fas fa-chevron-circle-left"></i>
                <label>Back</label>
              </a>
            </Link>
          </div>
        }
        activePage="vehicle"
    >
           <div className={styles.mainContainer}>
            Loading...
           </div>
        </DashboardLayout>
      );
    console.log(data.data);
    let ownerList = data.data.owner.map(function(element,index){
        return(
            <option key={"owner"+element.id} value={element.id} >{element.name}</option>
        );
    });//end ownerList
    let vehicleTypeList = data.data.vehicleType.map(function(element,index){
        return(
            <option key={"ownvehicletypeer"+element.id} value={element.id} >{element.name}</option>
        );
    });//end vehicleTypeList
    let gpsAdapterList  = data.data.gpsAdapter.map(function(element,index){
        return(
            <option  key={"gpsadapter"+element.id} value={element.id} >{element.model}</option>
        );
    });//end vehicleTypeList
  return (
    <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div style={{display:"flex",alignItems: 'center',justifyContent: 'center'}}>
          <i className="fas fa-car" style={{marginRight:5,fontSize:30,color:"#0f4e62"}}></i>
          <label style={{fontSize:12}}>Vehicle : Register New Vehicle</label></div>}
        buttons={
          <div>
            <Link href="/vehicle">
              <a className="btn-light">
                <i className="fas fa-chevron-circle-left"></i>
                <label>Back</label>
              </a>
            </Link>
          </div>
        }
        activePage="vehicle"
    >
       <div className={styles.mainContainer}>
            <form className="frmVehicle" onSubmit={formSubmitEvent}>
                <div className="frmRow">
                    <label>Vehicle No *</label>
                    <input 
                  type="text" 
                  className="textBox"
                  placeholder="Vehicle Number" 
                  name="vehicle_no" 
                  onChange={handleChange}
                  value={state.vehicle_no}
                />
                </div>
                
                <div className="frmRow">
                    <label>Vehicle Type *</label>
                    <select 
                        type="text" 
                        className="textBox" 
                        name="vehicle_type" 
                        onChange={handleChange}
                        value={state.vehicle_type}
                    >
                        <option key="o1" value="0"> Select Vehicle Type </option>
                        {vehicleTypeList}
                    </select>
                </div>
                <div className="frmRow">
                    <label>GPS Adapter *</label>
                    <select 
                        type="text" 
                        className="textBox"
                        placeholder="Vehicle Number" 
                        name="gps_adapter" 
                        onChange={handleChange}
                        value={state.gps_adapter}
                    >
                        <option key="g1" value="0"> Select GPS Adapter </option>
                        {gpsAdapterList}
                    </select>
                </div>

                <div className="frmRow">
                    <label>Owner Name *</label>
                    <select 
                        type="text" 
                        className="textBox"
                        placeholder="Vehicle Number" 
                        name="owner_name" 
                        onChange={handleChange}
                        value={state.owner_name}
                    >
                        <option key="v1" value="0"> Select Owner </option>
                        {ownerList}
                    </select>
                </div>

                <div className="frmRow" style={{flexDirection:"row-reverse",marginBottom:10}}>
                    <button className="btn-confirm">
                        Save
                    </button>
                    <Link href="/vehicle">
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

export default NewVehicle
