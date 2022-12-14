/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useState } from 'react';
import { getAll, Task, TodoContext } from '../../contexts/TodoProvider';
import {
  AiFillEdit,
  AiOutlineCheckSquare,
  AiOutlineDelete,
  AiOutlineBorder
} from 'react-icons/ai';
import styles from './todoItem.module.css';
import toDoApi from '../../Service/todoApis';
import Modal from '../Modal/Modal';
import moment from 'moment';
import { Types } from '../../contexts/actionTypes';

interface TaskProp {
  task: Task
}
export const TodoItem: React.FC<{task: Task}> = ({ task }) => {
  const { dispatch } = useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);
  const deleteTask = async (id: number) => {
    try {
      const result = await toDoApi.deleteTask(id);
      console.log(result);
      alert('Delete task successfully');
      getAll(dispatch);
    } catch (error) {
      console.log(error);
    }
  };
  const editTask = async (taskId: number, taskDetail: Task) => {
    try {
      const result = await toDoApi.editTask(taskId, taskDetail);
      if (Object.keys(result).length !== 0) {
        alert('Successfully edit task!');
        getAll(dispatch).then(
          () => {},
          () => {}
        );

        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = (task: Task): void => {
    try {
      const taskDetail = {
        id: task.id,
        description: task?.description,
        completed: true,
        createDate: task?.createDate
      };
      dispatch(editTask(Number(task.id), taskDetail));
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskDetail = async (id: number) => {
    try {
      const result = await toDoApi.getTaskDetail(id);
      dispatch({
        type: Types.GET_TASK_DETAIL,
        taskDetail: result
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const renderCardContent = () => {
    return <><div className={styles.content}>
      <div className={styles.left}>
      <h5>{task.description}</h5>
      <div className={styles.time}>
        <div className={styles.timer}>
          <p>Date: {moment(task.createDate).format('MM-DD-YYYY, h:mm:ss a')}</p>
        </div>
      </div>
      </div>
      <div className={styles.right}>
      <div className={styles.icon}>
        <div>
          <AiOutlineDelete
            className={styles.deleteIcon}
            onClick={() => dispatch(deleteTask(task.id))} />
        </div>
        <div>
          {task.completed
            ? (<>
              <AiOutlineCheckSquare className={styles.checkIcon} />
            </>
              )
            : (
              <div className={styles.listIcon}>
                <AiFillEdit
                  className={styles.editIcon}
                  onClick={() => {
                    dispatch(getTaskDetail(task.id));
                    setShowModal(true);
                  } } />
                <AiOutlineBorder
                  className={styles.closeIcon}
                  onClick={() => {
                    updateStatus(task);
                  } } />
              </div>

              )}
        </div>
      </div>
      </div>
    </div></>;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.col}>
          {task.completed ? (<> <div className={styles.card} style={{ backgroundColor: '#00000075', color: '#ffffffeb' }}>{ renderCardContent() }</div></>) : (<div className={styles.card}>{ renderCardContent() }</div>)}
        </div>
      </div>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
};
