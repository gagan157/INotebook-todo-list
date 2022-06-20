import React, { useState } from 'react'
import UserContext from './userscontext'
import { useNavigate } from "react-router-dom"




export default function UsersState(props) {

  let host = 'http://localhost:5000'
  const [islogin, setlogin] = useState(false);
  const [userdtl,setUserdtl]=useState({})
  //using ths usenavigate ..you need to router use high level in index.js or app in wrap to all with router
  const navigator = useNavigate();
  const [msg, setMsg] = useState({ error: '', sucess: '' })


  //login fetch api
  const loginuser = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    const auttoken = json.auttoken
    const sucessmsg = json.msg
    const errormsg = json.errors

    if (errormsg) {
      setMsg({ error: errormsg })
    }
    else {
      setMsg({ sucess: sucessmsg })
      localStorage.setItem("auttoken", auttoken)
      navigator('/home')
      setlogin(true)
      setTimeout(() => {
        setlogin(false)
      }, 2000);
    }
    setTimeout(() => {
      setMsg({ error: '', sucess: '' })
    }, 2500);
  }
  //get user details
  const getuserdetail = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auttoken')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }

    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setUserdtl(json)
  }


  //signup form 
  const usersignup = async (name, email, password) => {
    const response = await fetch(`${host}/api/auth/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()
    console.log(json)
    if(json.errors){
      setMsg({error:json.errors})
    }
    else{
      setMsg({sucess:json.msg})
      navigator('/login')
    }
    setTimeout(() => {
      setMsg({ error: '', sucess: '' })
    }, 3500);
  }


  return (
    <UserContext.Provider value={{ islogin, loginuser, usersignup,userdtl, getuserdetail, msg }}>
      {props.children}
    </UserContext.Provider>
  )
}
