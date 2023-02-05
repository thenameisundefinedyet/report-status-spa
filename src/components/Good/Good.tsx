import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button} from "@mui/material";

interface GoodProps {
    userName: string
    lastReport: string
    setIsAuthorized: Dispatch<SetStateAction<boolean>>
}

const getDate = (milliseconds: string | number | Date)=>{
    const time = new Date(Number(milliseconds));
    const hours = String(time.getHours()).length === 2 ? time.getHours() : `0${time.getUTCHours()}`
    const minutes = String(time.getMinutes()).length === 2 ? time.getMinutes() : `0${time.getMinutes()}`
    const seconds = String(time.getSeconds()).length === 2 ? time.getSeconds() : `0${time.getSeconds()}`
    return  hours + ":" + minutes + ":" + seconds;
}

const Good: React.FC<GoodProps> = ({userName, lastReport, setIsAuthorized})=> {
    const lastReportTime = getDate(Number(lastReport))
    const [ millisecondsAgo, setMillisecondsAgo]=useState(0)
    const timeAgo = getDate(millisecondsAgo)

    const handleExit = ()=>{
        localStorage.removeItem('res')
        setIsAuthorized(false)
    }

    setInterval(()=>{
        const millisecondsAgo = Date.now() - Number(lastReport);
        setMillisecondsAgo(millisecondsAgo)
    }, 1000)

     return (
    <div>
        <h1 style={{color: '#808080', fontFamily:'monospace'}}>{userName}</h1>
        <Button variant="contained" color="success" style={{width: '150px', height: '150px', margin: 'auto', borderRadius: '150px', fontFamily: 'Ubuntu', fontSize: '22px', marginBottom: '20px'}}>
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
