const express = require('express')
const router = express.Router()
const tasksController = require ('../controllers/tasksController');


router.get('/', tasksController.getTasks);
// router.post('/', tasksController.addTask);
// router.delete('/taskId', tasksController.deleteTaskById);


module.exports = router;