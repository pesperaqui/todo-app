const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasksRouter');

const app = express();

app.use(cors());
app.use(express.json ());

app.use('/tasks', tasksRouter);

app.listen(3001, () => {
  console.log(`Servidor activo`);
});
