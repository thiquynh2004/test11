import React, { useContext, useEffect, useState } from "react";
import { Types } from "../../contexts/actionTypes";
import { Task, TodoContext } from "../../contexts/TodoProvider";
import styles from "./filter.module.css";

export enum FILTER {
  All = "All",
  Active = "Active",
  Complete = "Complete",
}

export const Filters = (): JSX.Element => {
  const { dispatch, taskState } = useContext(TodoContext);
  const { pernamentTasks } = taskState;
  const [valueOption, setValueOption] = useState(FILTER.All);

  useEffect(() => {
    switch (valueOption) {
      case FILTER.All:
        dispatch({
          type: Types.GET_ALL_TASK,
          tasks: pernamentTasks,
        });
        break;
      case FILTER.Active:
        dispatch({
          type: Types.GET_ALL_TASK,
          tasks: pernamentTasks.filter((task: Task) => !task.completed),
        });
        break;
      case FILTER.Complete:
        dispatch({
          type: Types.GET_ALL_TASK,
          tasks: pernamentTasks.filter((task: Task) => task.completed),
        });
    }
  }, [valueOption]);

  return (
    <div className={styles.container}>
      <select
        className={styles.selectBox}
        value={valueOption}
        onChange={(e) => {
          setValueOption(e.target.value as FILTER);
        }}
      >
        {Object.keys(FILTER).map((filter, index) => {
          return (
            <option value={filter} key={index}>
              {filter}
            </option>
          );
        })}
      </select>
    </div>
  );
};
