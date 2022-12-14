import { Types } from './actionTypes';
import { Task, TaskState } from './TodoProvider';

export const initialState: TaskState = {
  tasks: [],
  taskDetail: {
    id: 0,
    description: '',
    completed: false,
    createDate: ''
  }
};

export type todoAction =
| { type: Types.GET_ALL_TASK, tasks: Task[] }
| { type: Types.ADD_TASK, tasks: Task[] }
| { type: Types.DELETE_TASK, tasks: Task, id: number }
| { type: Types.UPDATE_STATUS, tasks: Task, id: number }
| { type: Types.EDIT_TASK, taskDetail: Task}
| { type: Types.GET_TASK_DETAIL, taskDetail: Task }
| { type: Types.CLEAR_MODAL, payload: Task }

export const todoReducer = (state: TaskState, action: todoAction): TaskState => {
  switch (action.type) {
    case Types.GET_ALL_TASK:
      return {
        ...state,
        tasks: action.tasks
      };
    case Types.ADD_TASK:
      return {
        ...state,
        tasks: action.tasks
      };
    case Types.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id)
      };
    case Types.UPDATE_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) => task.id === action.id ? { ...task, completed: !task.completed } : task
        )
      };
    case Types.EDIT_TASK:
      return {
        ...state,
        taskDetail: action.taskDetail
      };
    case Types.GET_TASK_DETAIL:
      return {
        ...state,
        taskDetail: action.taskDetail
      };
    case Types.CLEAR_MODAL:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
