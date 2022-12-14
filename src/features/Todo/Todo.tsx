import React, { useContext } from 'react';
import { AddTask } from './components/AddTask/addTask';
import { Filters } from './components/Filters/Filters';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoContext } from './contexts/TodoProvider';
import styles from './todo.module.css';

export const Todo = (): JSX.Element => {
  const { taskState } = useContext(TodoContext);
  const { tasks } = taskState;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      <h1 className={styles.title}>To do list</h1>
      <Filters />
      <AddTask />
      <div className={styles.listTask}>
      {tasks?.map((task, index) => <TodoItem key={index} task={task} />)}
      </div>
      </div>
    </div>
  );
};
