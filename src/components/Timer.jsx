import React, { useEffect, useState } from 'react'
import timer2 from '../assets/timer2.png'

function Timer({task}) {
    const {deadline} =task
    const [day, setDay] = useState(0)
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const [isDeadlineOver,setIsDeadlineOver]=useState(false) 
    
    
    const timer=()=>{
        let now = Date.now();
        let target=new Date(deadline)
        let gap=target.getTime()- now
        if (gap>0){

        let second=1000;
        let minute=second*60;
        let hours = minute*60;
        let days=hours*24;

        setDay(Math.floor(gap / days))
        setHour(Math.floor((gap % days) / hours))
        setMin(Math.floor((gap % hours) / minute))
        setSec(Math.floor((gap % minute) / second))
      }else{
        setIsDeadlineOver(true)
      }}

      useEffect(() => {
        let interval  = setInterval(() => timer(), 1000);
        return () => clearInterval(interval);
      }, []);

  return (
    <>
    {isDeadlineOver?<div className='flex border-[#17A2B8] border-2 rounded p-1 mt-2 mr-2'>
        <img src={timer2} alt="" className='w-6 h-6' />
        <p className='font-bold text-[#0d5661]  dark:text-[#a7b8b9]'>deadline is passed</p>

    </div> : 
    <div className='flex border-[#17A2B8] border-2 rounded p-1 mt-2 mr-2'>
    <img src={timer2} alt="" className='w-6 h-6' />
    <p className='font-bold mx-0.5'>{day} </p>
    <p className='mx-1'>days &</p>
    <p className='font-bold'>{hour}:{min}:{sec}</p>
</div>}
    </>
    
  )
}

export default Timer