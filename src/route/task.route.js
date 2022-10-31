const { Router } = require('express');
const pool = require('../db.js')
const router = Router();

const { getAllTasks, deleteTask ,getASingleTask, putUpdateTask,postCreatingATask } = require('../controllers/task.controller.js');

router.get('/task', getAllTasks )
router.get('/task/:id', getASingleTask)
router.post('/task', postCreatingATask)
router.delete('/task/:id', deleteTask)
router.put('/task/:id', putUpdateTask)

module.exports = router;