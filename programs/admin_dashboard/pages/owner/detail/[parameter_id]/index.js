//import type { NextPage } from 'next'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import getConfig from 'next/config';
const { serverRuntimeConfig,publicRuntimeConfig } = getConfig();
const Swal = require('sweetalert2');

import DashboardLayout from '../../../../components/layouts/dashboardlayout'

import Header from '../../../../components/header';
import styles from '../../../../styles/vehicle.module.css';

import Authorization from '../../../../components/authorization';

  function DetailPage({ query }) {
  
    const router = useRouter()
    const { parameter_id } = router.query
    console.log(parameter_id);
    const [state, setState] = React.useState({
        vehicle_no: "",
        vehicle_type: "",
        gps_adapter:"",
        owner_name:""
    });

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
      if (!parameter_id) {
        return;
      }
    let auth = new Authorization();
    let authUser =auth.getAuthUser();
    const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "vehicle/getdetail/"+parameter_id;
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
    }, [parameter_id]);//end useEffect

    function handleChange(e) {
        if (e.target.files) {
            setState({ ...state, [e.target.name]: e.target.files[0] });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
    }
    
   

    if (!data) return(
        <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div style={{display:"flex",alignItems: 'center',justifyContent: 'center'}}>
          <i className="fas fa-car" style={{marginRight:5,fontSize:30,color:"#56A0B8"}}></i>
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
    >
           <div className={styles.mainContainer}>
            Loading...
           </div>
        </DashboardLayout>
      );
    console.log(data.data);
    
  return (
    <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div style={{display:"flex",alignItems: 'center',justifyContent: 'center'}}>
          <i className="fas fa-car" style={{marginRight:5,fontSize:30,color:"#56A0B8"}}></i>
          <label style={{fontSize:12}}>Vehicle : Detail for ID {data.data.id}</label></div>}
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
    >
       <div className={styles.mainContainer}>
            <form className="frmVehicle">
                <div className="frmRow" style={{flexDirection:"row"}}>
                    <div style={{display:"flex",flexDirection:"row",width:"50%"}}>
                      <label>Vehicle No : </label>
                      <div style={{color:"gray"}}> &nbsp;{data.data.vehicle_no}</div>
                    </div>
                
                    
                    <div style={{display:"flex",flexDirection:"row",width:"50%"}}>
                      <label>Vehicle Type :</label>
                      <div style={{color:"gray"}}> &nbsp;{data.data.vehicle_type}</div>
                    </div>
                    
                </div>
                
                <div className="frmRow" style={{flexDirection:"row"}}>
                    <div style={{display:"flex",flexDirection:"row",width:"50%"}}>
                      <label>GPS Adapter : </label>
                      <div style={{color:"gray"}}> &nbsp;{data.data.gps_model}</div>
                    </div>
                    
                  <div style={{display:"flex",flexDirection:"row",width:"50%"}}>
                      <label>Owner Name :</label>
                      <div style={{color:"gray"}}>&nbsp; {data.data.owner_name}</div>
                    </div>
                </div>
            </form>
           
          
       </div>
    </DashboardLayout>
  )
}

export default DetailPage
