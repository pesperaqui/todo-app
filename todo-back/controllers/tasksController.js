const fs = require('fs').promises;

const tasksController = {
  getTasks: async function(req, res) {
    try {
      const fileData = await fs.readFile('tasks.db', {encoding: 'utf-8'});
      let taskList = fileData ? JSON.parse(fileData) : [];
      res.json({ data: taskList });
    } catch (error) {
      console.error('Error reading tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addTask: async (req, res) => {
    try {
      const task = req.body;
      const { title, description } = task;

      const fileData = await fs.readFile('tasks.db', {encoding: 'utf-8'});
      let taskList = fileData ? JSON.parse(fileData) : [];
      const numTasks = taskList.length;

      const newTask = {
        id: numTasks + 1,
        title: title,
        description: description,
      };

      taskList = [ ...taskList, newTask];
      taskList = JSON.stringify(taskList);

      await fs.writeFile('tasks.db', taskList, {flag: 'w'});

      res.send('Task registered!');
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  

deleteTaskById: async (req, res) => {
  const {taskId} = req.params;
  try {
    const fileData = await fsPromises.readFile('tasks.db', { encoding: 'utf-8' });
    let taskList = fileData ? JSON.parse(fileData) : [];

    let positionToDelete;
            for (const [index, task] of taskList.entries()) {
                if (task.id === taskId) {
                    positionToDelete = index;
                    break;
                }
            }
            taskList.splice(positionToDelete, 1);
            taskList = JSON.stringify(taskList);

            await fsPromises.writeFile('tasks.db', taskList, {encoding: 'utf-8'});
            
            res.send(`¡Oído! Hemos eliminado la task nº ${taskId} `);
            
        } catch (error) {
            
        }
    }
  
  

}

module.exports = tasksController;
