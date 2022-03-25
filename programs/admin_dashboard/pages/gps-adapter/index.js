//import type { NextPage } from 'next'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import getConfig from 'next/config';
const { serverRuntimeConfig,publicRuntimeConfig } = getConfig();
const Swal = require('sweetalert2');

import DashboardLayout from '../../components/layouts/dashboardlayout'
import Header from '../../components/header';
import styles from '../../styles/vehicle.module.css';
import Pagination from '../../components/pagination';
import Authorization from '../../components/authorization';

export async function getServerSideProps(context) {
  const query = context.query;
  return { props: { query } }
}

export default function GPSPage({ query }) {

  
  
  
   const [data, setData,state] = useState(null)
   const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    let _pageAt = query.page_at;
    _pageAt = parseInt(_pageAt);
    _pageAt = !isNaN(_pageAt)?_pageAt:1;
    let auth = new Authorization();
    let authUser =auth.getAuthUser();
    const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "gpsadapter";
    setLoading(true);

    fetch(_url,{
      body: JSON.stringify({
        row_count:10,
        page_at: _pageAt
      }),
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
  }, []);

 
  if (isLoading) return(
    <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName="GPS Model(Adapter) : List"
        activePage="gps-adapter"
    >
       <div className={styles.mainContainer}>
        Loading...
       </div>
    </DashboardLayout>
  );

  if (!data) return(
    <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div><i className="fas fa-location-arrow"></i><label>Owner : List</label></div>}
        activePage="gps-adapter"
    >
       <div className={styles.mainContainer}>
        No Data...
       </div>
    </DashboardLayout>
  );

let paginate = data.pagination;
var options = {hour:"numeric",minute:"numeric", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let tableRow = data.data.map(function(element,index){
  return (<tr key={"tr"+element.id}>
      <td style={{textAlign: "center"}}>{element.id}</td>
      <td>{element.model}</td>
      <td>{element.admin_name}</td>
      <td style={{textAlign: 'center'}}>{(new Date(element.created_at)).toLocaleDateString("en-US", options)}</td>
    </tr>);
});
  return (
    <DashboardLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
        pageName={<div style={{display:"flex",alignItems: 'center',justifyContent: 'center'}}>
          <i className="fas fa-location-arrow" style={{marginRight:5,fontSize:30,color:"#0f4e62"}}></i>
          <label>Gps Adapter(Model) : List</label></div>}
        buttons={
          <div>
            <Link href="gps-adapter/new">
              <a className="btn-light">
                <i className="fas fa-plus-circle"></i>
                <label>New</label>
              </a>
            </Link>
          </div>
        }
        activePage="gps-adapter"
    >
       <div className={styles.mainContainer}>
        <div className={styles.mainInnerContainer}>
         
          <div className={styles.paginationContainer}>
            <Pagination paginate={paginate} styles={styles} root={"/gps-adapter/"} page_at={paginate.page_at} />
          </div>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>GPS Adapter ( Model ) </th>
                  <th>Created By </th>
                  <th>Created At </th>
                </tr>
              </thead>
              <tbody>
                {tableRow}
              </tbody>
            </table>
          </div>
          <div className={styles.paginationContainer}>
            <Pagination paginate={paginate} styles={styles} root={"/gps-adapter/"} page_at={paginate.page_at} />
          </div>
        </div>
       </div>
    </DashboardLayout>
  )
}
