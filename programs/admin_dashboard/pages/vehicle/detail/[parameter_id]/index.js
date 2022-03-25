//import type { NextPage } from 'next'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'
import getConfig from 'next/config';
const { serverRuntimeConfig,publicRuntimeConfig } = getConfig();
const Swal = require('sweetalert2');

import HydrationPagination from '../../../../components/hydrationpagination';


import DashboardLayout from '../../../../components/layouts/dashboardlayout'

import Header from '../../../../components/header';
import styles from '../../../../styles/vehicle.module.css';

import Authorization from '../../../../components/authorization';

  function DetailPage({ query }) {
  
    const router = useRouter()
    const { parameter_id } = router.query
    
    const [state, setState] = React.useState({
        from_year: "2020",
        from_month: "01",
        from_day:"01",
        from_hour:"00",
        from_minute:"00",
        from_second:"00",

        to_year: "2020",
        to_month: "01",
        to_day:"01",
        to_hour:"00",
        to_minute:"00",
        to_second:"00",

        page_at:1,
        row_count:5
    });
    let _page_at = 1;

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [value, onChange] = useState(new Date());

    let years = [2020,2021,2022,2023];
    let months = [1,2,3,4,5,6,7,8,9,10,11,12];
    let days = [
                  1,2,3,4,5,6,7,8,9,10,
                  11,12,13,14,15,16,17,18,19,20,
                  21,22,23,24,25,26,27,28,29,30,31
                ];
    let hours = [
                  0,1,2,3,4,5,6,7,8,9,10,
                  11,12,13,14,15,16,17,18,19,20,
                  21,22,23
                ]; 
    let minutes = [
                  0,1,2,3,4,5,6,7,8,9,10,
                  11,12,13,14,15,16,17,18,19,20,
                  21,22,23,24,25,26,27,28,29,30,
                  31,32,33,34,35,36,37,38,39,40,
                  41,42,43,44,45,46,47,48,49,50,
                  51,52,53,54,55,56,57,58,59
                ]; 
    let seconds = [
                  0,1,2,3,4,5,6,7,8,9,10,
                  11,12,13,14,15,16,17,18,19,20,
                  21,22,23,24,25,26,27,28,29,30,
                  31,32,33,34,35,36,37,38,39,40,
                  41,42,43,44,45,46,47,48,49,50,
                  51,52,53,54,55,56,57,58,59
                ];            
    
    useEffect(() => {
      if (!parameter_id) {
        return;
      }
    let auth = new Authorization();
    let authUser =auth.getAuthUser();
    const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "vehicle/getdetail/"+parameter_id;
    setLoading(true);
    let body = {
      from_date: '2020-03-11 23:47:00',
      to_date: '2020-03-11 23:47:00',
      page_at: 1,
      row_count: 5
    };
    fetch(_url,{
        headers: {
        'Content-Type': 'application/json',
        'x-access-token':authUser.token
        },
        body: JSON.stringify(body),
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
    const paginateClickEvent= async event =>{
      event.preventDefault();
      _page_at = event.target.getAttribute('tag');
     // console.log(_id);
      //setState({ ...state, 'page_at':parseInt(_id) });
      
      let onTraceElement = document.getElementById('btnOnTrace');
      onTraceElement.click();
    }
    const onTrace= async event =>{
      let auth = new Authorization();
      let authUser =auth.getAuthUser();
      const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "vehicle/getdetail/"+parameter_id;
      let from_date = state.from_year+"-"+state.from_month+"-"+state.from_day+" "+ state.from_hour+":"+state.from_minute+":"+state.from_second ;
      let to_date = state.to_year+"-"+state.to_month+"-"+state.to_day+" "+ state.to_hour+":"+state.to_minute+":"+state.to_second ;
      
      let body = {
        from_date: from_date,
        to_date: to_date,
        page_at: _page_at,
        row_count: state.row_count
      };
      const res = await fetch(_url, {
        // date format -> '2022-03-03 19:47:02'
        
        body: JSON.stringify(body),
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
        data =result;
        
        setData(data)
      }
    }
    
   
    if (!parameter_id) {
      return("<>loading</>");
    }
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
    
    let trackingList = data.trackingList;
    var options = {hour:"numeric",minute:"numeric", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',second: 'numeric' };
    let tableRow = trackingList.data.map(function(element,index){
      return (<tr key={"tr"+element.id}>
            <td style={{textAlign: "center"}}>{element.id}</td>
            <td>{element.latitude}</td>
            <td>{element.longitude}</td>
            <td style={{textAlign: 'center'}}>{(new Date(element.created_at)).toLocaleDateString("en-US", options)}</td>     
            <td style={{textAlign: 'center'}}>{(new Date(element.updated_at)).toLocaleDateString("en-US", options)}</td>     
            <td>{element.duration}</td>
                
          </tr>
        );
    });
    
    let optionYears = years.map(function(element,index){
      return(<option key={"year"+element} value={element} >{element}</option>);
    });
    let optionMonths = months.map(function(element,index){
      return(<option key={"month"+element} value={(element+"").length==1?"0"+element:element} >{(element+"").length==1?"0"+element:element}</option>);
    });
    let optionDays = days.map(function(element,index){
      return(<option key={"days"+element} value={(element+"").length==1?"0"+element:element} >{(element+"").length==1?"0"+element:element}</option>);
    });
    let optionHours = hours.map(function(element,index){
      return(<option key={"hours"+element} value={(element+"").length==1?"0"+element:element} >{(element+"").length==1?"0"+element:element}</option>);
    });
    let optionMinutes = minutes.map(function(element,index){
      return(<option key={"minutes"+element} value={(element+"").length==1?"0"+element:element} >{(element+"").length==1?"0"+element:element}</option>);
    });
    let optionSeconds = seconds.map(function(element,index){
      return(<option key={"seconds"+element} value={(element+"").length==1?"0"+element:element} >{(element+"").length==1?"0"+element:element}</option>);
    });

  return (
    <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div style={{display:"flex",alignItems: 'center',justifyContent: 'center'}}>
          <i className="fas fa-car" style={{marginRight:5,fontSize:30,color:"#0f4e62"}}></i>
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
        activePage="vehicle"
    >
       <div className={styles.mainContainer}>
         <div className="vehicleContainer">
          <div className="vehicleDetail">
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
                <div className="frmRow" style={{flexDirection:"row"}}>
                    <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
                      <label>Device Key : </label>
                      <div style={{color:"#c33131"}}> &nbsp;{data.data.device_key}</div>
                    </div>
                </div>
                <div className="frmRow" style={{flexDirection:"row"}}>
                    <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
                      <label>Device Secret : </label>
                      <div style={{color:"#c33131"}}> &nbsp;{data.data.device_secret}</div>
                    </div>
                </div>
            </div>
            <div className="vehicleResult">
              
              <div className="vehicleFilter">
                <div className="frmRow">
                  <div className="dateCaption">From Date & Time</div>
                  <div className="dateFilter">
                  <div className="dateFilterDate">
                      <label> Year </label>
                      <select name="from_year" onChange={handleChange}>
                        {optionYears}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Month </label>
                      <select name="from_month" onChange={handleChange}>
                        {optionMonths}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Day </label>
                      <select name="from_day" onChange={handleChange}>
                        {optionDays}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Hour </label>
                      <select name="from_hour" onChange={handleChange}>
                      {optionHours}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Minute </label>
                      <select name="from_minute" onChange={handleChange}>
                      {optionMinutes}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Second </label>
                      <select name="from_second" onChange={handleChange}>
                      {optionSeconds}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="frmRow">
                  <div className="dateCaption">To Date & Time</div>
                  <div className="dateFilter">
                  <div className="dateFilterDate">
                      <label> Year </label>
                      <select name="to_year" onChange={handleChange}>
                        {optionYears}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Month </label>
                      <select name="to_month" onChange={handleChange}>
                        {optionMonths}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Day </label>
                      <select name="to_day" onChange={handleChange}>
                        {optionDays}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Hour </label>
                      <select name="to_hour" onChange={handleChange}>
                      {optionHours}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Minute </label>
                      <select name="to_minute" onChange={handleChange}>
                      {optionMinutes}
                      </select>
                    </div>
                    <div className="dateFilterDate">
                      <label> Second </label>
                      <select name="to_second" onChange={handleChange}>
                      {optionSeconds}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="frmRow">
                    <button className="btn-confirm" onClick={onTrace} id="btnOnTrace">
                        Trace
                    </button>
                </div>
              </div>
              

              <div className="vehicleTableResult">
              <HydrationPagination paginate={trackingList.pagination} styles={styles} root={`/vehicle/detail/${data.data.id}`} clickEvent={paginateClickEvent} page_at={trackingList.pagination.page_at} />
              <br/>
              <table>
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRow}
                  </tbody>
                </table>
              </div>

            </div>
            
          </div> 
          
       </div>
    </DashboardLayout>
  )
}

export default DetailPage
