import React, { useState } from "react";
import TaskSearch from "./TaskSearch";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const TaskBoard = () => {
   
    const defaultTask={
        'id':crypto.randomUUID(),
        'title': "Learn advanced react",
        "description":"I want to learn react  very deeply  so  that   I  can  understand every aspect of it from diffrent angel",
        "tags":["web","react","js"],
        "priority":"high2",
        "isFavourite":false

    }
    const [tasks,setTasks]=useState([defaultTask]);
    const [showModal,setshowModal]=useState(false);
    const [updateTask,setUpdateTask]=useState(null);

    function handleAddTask(newTask,isAdd){
        if(isAdd){
            setTasks([...tasks,newTask]);

        }else{
            setTasks(tasks.map(task=>{
                if(task.id===newTask.id){
                    return newTask;
                }
                return task;
            })

            )
        }
        
        setshowModal(false);
        
        
    }
    function handleEditTask(task){
        setUpdateTask(task);
        setshowModal(true);
     
        
        
    }
    function handleCloseClick(){
        setshowModal(false);
        setUpdateTask(null);
    }
    function handleTaskDelete(taskDelete){
        console.log("delete",taskDelete)
       const taskToDelete= tasks.filter(task=>task.id!==taskDelete.id);
       setTasks(taskToDelete);
        
    }
    function handleDeleteAll(){
        // tasks.length=0;  it's  muted  the orginal  array  which   react  don't  like
        // setTasks([...tasks]);
        setTasks([]);
        
    }
    function handleFavourite(favTaskId){
        const favIndex=tasks.findIndex(task=>task.id===favTaskId);
        console.log(favIndex);
        tasks[favIndex].isFavourite=!tasks[favIndex].isFavourite;
        setTasks([...tasks]);
        
       
        
    }
    function handleSearch(searchTerm){
     const filtered= tasks.filter(task=>task.title.toLowerCase().includes(searchTerm.toLowerCase()));
     setTasks([...filtered]);

    }
  return (
    <section className="mb-20" id="tasks">
        { showModal &&    <AddTaskModal onSave={handleAddTask} updateTask={updateTask}
        onCLoseClick={handleCloseClick}/>  }
     
      <div className="container">
        <TaskSearch
        onSearch={handleSearch}
        ></TaskSearch>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
          onAddTask={()=>setshowModal(true)}
          onDeleteAll={handleDeleteAll}
          tasks={tasks}
          ></TaskAction>
          <div className="overflow-auto">
            { tasks.length >0 ?
            (
              <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onTaskDelete={handleTaskDelete}
              onFavClick={handleFavourite}
              ></TaskList>
            ) :
            (
              <NoTaskFound/>
            )

            }
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
