import toDoApi from '../Service/todoApis';
import { GET_ALL_TASK } from './actionTypes';
import { Task } from './TodoProvider';
// import { GET_ALL_TASK } from './actionTypes';

export const getTaskAction = () => {
  return async (dispatch: (arg0: { type: string, tasks: Task[] }) => void) => {
    try {
      const result = await toDoApi.getAllTask();
      dispatch({
        type: GET_ALL_TASK,
        tasks: result.data
      });
      console.log('tasks', result);
    } catch (error) {
      console.log(error);
    }
  };
};
