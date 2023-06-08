const express = require('express')
const router = express.Router()
const tasksController = require ('../controllers/tasksController');


router.get('/', tasksController.getTasks);
router.get('/:taskId', tasksController.getTaskById);
router.post('/', tasksController.addTask);
router.delete('/:taskId', tasksController.deleteTaskById);
router.patch('/:taskId', tasksController.updateTaskById);

router.get('/list/completed', tasksController.getTasksCompleted);
router.get('/list/uncompleted', tasksController.getTasksUncompleted);


module.exports = router;