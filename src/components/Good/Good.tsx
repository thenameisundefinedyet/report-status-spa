import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button} from "@mui/material";
import axios from "axios";
import {BACK_END} from "../../constants/shared";

interface GoodProps {
    userName: string
    state: { status: boolean; userName: string; code: string; report: number; }
    setIsAuthorised: Dispatch<SetStateAction<boolean>>
    setState: Dispatch<SetStateAction<{ status: boolean; userName: string; code: string; report: number; }>>
}

const getDate = (milliseconds: number, isExtraHours: boolean)=>{
    const time = new Date(milliseconds);
    let getHours;
    if(isExtraHours){
        getHours = time.getUTCHours() === 0 ? time.getUTCHours() : time.getUTCHours()+2
    }else{
        getHours = time.getUTCHours() === 0 ? time.getUTCHours() : time.getUTCHours()
    }
    const hours = String(getHours).length === 2 ? `${getHours}` : `0${getHours}`
    const minutes = String(time.getMinutes()).length === 2 ? time.getMinutes() : `0${time.getMinutes()}`
    const seconds = String(time.getSeconds()).length === 2 ? time.getSeconds() : `0${time.getSeconds()}`
    return  hours + ":" + minutes + ":" + seconds;
}

const Good: React.FC<GoodProps> = ({userName, state, setIsAuthorised, setState})=> {
    const [ timeAgo, setTimeAgo]=useState(getDate(0, false))
    const lastReportTime = getDate(state.report, true)

    const handleExit = async ()=>{
        try {
            await axios.put(`${BACK_END.URL}statuses/logout`, { code:state.code, report:Date.now() });
            localStorage.removeItem('state')
            setIsAuthorised(false)
        }catch (err){
            // @ts-ignore
            console.log(err.response.data)
            // @ts-ignore
            alert(err.response.data.message)
        }
    }


    const handleReport =async ()=>{
        if(state?.code){
            try{
             const response = await axios.put(`${BACK_END.URL}statuses/report`, { code:state.code, report:Date.now() });
                state.report = response.data.report
                localStorage.setItem('state', JSON.stringify(state))
                setTimeAgo(getDate(Date.now() - response.data.report, false))
                setState(state)
             }catch (err){
                // @ts-ignore
                console.log(err.response.data)
                // @ts-ignore
                alert(err.response.data.message)
            }
        }else{
            alert('Не можливо ідентифікувати ваш код безпеки. Будь ласка, вийдіть та спробуйте увійти заново.')
        }
    }

    setInterval(()=>{
        const currentTime = Date.now()
        if(state.report) {
            setTimeAgo(getDate(currentTime - state.report, false))
        }
    }, 1000)

     return (
    <div>
        <h1 style={{color:'#808080', fontFamily:'monospace'}}>{userName}</h1>
        <Button variant="contained" color="success" style={{width: '150px', height: '150px', margin: 'auto', borderRadius: '150px', fontFamily: 'Ubuntu', fontSize: '22px', marginBottom: '20px'}} onClick={handleReport}>
            <h1>4.5.0</h1>
        </Button>
        <div>
            <Button variant="outlined" color='error' onClick={handleExit}>Вийти</Button>
        </div>
        <h2 style={{color: '#808080', fontFamily:'monospace'}}>Крайня доповідь <span style={{fontSize: '1.4rem'}}>{timeAgo}</span> тому в {lastReportTime}</h2>
    </div>
  );
}

export default Good;
