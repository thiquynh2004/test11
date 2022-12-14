import toDoApi from '../Service/todoApis';
import { Types } from './actionTypes';
import { Task } from './TodoProvider';
// import { GET_ALL_TASK_INIT } from './actionTypes';
export const getTaskAction = () => {
  return async (dispatch: (arg0: { type: string, tasks: Task[] }) => void) => {
    try {
      const result = await toDoApi.getAllTask();
      dispatch({
        type: Types.GET_ALL_TASK_INIT,
        tasks: result.data
      });
      console.log('tasks', result);
    } catch (error) {
      console.log(error);
    }
  };
};
