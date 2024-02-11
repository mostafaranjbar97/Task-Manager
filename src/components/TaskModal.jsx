import React, { useEffect, useState } from 'react'
import exit from '../assets/exit.svg'
import edit from '../assets/edit-white.png' 
import {  toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { taskchanged } from '../redux/features/taskSlice'

function TaskModal({showModalHandler,task}) {

    const dispatch=useDispatch()
    const [submit, setSubmit] = useState(false);

    const [newTask, setNewTask] = useState({...task});

    const { title, description, deadline, id} = newTask

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const editdata = async () => {
            try {
                await axios.put(`https://json-server-sigma-black.vercel.app/tasks/${id}`, newTask);
                dispatch(taskchanged("Task edited"))
                toast.success("Task edited")
                showModalHandler(false)
            } catch (error) {
                toast.error(error.message)
            }
        }
        submit && editdata()
        setSubmit(false)

    }, [submit])


    const handleFormSubmit = (e) => {
        if (title.trim() === "" ) {
            toast.warning("Title field are required!")
            return;
        }
        setSubmit(true)
    }

    
  return (
    <div className="block" >
    <div className='flex justify-center items-center fixed inset-0 z-[1000] animate-[0.3s_ease_0s_1_normal_forwards_running_modal-animation]' onClick={showModalHandler}>
        <div className='w-[90vw] max-w-[640px] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.08),0px_8px_32px_rgba(0,0,0,0.16)] rounded-xl max-h-[90vh] overflow-hidden animate-[0.3s_cubic-bezier(0.4,0,0,1.5)_0s_1_normal_forwards_running_modal-animation2] dark:bg-[#3b3b3b]' onClick={(e)=>e.stopPropagation()} >
            <div onClick={showModalHandler}  className='flex justify-end pt-4 pr-4 cursor-pointer '>
                <img src={exit} alt="" className='hover:bg-slate-100 p-0.5 hover:rounded-[50%] dark:hover:bg-transparent dark:hover:brightness-125'  />
            </div>
            <div className='w-full p-4 mx-3 rounded shadow-sm text-[rgba(0,0,0,.7)]'>
                <div className='flex mt-2'>
                    <p className='font-bold mr-2 dark:text-white'>Title:</p>
                    <input onChange={handleChange} type="text" value={title} name="title" className='w-full mr-3 ml-[52px] pl-2 outline-0 shadow-sm rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:border-2 dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:focus:border-blue-500' />
                </div>
                <div className='flex flex-col sm:flex-row  mt-2'>
                    <p className='font-bold mr-2 dark:text-white'>Description:</p>
                    <textarea onChange={handleChange} value={description} name="description" id="" cols="60" rows="8" className='w-full mr-3 pl-2 outline-0 shadow-sm rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:border-2 dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:focus:border-blue-500' ></textarea>
                </div>
                <div className='flex flex-wrap items-center mt-2'>
                    <div className='flex items-center'>
                        <p className='font-bold mr-2 dark:text-white'>Deadline time:</p>
                        <input onChange={handleChange} type='datetime-local' value={deadline} name="deadline" className='shadow-sm rounded border border-gray-300 p-1 dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:focus:border-blue-500' />
                    </div>
                </div>
                <div className='flex flex-wrap items-center justify-end sm:flex-row '>
                    <button onClick={handleFormSubmit} className='bg-[#dda90f] text-sm py-1.5 px-2 border-transparent border text-white rounded mr-2 flex justify-center items-center mt-2 min-w-20 hover:brightness-105'>
                        <img src={edit} alt="" className='min-w-3 h-3 mr-1  mt-1'/>
                        <p>edit</p>
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default TaskModal