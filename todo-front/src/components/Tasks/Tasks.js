import React, { useEffect, useState } from 'react';
import AddTask from './AddTask/AddTask';

const Tasks = () => {
    const [tasks, setTasks] = useState ([]);

    const getTasks = async function() {
        const tasksInfo = await fetch('http://localhost:3001/tasks');
        //ERROR: cors - medida seguridad -> Tenemos que ir al backend (index.js) e instalar "npm i cors"
        //console.log(tasksInfo)
    
        const parsedInfo = await tasksInfo.json();
        console.log('tasks Info', parsedInfo);
    
        setTasks(parsedInfo.data);
    
      };

      useEffect (() => { 
        getTasks();
      }, []);


      return ( 
        <div>
          <h1>Tasks</h1>
          {
            tasks.map( (task, index) => {
              return (
                <div className='task' key={index}> 
                <h4> Tasks {task.id} </h4>
                <p> Title: {task.title}</p>
                <p> Description: {task.description}</p>
                </div>
                ) 
              })         
          }
          <div>
            <h2>Add new task</h2>
            <AddTask updateList = {getTasks}/>
          </div>
        </div>
      )
    };
    
    export default Tasks;