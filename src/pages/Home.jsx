import React, { useEffect, useState } from 'react'
import check from '../assets/check.png' 
import sort2 from '../assets/ascending-sorting.png'
import sort1 from '../assets/descending-sorting.png'
import filter from '../assets/filter.png'
import exit from '../assets/exit.svg'
import search from '../assets/search.png'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import AddTask from '../components/AddTask'
import TasksContainer from '../components/TasksContainer'
import { useSelector } from 'react-redux'

const TASK_API_BUILD="https://json-server-sigma-black.vercel.app/tasks"
function Home() {

    const [tasks, setTasks] = useState([])

    const [tasksSort, setTasksSort] = useState("added-date")
    const [filteredTask,setFilteredTask]=useState()
    const [searchTerm,setSearchTerm]=useState('')

    const getUser= localStorage.getItem("user")
    const currentUser = getUser && JSON.parse(getUser)
    const changedTask=useSelector((store)=>store.task)


    useEffect(()=>{
        if(getUser){
            const getData=async()=>{
                try {
                    const {data}=await axios.get(TASK_API_BUILD)
                    data &&  setTasks(data.filter((item)=> item.userId== currentUser.id))
                    data &&  setFilteredTask(data.filter((item)=> item.userId== currentUser.id))
                } catch (error) {
                    toast.error(error.message);
                }
            }
            getData()

        }
    },[changedTask])


    const handleFilterChange=(e)=>{
        
        setTasksSort("added-date")
        setFilteredTask(tasks)
        if(e.target.value=='all'){
            setFilteredTask(tasks)
        }else if(e.target.value=="has-deadline"){
            setFilteredTask(tasks.filter((task)=>task.deadline))
        }else{
            setFilteredTask(tasks.filter(({status})=>status==e.target.value))
        }
    }

    const handleSortChange=(e)=>{
        setTasksSort(e.target.value)
        
        if(e.target.value== "title") {
            filteredTask.sort(function (a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
                }
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
                }
                return 0;
            });
            setFilteredTask(filteredTask)
        }  
        if(e.target.value== "deadline") {
            let hasDeadlin=filteredTask.filter((task)=>task.deadline)
            let noDeadline=filteredTask.filter((taask)=>!taask.deadline)
            
            hasDeadlin.sort(function(a, b) {
                    let dateA = new Date(a.deadline);
                    let dateB = new Date(b.deadline);
                  
                    return dateA - dateB;
            });
            setFilteredTask([...hasDeadlin , ...noDeadline ])
        }  

        if(e.target.value== "added-date") {
            filteredTask.sort(function(a, b) {

                    let dateA = new Date(a.dateAdded);
                    let dateB = new Date(b.dateAdded);

                    return dateA - dateB;
            });
            setFilteredTask(filteredTask)
        } 
        
    }

    const searchHandler=(e)=>{
        setSearchTerm(e.target.value)
    }

    const searchClearHandler=(e)=>{
        setSearchTerm("")

    }




  return (
    <main className='flex justify-center items-center w-full dark:bg-[#303030] min-h-screen '>
        <div className='container m-5 p-2 rounded flex flex-col items-center bg-[#f8f9fa] shadow-[0_0.5rem_1rem_rgba(0,0,0,.15)] sm:m-10 md:m-16 lg:m-32 dark:bg-[#424242] dark:shadow-[0_0.5rem_1rem_rgba(255,255,255,.10)]'>

           <div className='flex items-center space-x-2 p-6 m-1'>
                <img src={check} width={56} height={56} alt='check'/>
                <h1 className='text-[#007bff] text-4xl font-semibold'>
                    <u>My Todo-s</u>
                </h1>
           </div>

            <AddTask/>

            <div className='w-full'>
                <div className="p-2 mx-6 border-[#dee2e6] border-b "></div>
            </div>
            

            <div className="flex m-1 py-4 px-12 justify-end flex-wrap w-full">
                <div className="flex items-center pl-1 pr-4 relative w-full">
                    <label className="text-sm text-[#6c757d] pr-2 dark:text-[#9CA3AF]">Search</label>
                    <input onChange={searchHandler} value={searchTerm} type='text' placeholder='search todo' className="outline-0 w-full text-sm text-[#495057] py-1.5 pr-7 pl-3 my-2 rounded border border-[#ced4da] focus:ring-blue-500 focus:border-blue-500 focus:border-2 dark:bg-[#303030] dark:text-white placeholder:dark:text-white" />
                    <img src={search} alt="" className='pl-2 w-8 h-6'/>
                    {searchTerm && <img onClick={searchClearHandler} src={exit} alt="" className='absolute cursor-pointer right-14 w-2 h-2 xs:w-3 xs:h-3 hover:bg-slate-200 hover:rounded-[50%] hover:p-0.5' />}
                </div>
                <div className='flex py-1 justify-end flex-wrap w-full'>
                    <div className="flex items-center pl-1 pr-4 ">
                        <label className="text-sm text-[#6c757d] pr-2 dark:text-[#9CA3AF]">Filter</label>
                        <select onChange={handleFilterChange} className="text-center w-32 text-xs text-[#495057] py-1.5 pr-7 pl-3 my-2 rounded border border-[#ced4da] focus:ring-blue-500 focus:border-blue-500 focus:border-2 dark:bg-[#303030] dark:text-white">
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="active">Active</option>
                            <option value="has-deadline">Has deadline</option>
                        </select>
                        <img src={filter} alt="" className='pl-2 w-8 h-6'/>
                    </div>
                    <div className="flex items-center pl-1 pr-4 ">
                        <label  className="text-sm text-[#6c757d] pr-2 dark:text-[#9CA3AF]">Sort</label>
                        <select  name="sort" id="sort" value={tasksSort} onChange={handleSortChange} className="text-center w-32 text-xs text-[#495057] py-1.5 pr-7 pl-3 my-2 rounded border border-[#ced4da] focus:ring-blue-500 focus:border-blue-500 focus:border-2 dark:bg-[#303030] dark:text-white">
                            <option value="added-date" >Added date</option>
                            <option value="deadline">Deadline</option>
                            <option value="title">Title</option>
                        </select>
                        <img src={sort1}  alt="" className='pl-2 w-8 h-6'/>
                        <img src={sort2} alt="" className='hidden pl-2 w-8 h-6'/>
                    </div>
                </div>
            </div>
            {filteredTask&&<TasksContainer tasks={filteredTask.filter(({title})=>title.includes(searchTerm)) }/>}
        </div>
        <ToastContainer/>
    </main>
  )
}

export default Home