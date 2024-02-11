import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import calendar from '../assets/calendar2.png'
import up from '../assets/add-up.png'
import exit from '../assets/add-exit.png'
import exitHover from '../assets/add-exit-hover.png'
import desc from '../assets/desc.png'
import {  toast } from 'react-toastify'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux'
import { taskchanged } from '../redux/features/taskSlice'

const TASKS_API="http://localhost:3000/tasks"
const TASK_API_BUILD="https://json-server-sigma-black.vercel.app/tasks"
function AddTask() {
    const dispatch=useDispatch()
    const calendarRef=useRef()
    const descRef=useRef()
    const showCalendar=()=>{
        setShowDescription(!showDescription)
        console.log(calendarRef.current.showPicker())
        calendarRef.current.showPicker()
        calendarRef.current.focus()
    }

    const [showDescription,setShowDescription]=useState(false)
    const showDesc=()=>{
        setShowDescription(!showDescription)
        descRef.current.focus()
    }
    const getUser= localStorage.getItem("user")
    const currentUser = getUser && JSON.parse(getUser)

    const [submit,setSubmit]=useState(false);
    const [task,setTask]=useState({
        title:"",
        description: "",
        deadline: "",
        image:"",
        status: "active",
        id: "",
        dateAdded: "",
        userId:""
    });
    const {title,description,deadline}=task   
    const id=uuidv4()
    
    const handleChange=(e)=>{
        const date= new Date()
        setTask({...task,[e.target.name]:e.target.value,dateAdded:date.toLocaleString()})
        getUser && setTask({...task,[e.target.name]:e.target.value,dateAdded:date.toLocaleString(),userId:currentUser.id,id:id})
    }

    const clearInputHandler=(e)=>{
        e.preventDefault();
        setTask({
            title:"",
            description: "",
            deadline: "",
            image:"",
            status: "active",
            id: "",
            dateAdded: "",
            userId:""
        });
        setShowDescription(false)
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault()
        if (title.trim()==="" ){
            toast.warning("Task's title are required!")
            return;
        }
        if(!getUser){
            toast.error("please sign in first")
            setShowDescription(false)
            setTask({
                title:"",
                description: "",
                deadline: "",
                image:"",
                status: "active",
                id: "",
                dateAdded: "",
                userId:""
            })
        }else{
            setSubmit(true)
        }
    }


    useEffect(()=>{
        if(getUser){
         setTask({...task,userId:currentUser.id})
        const postData=async () =>{
            try {
                 await axios.post(TASK_API_BUILD,task);
                 dispatch(taskchanged("add task"))
                setTask({
                    title:"",
                    description: "",
                    deadline: "",
                    image:"",
                    status: "active",
                    id: "",
                    dateAdded: "",
                    userId:""
                })

            toast.success('Task added successfully')
            } catch (error) {
                toast.error(error.message)
            }
        } 
        submit && postData ()
        setSubmit(false)
        setShowDescription(false)}
        else{
            toast.error("please sign in first")
            
        }
    },[submit,getUser])
  return (
                <div className=" flex flex-col m-1 p-4 w-full ">
                    <p className={clsx('font-bold my-2 transition-all animate-[250ms_bounce1] dark:text-white',showDescription ? 'block' : 'hidden')}>Title:</p>
                    <div className='w-full flex'>
                        <div className=" bg-white rounded shadow-[0_.125rem_.25rem_rgba(0,0,0,.075)] p-2 flex justify-between items-center w-full dark:bg-[#303030] ">
                            <div className='max-w-full grow basis-0'>
                                <input type="text" name="title" id="title" value={title} onChange={handleChange} className="outline-0 py-2 px-4 text-xl bg-transparent rounded bg-clip-padding w-full dark:text-white" placeholder="Add new ..."/>
                            </div>
                            <div className="flex ">
                                <div className={clsx('flex justify-center items-center mr-2 cursor-pointer hover:brightness-125',!showDescription ? 'block' : 'hidden')} title='add description' onClick={showDesc}>
                                    <img src={desc} alt="desc"  className='w-7 h-7' />
                                </div>
                                <div className={clsx('flex justify-center items-center mr-2 cursor-pointer hover:brightness-125',!showDescription ? 'block' : 'hidden')} title='add deadline' onClick={showCalendar}>
                                    <img src={calendar} alt="calendar"  className='w-7 h-7' />
                                </div>
                                <div className={clsx('flex justify-center items-center mr-2 cursor-pointer hover:brightness-125',showDescription ? 'block' : 'hidden')} title='hide description' onClick={showDesc}>
                                    <img src={up} alt="calendar"  className='w-5 h-5' />
                                </div>
                                <div className={clsx('flex justify-center items-center mr-2 cursor-pointer group',(title || deadline || description) ? 'block' : 'hidden')} title='add deadline' onClick={clearInputHandler}>
                                    <img src={exit} alt="calendar"  className='w-5 h-5 block group-hover:hidden' />
                                    <img src={exitHover} alt="calendar"  className='w-5 h-5 hidden group-hover:block' />
                                </div>
                                {/* <input onChange={handleChange} value={deadline} name="deadline" id="Deadline" type="datetime-local" ref={calendarRef} className='w-0 h-0'/> */}
                                <button onClick={handleFormSubmit} className='bg-[#007bff] text-base py-1.5 px-3 border-transparent border text-white rounded  mr-2 hover:brightness-110'>Add</button>
                            </div>
                        </div>
                    </div>
                    <p className={clsx('font-bold my-2 transition-all animate-[250ms_bounce1] dark:text-white',showDescription ? 'block' : 'hidden')}>Deadline:</p>
                    <input onChange={handleChange} value={deadline} name="deadline" id="Deadline" type="datetime-local" ref={calendarRef} className={clsx('p-4 rounded animate-[250ms_bounce1] transition-all text-black dark:bg-[#303030] dark:text-white',showDescription ? 'block' : 'hidden')}/>
                    <p className={clsx('font-bold my-2 transition-all animate-[250ms_bounce1] dark:text-white',showDescription ? 'block' : 'hidden')}>Description:</p>
                    <textarea ref={descRef} name="description" id="Description" value={description} onChange={handleChange} placeholder='Add a description...' rows={8} cols={90} className={clsx('p-4 rounded animate-[250ms_bounce1] transition-all dark:bg-[#303030] dark:text-white',showDescription ? 'block' : 'hidden')}/>
                
            </div>
  )
}

export default AddTask