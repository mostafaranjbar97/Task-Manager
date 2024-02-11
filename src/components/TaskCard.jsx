import React, { useState } from 'react'
import {useDispatch} from 'react-redux' 
import border from '../assets/border.png' 
import check2 from '../assets/check2.png' 
import up from '../assets/up.png'
import down from '../assets/down.png'
import clsx from 'clsx'
import TaskDescription from './TaskDescription'
import axios from 'axios'
import { taskchanged } from '../redux/features/taskSlice'
import { toast } from 'react-toastify'

const TASK_API_BUILD="https://json-server-sigma-black.vercel.app/tasks"
function TaskCard({task}) {
    const dispatch=useDispatch()

    const {title,status,id}=task
    const [showDetail,setShowDetail]=useState(false)
    const showDetailHandler=()=>{
        setShowDetail(!showDetail)
    }

    const doneHandle=()=>{
  
        let newTask
        if(status==="active"){
           newTask={...task,"status":"completed"}
        }else{
             newTask={...task,"status":"active"}
            }
        
        const changeStatus=async(newTask)=>{
            try {
                await axios.patch(`https://json-server-sigma-black.vercel.app/tasks/${id}`,newTask)
                toast.success("Task status changed")
                dispatch(taskchanged("change status"))
                // setDoneTask(true)
            } catch (error) {
                toast.error(error.message)
            }
        }
        changeStatus(newTask)
    }

  return (
    <div className="flex px-4 flex-col items-center rounded w-full justify-center group ">
        <div className='flex items-center rounded w-full justify-center '>
            <div className='p-1 flex justify-center items-center w-10 h-8 cursor-pointer' onClick={doneHandle}>
                {status=="active" ? <img src={border} alt="" className='min-w-8 h-8 hover:brightness-90'/> : <img src={check2} alt="" className='min-w-8 h-8 hover:brightness-90'/>}
            </div>
            <div className='px-1 m-1 w-full min-w-36'>
            {status=="active" ?
                <p className='text-xl py-2 bg-clip-padding text-[#495057] line-clamp-2 dark:text-[#c5ccd8]'>{title}</p>
                :
                <s className='text-xl py-2 bg-clip-padding text-[#495057] line-clamp-2 dark:text-[#c5ccd8]'>{title}</s>
            }
            </div>
            <div className='hidden flex-col justify-center  group-hover:flex'>
                <div className={clsx('bg-[#17A2B8] border-transparent border text-white rounded flex justify-center items-center hover:brightness-105',!showDetail ? 'flex' : 'hidden')}>
                    <button className=' text-sm xs:py-1.5 xs:px-3 flex justify-center items-center' onClick={showDetailHandler}>
                        <p className='hidden xs:block xs:pr-1'>Details</p>
                        <img src={down} alt="" className='w-3.5 h-3.5 mx-3 my-1.5 xs:m-0' />
                    </button>   
                </div>
                <div className={clsx('bg-[#17A2B8] border-transparent border text-white rounded flex justify-center items-center hover:brightness-105',showDetail ? 'flex' : 'hidden')}>
                    <button  className='text-sm xs:py-1.5 xs:px-2 flex justify-center items-center' onClick={showDetailHandler} >
                        <p className='hidden xs:block xs:pr-1'>Details</p>
                        <img src={up} alt="" className='w-3.5 h-3.5 mx-3 my-1.5 xs:m-0' />
                    </button>   
                </div>
            </div>  
        </div>
        <TaskDescription showDetail={showDetail} task={task} doneHandle={doneHandle}/>
    </div>
  )
}

export default TaskCard