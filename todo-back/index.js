require("dotenv").config();
const express = require('express');
const mongoose = require("./utils/database");
const cors = require('cors');
const path = require("path");

const tasksRouter = require('./routes/tasksRouter');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use('/tasks', tasksRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor ON`);
});
