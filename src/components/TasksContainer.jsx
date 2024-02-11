import React from 'react'
import TaskCard from './TaskCard'


function TasksContainer({tasks}) {
   
  return (

    <div className="flex mx-1 pb-4 flex-wrap justify-center  w-full sm:px-12">
        <div className="w-full">

            {
                tasks.map((task)=>{
                    return(
                        <TaskCard key={task.id} task={task}/>
                    )
                })
            }
            
        </div>
    </div>

        
  )
}

export default TasksContainer