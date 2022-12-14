/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { getAll, Task, TodoContext } from '../../contexts/TodoProvider';
import { AiFillCloseCircle } from 'react-icons/ai';
import styles from './modal.module.css';
import moment from 'moment';
import toDoApi from '../../Service/todoApis';
import { Types } from '../../contexts/actionTypes';

interface ModalProps {
  showModal: boolean
  setShowModal: (val: boolean) => void

}
const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal
}) => {
  const { taskState, dispatch } = useContext(TodoContext);
  const { taskDetail } = taskState;
  const handleChangeDate = (e: React.FormEvent<HTMLInputElement>) => {
    const createDate = moment(new Date(e.currentTarget.value)).format('MM-DD-YYYY, h:mm:ss a');
    formik.setFieldValue('createDate', createDate);
  };
  const getTaskDetail = async (id: number) => {
    try {
      const result = await toDoApi.getTaskDetail(id);
      dispatch({
        type: Types.GET_TASK_DETAIL,
        taskDetail: result
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editTask = async (data: Task) => {
    try {
      const result = await toDoApi.editTask(taskDetail.id, data);
      alert('Successfully!');
      setShowModal(false);
      getTaskDetail(taskDetail.id);
      getAll(dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: taskDetail?.id,
      description: taskDetail?.description,
      completed: taskDetail?.completed,
      createDate: moment(taskDetail?.createDate).format('MM-DD-YYYY, h:mm:ss a')
    },
    onSubmit: (values) => {
      dispatch(editTask(values));
      getAll(dispatch);
    }
  });
  return <div className={styles.modal}>
  <div className={styles.content}>

  <div className={styles.closeModal}>
  <h4>{taskDetail?.description}</h4>
      <AiFillCloseCircle className={styles.modalCloseIcon} onClick={() => {
        dispatch({ type: Types.CLEAR_MODAL });
        setShowModal(false);
        getAll(dispatch);
      }}/>

  </div>
  <div className={styles.title}>
  </div>
  <div className={styles.body}>
  <form onSubmit={formik.handleSubmit} className={styles.form}>
     <p>Your description</p>
     <input
       id="description"
       name="description"
       type="text"
       placeholder=""
       className={styles.inputTask}
       onChange={formik.handleChange}
       required
     />
     <p>Date</p>
     <input
       id="createDate"
       name="createDate"
       type="datetime-local"
       className={styles.inputTaskTimer}
       onChange={handleChangeDate}
       min={moment(new Date()).format('YYYY-MM-DDTHH:mm')}
       required
     />
     <div className={styles.buttonModal}>
     <button type="submit" className={styles.buttonEdit}>Edit</button>
     <button
     className={styles.buttonCenter}
      onClick={() => {
        setShowModal(false);
        dispatch({ type: Types.CLEAR_MODAL });
        getAll(dispatch);
      }}
      id="cancelBtn"
    >
      Cancel
    </button>
     </div>
   </form>
  </div>
  </div>
</div>;
};
export default Modal;
