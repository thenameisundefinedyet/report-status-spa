import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import './Main.css'
import Good from "../../components/Good/Good";
import axios from "axios";
import {BACK_END} from "../../constants/shared";

const Main:React.FC = ()=> {
    const [state, setState] = useState({status: false, userName: 'Позивний',  code: '', report: 0})
    const [inputValue, setInputValue]=useState('')
    const [isAuthorised, setIsAuthorised] = useState(false)

   const handleLogin = async ()=>{
        if(!inputValue){
            alert('Будь ласка, введіть пароль!')
        } else {
            try {
                const response = await axios.put(`${BACK_END.URL}statuses/login`, {
                    password: Number(inputValue),
                    report: Date.now()
                });
                    localStorage.setItem('state', JSON.stringify(response.data))
                    setState(response.data)
                    setInputValue('')
                    setIsAuthorised(true)
            }catch (err){
                // @ts-ignore
                console.log(err.response.data)
                // @ts-ignore
                alert(err.response.data.message)
            }
        }
    }

    useEffect(()=>{
        const storageState = localStorage.getItem('state')
        if(storageState !== null){
            const parsedState = JSON.parse(storageState)
            setState(parsedState)
            setIsAuthorised(true)
        }
    }, [])
  return (
    <div>
        {isAuthorised ?
            <div className={'main-page'}><Good userName={state.userName} state={state} setIsAuthorised={setIsAuthorised} setState={setState}/></div> :
        <div className={'login-page'}>
         <TextField type='password' label="Пароль" autoComplete="off" variant="outlined" size='small' onChange={(e)=> {setInputValue(e.target.value)}} value={inputValue}/>
         <span style={{marginLeft: '10px', lineHeight: '35px'}}>
             <Button variant="contained" onClick={handleLogin}>Увійти</Button>
         </span>
        </div>
        }
    </div>
  );
}

export default Main;
