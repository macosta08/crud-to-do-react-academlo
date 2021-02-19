import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getMethod } from "../../utils/methodHttp";
import { TodoItem } from "../todoItem/TodoItem";

export const TodoContainer = ({ newTask }) => {
  const [tasks, setTasks] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [taskDone, setTaskDone] = useState(null);
  const [idTaskDone, setIdTaskDone] = useState(null);
  //const { _id, task, student, isCompleted } = tasks;

  //----GET---
  useEffect(() => {
    const infoTasks = async () => {
      const res = await getMethod(
        "https://todos-academlo.herokuapp.com/api/todos"
      );
      setTasks(res.data.todos);
      setLoading(false);
    };
    infoTasks();
  }, []);
  //--POST---
  useEffect(() => {
    if (newTask) {
      const res = axios.post(
        "https://todos-academlo.herokuapp.com/api/todo",
        newTask
      );
      res.then((response) => {
        setTasks([response.data, ...tasks]);
      });
    }
  }, [newTask]);

  //--DELETE---
  useEffect(() => {
    if (idToDelete) {
      const res = axios.delete(
        `https://todos-academlo.herokuapp.com/api/todo/${idToDelete}`
      );
      res.then(() => {
        const filterTask = tasks.filter((task) => task._id !== idToDelete);
        setTasks(filterTask);
      });
    }
  }, [idToDelete]);

  const handleDelete = (idDelete) => {
    setIdToDelete(idDelete);
  };

  const handleChecked = (isCompleted, id) => {
    console.log("id: ", id, "isCompleted: ", isCompleted);
    setIdTaskDone(id);
    setTaskDone({ isCompleted });
  };
  const todoItem = tasks.map((task) => (
    <tr key={task._id}>
      <TodoItem
        id={task._id}
        task={task.task}
        student={task.student}
        isCompleted={task.isCompleted}
        handleDelete={handleDelete}
        handleChecked={handleChecked}
      />
    </tr>
  ));

  return (
    <>
      {!loading && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Done</th>
              <th colSpan="2">Task</th>
              <th>Student</th>
            </tr>
          </thead>
          <tbody>{todoItem}</tbody>
        </Table>
      )}
    </>
  );
};
