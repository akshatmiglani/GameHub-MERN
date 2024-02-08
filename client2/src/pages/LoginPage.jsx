import React,{ useContext, useState }  from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export const LoginPage = () => {  
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {userInfo,setUserInfo}=useContext(UserContext);
  async function login(event){
    event.preventDefault();
    const response=await fetch('http://localhost:4000/login',{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
    })
    if(response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
      
    }else{
      alert('Wrong Credientials')
    }
  
    
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <>
        <form className='login' onSubmit={login}>
            <h2>Login</h2>
            <input type='text' placeholder='Username' onChange={event=>setUsername(event.target.value)}></input>
            <input type='password' placeholder='Password' onChange={event=>setPassword(event.target.value)} ></input>
            <button>Login</button>
        </form>
    </>
  )
}
