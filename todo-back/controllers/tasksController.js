const mongoose = require("mongoose");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const fs = require('fs').promises;

const Task = require("../models/taskModel");

const tasksController = {
      getTasks: async (req, res) => {
        const tasks = await Task.find()
        res.json(tasks);
      },

      getTaskById: async (req, res) => {
        const {taskId} = req.params;
        try {
          const searchTask = await Task.findById(taskId);
          res.json(searchTask)
        } catch (error) {
          return res.status(404).json ({
            error: "Task not found",
          })
        }
      },

      addTask: async (req, res) => {
        const {name, description, completed} = req.body;
        const newTask = new Task({
          name,
          description,
          completed
        });
        try {
          const savedTask = await newTask.save();
          res.status(200).json(savedTask);
        } catch (error) {
          res.status(500).json("Error_Task_Not_Added");
        }
        res.json();
      },

      deleteTaskById: async (req, res) => {
        const {taskId} = req.params;
        try {
          const taskToBeDelete = await Task.findByIdAndDelete(taskId);
          res.status(200).json({
            Task_Delete: {
              taskToBeDelete,
            }
          })
        } catch (error) {
          res.status(500).json("Error_Task_Not_Deleted");
        }
        res.json();
      }, 

      updateTaskById: async (req, res) => {
        const {taskId} = req.params;
        const {name, description, completed} = req.body;

        const taskUpdatedById = await Task.findByIdAndUpdate(
          taskId, {
            name,
            description,
            completed
          },
          { new:true }
        );
        res.json(taskUpdatedById)
      },

      getTasksCompleted: async function(req, res) {
        const completed = req.query.completed;
        try {
          const tasks = await Task.find({ completed: true });
          res.status(200).json(tasks);
        } catch (error) {
          res.status(500).json({ error: "Error retrieving tasks" });
        }
      },
      
      getTasksUncompleted: async function(req, res) {
        const completed = req.query.completed;
        try {
          const tasks = await Task.find({ completed: false });
          res.status(200).json(tasks);
        } catch (error) {
          res.status(500).json({ error: "Error retrieving tasks" });
        }
      },
}

module.exports = tasksController;

//   ! Fist -> Made with .db 
//     getTasks: async function(req, res) {
//     try {
//       const fileData = await fs.readFile('tasks.db', {encoding: 'utf-8'});
//       let taskList = fileData ? JSON.parse(fileData) : [];
//       res.json({ data: taskList });
//     } catch (error) {
//       console.error('Error reading tasks:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

//   addTask: async (req, res) => {
//     try {
//       const task = req.body;
//       const { title, description } = task;

//       const fileData = await fs.readFile('tasks.db', {encoding: 'utf-8'});
//       let taskList = fileData ? JSON.parse(fileData) : [];
//       const numTasks = taskList.length;

//       const newTask = {
//         id: numTasks + 1,
//         title: title,
//         description: description,
//       };

//       taskList = [ ...taskList, newTask];
//       taskList = JSON.stringify(taskList);

//       await fs.writeFile('tasks.db', taskList, {flag: 'w'});

//       res.send('Task registered!');
//     } catch (error) {
//       console.error('Error adding task:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
// deleteTaskById: async (req, res) => {
//   const {taskId} = req.params;
//   try {
//     const fileData = await fsPromises.readFile('tasks.db', { encoding: 'utf-8' });
//     let taskList = fileData ? JSON.parse(fileData) : [];

//     let positionToDelete;
//             for (const [index, task] of taskList.entries()) {
//                 if (task.id === taskId) {
//                     positionToDelete = index;
//                     break;
//                 }
//             }
//             taskList.splice(positionToDelete, 1);
//             taskList = JSON.stringify(taskList);
//             await fsPromises.writeFile('tasks.db', taskList, {encoding: 'utf-8'});
//             res.send(`¡Oído! Hemos eliminado la task nº ${taskId} `);  
//         } catch (error) {
//         }
//     } 
