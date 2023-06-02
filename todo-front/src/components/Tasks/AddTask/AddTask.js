import React, { useState } from 'react';

const AddTask = ({ updateList }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log('Handle change', name, value);
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('envío formulario', event);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newTask),
      redirect: 'follow',
    };

    const response = await fetch('http://localhost:3001/tasks', requestOptions);
    console.log('Response is', response);

    updateList();
    setNewTask({ title: '', description: '' }); // Reset the form after submission
  };

  return (
    <>
      <h3>AddTask</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Task:
          <input type="text" name="title" value={newTask.title} onChange={handleChange} />
          <input type="text" name="description" value={newTask.description} onChange={handleChange} />
          <br />
          <input type="submit" value="Add task" />
        </label>
      </form>
    </>
  );
};

export default AddTask;

