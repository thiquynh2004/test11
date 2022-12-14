/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { createContext, useEffect, useReducer, useState } from 'react';
import toDoApi from '../Service/todoApis';
import { Types } from './actionTypes';
import { initialState, todoReducer } from './reducer';

export interface TaskContext {
  taskState: TaskState
}

export interface Task {
  id: number
  description: string
  completed: boolean
  createDate: string
}

export interface TaskState{
  tasks: Task[]
  taskDetail: Task
}

export const TodoContext = createContext<{
  taskState: TaskState
  dispatch: React.Dispatch<any>
}>({
  taskState: initialState,
  dispatch: () => undefined
});

interface props{
  children: React.ReactNode
}

export const getAll = async (dispatch: any) => {
  try {
    const result = await toDoApi.getAllTask();
    dispatch({
      type: Types.GET_ALL_TASK,
      tasks: result
    });
  } catch (error) {
    console.log(error);
  }
};

const TodoProvider: React.FC<props> = ({ children }) => {
  const [taskState, dispatch] = useReducer(todoReducer, initialState);
  useEffect(() => {
    getAll(dispatch);
  }, []);
  return <TodoContext.Provider value={{ taskState, dispatch }} >{children}</TodoContext.Provider>;
};

export default TodoProvider;
