import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import './login.css'

function Login() {
    const [value, setValue]=useState('')
    const onSubmit = ()=>{
        if(!value){
            alert('Будь ласка, введіть пароль!')
        }else {
            alert(value) //make post
            setValue('')
        }
    }

  return (
    <div className={'login-page'}>
         <TextField label="Пароль" autoComplete="off" variant="outlined" size='small' onChange={(e)=> {setValue(e.target.value)}} value={value}/>
         <span style={{marginLeft: '10px', lineHeight: '35px'}} >
             <Button variant="contained" onClick={onSubmit}>Увійти</Button>
         </span>
    </div>
  );
}

export default Login;
