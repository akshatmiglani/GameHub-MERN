import React, { useState } from 'react'

export const RegisterPage = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    async function register(event){
        event.preventDefault();
        
        const response=await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
        })
        if(response.status !==200){
            alert('Registration Failed')
        }else{
            alert('Registration Successful')
        }
        console.log(response)
        setUsername('');
        setPassword('');
    }
    return (<>
        <form  className='register' onSubmit={register}>
            <h2>Register</h2>
            <input type='text' placeholder='Username' value={username} onChange={event=>setUsername(event.target.value)}></input>
            <input type='password' placeholder='Password' value={password} onChange={event=>setPassword(event.target.value)}></input>
            <button>Register</button>
        </form>
    </>
    )
}
