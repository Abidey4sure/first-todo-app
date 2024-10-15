import React from "react";
import Todo from "./components/Todo"
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !toggleTaskCompleted,
  completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP)


const App = (props) => {

  const addTask = (name) => {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTask = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed:! task.completed}
      }
      return task;
    });
    setTasks(updatedTask)
 };

 const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id );
    setTasks(remainingTasks);
 };

 const editTask = (id, newName) => {
  const editedTaskList = tasks.map((task) => {
    if (id === task.id) {
       return {...task, name: newName}
    };
    return task;
  });
  setTasks(editedTaskList)
};

  const [tasks, setTasks] = useState(props.tasks);

   const taskList = tasks?.map((task) => ( 
     <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted = {toggleTaskCompleted}
      deleteTask = {deleteTask}
      editTask = {editTask}
      /> 
    ));

    const filterList = FILTER_NAMES.map((name) => 
      (<filterButton key={name} name={name} />
      ));

    const [filter, setFilter] = useState('All');

     const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
     const headingText = ` ${taskList.length} ${tasksNoun} remaining ` ;

  return (
    <div className='todoapp stack-large'>
      <h1 >TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
       {filterList}
      </div>

      <h2 id="list-heading" style={{  color :'green'}}>{headingText}</h2>
      <ul role="list" className="todo-list stack-large stackexception" aria-labelledby="list-heading">
             {taskList}
      </ul>
    </div>
  )
}

export default App
