import React, { useState } from 'react'
import remove from '../assets/remove-white.png'
import edit from '../assets/edit-white.png' 
import check3 from '../assets/check-white.png' 
import pending from '../assets/pending.png'
import clsx from 'clsx'
import TaskModal from './TaskModal'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { taskchanged } from '../redux/features/taskSlice'
import { toast } from 'react-toastify'
import Timer from './Timer'


function TaskDescription({showDetail,task,doneHandle}) {
    const dispatch=useDispatch()
    const {title,description,deadline,dateAdded,status,id}=task
    const [showModal,setShowModal]=useState(false)
    const showModalHandler=()=>{
        setShowModal(!showModal)
    }

    const deleteHandler=(e)=>{
        // alert("Task Deleted")
        // console.log('delete',id);
        const deleteData=async(id)=>{
            try {
                await axios.delete(`https://json-server-sigma-black.vercel.app/tasks/${id}`)
                dispatch(taskchanged("Task deleted"))
                toast.success("Task deleted")
                // setDeleteTask(true)
            } catch (error) {
                toast.error(error.message)
            }
        }
        deleteData(id)
        
    }

const deadline2=new Date(deadline) 

  return (
    <>
    {showModal && <TaskModal showModalHandler={showModalHandler} task={task}/>}
    <div className={clsx('w-full  justify-center animate-[250ms_bounce1]',showDetail ? 'flex' : 'hidden')}>
        <div className='bg-white w-full p-4 mx-3 rounded shadow-sm text-[rgba(0,0,0,.7)] dark:bg-[#303030] dark:text-white'>
            <div className='flex mt-2'>
                <p className='font-bold mr-2'>Title:</p>
                <p>{title}</p>
            </div>
            <div className='flex flex-col sm:flex-row  mt-2'>
                <p className='font-bold mr-2'>Description:</p>
                {description ? <p>{description}</p> :
                <p>---</p>}
            </div>
            <div className='flex mt-2'>
                <p className='font-bold mr-2'>Time created:</p>
                <p>{dateAdded}</p>
            </div>
            <div className='flex justify-between flex-wrap items-center mt-2'>
                <div className='flex'>
                    <p className='font-bold mr-2'>Deadline time:</p>
                    {deadline ? <p >{deadline2.toLocaleString()}</p> :
                    <p className=''>--/--/--</p>}
                </div>
                {deadline && <Timer task={task}/>}
            </div>
            <div className='flex flex-wrap items-center justify-end sm:flex-row '>
                <button onClick={doneHandle} className='bg-[#28a745] text-sm py-1.5 px-2 border-transparent border text-white rounded mr-2 flex justify-center items-center mt-2 min-w-20 hover:brightness-105'>
                    {status== "active" ? <>
                    <img src={check3} alt="" className='min-w-3 h-3 mr-1 mt-1'/>
                    <p className='font-bold'>done</p>
                    </> 
                    :
                    <>
                    <img src={pending} alt="" className='min-w-3 h-3 mr-1 mt-1'/>
                    <p className='font-bold'>active</p>
                    </>
                    }
                </button>
                <button onClick={showModalHandler} className='bg-[#dda90f] text-sm py-1.5 px-2 border-transparent border text-white rounded mr-2 flex justify-center items-center mt-2 min-w-20 hover:brightness-105'>
                    <img src={edit} alt="" className='min-w-3 h-3 mr-1  mt-1'/>
                    <p className='font-bold'>edit</p>
                </button>
                <button onClick={deleteHandler} className='bg-[#dc3545] text-sm py-1.5 px-2 border-transparent border text-white rounded flex justify-center items-center mr-2 mt-2 min-w-20 hover:brightness-105'>
                    <img src={remove} alt="" className='min-w-3 h-3 mr-1 mt-1' />
                    <p className='font-bold'>remove</p>
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default TaskDescription