//import type { NextPage } from 'next'
import React from 'react';
import getConfig from 'next/config';
const { serverRuntimeConfig,publicRuntimeConfig } = getConfig();
const Swal = require('sweetalert2');

import MainLayout from '../components/layouts/mainlayout'
import Header from '../components/header';
import styles from '../styles/index.module.css';

import {setCookie} from '../components/cookie';

//const Home: NextPage = () => {
function Home({  }) {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const logInEvent = async event => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
    const _url = publicRuntimeConfig.NEXT_PUBLIC_ApiDomain + "authorization/login";
    const res = await fetch(_url, {
      body: JSON.stringify({
        email: state.email,
        password: state.password
      }),
      headers: {
        'Content-Type': 'application/json'
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
      let user = JSON.stringify(result.data);
      setCookie("user",user,7);
      document.location ="vehicle";
    }
  }//end login event

  return (
    <MainLayout 
        head={<Header title="Vehicle Tracking System : Admin Dashboard" />}
    >
       <div className={styles.mainContainer}>
            <form className={styles.loginContainer} onSubmit={logInEvent} action="#" id="frmLogin">
            <div className={styles.row}>
                <label className={styles.caption}>LogIn Form</label>
              </div>
              <div className={styles.row}>
                <input 
                  type="text" 
                  className={styles.textBox} 
                  placeholder="email address" 
                  name="email" 
                  onChange={handleChange}
                  value={state.email}
                />
              </div>
              <div className={styles.row}>
              <input 
                  type="password" 
                  className={styles.textBox} 
                  placeholder="password" 
                  name="password" 
                  onChange={handleChange}
                  value={state.password}
                />
              </div>
              <div className={styles.row}>
                <input type="submit" className={styles.btnSubmit}  value="Login" id="password" />
              </div>
            </form>
       </div>
    </MainLayout>
  )
}

export default Home
