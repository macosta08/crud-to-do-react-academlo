import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { getMethod } from "../../utils/methodHttp";
import { TodoItem } from "../todoItem/TodoItem";

export const TodoContainer = ({
  newTask,
  setResetForm,
  setTaskForUpdate,
  setIsEditOrAdd,
  taskForUpdate,
  updateTask,
}) => {
  const [tasks, setTasks] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [taskDone, setTaskDone] = useState(null);
  const [idTaskDone, setIdTaskDone] = useState(null);

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
        setResetForm(true);
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
        setIsEditOrAdd("Create a New Task");
        setResetForm(true);
      });
    }
  }, [idToDelete]);

  //--PUT-Checked-Task
  useEffect(() => {
    if (idTaskDone) {
      axios.put(
        `https://todos-academlo.herokuapp.com/api/todo/${idTaskDone}`,
        taskDone
      );
    }
  }, [taskDone, idTaskDone]);

  //--PUT-Edit-Task
  useEffect(() => {
    if (updateTask) {
      const res = axios.put(
        `https://todos-academlo.herokuapp.com/api/todo/${taskForUpdate.id}`,
        updateTask
      );
      res.then((response) => {
        const { _id: id, task, student } = response.data;
        const findTask = tasks.find((element) => element._id == id);
        [findTask.task, findTask.student] = [task, student];
        setTasks([...tasks]);
        setIsEditOrAdd("Create a New Task");
        setResetForm(true);
      });
    }
  }, [updateTask]);

  const handleDelete = (idDelete) => {
    setIdToDelete(idDelete);
  };

  const handleChecked = (isCompleted, id) => {
    setIdTaskDone(id);
    setTaskDone({ isCompleted });
  };

  const handleUpdateTask = (dataTask) => {
    setTaskForUpdate(dataTask);
    setIsEditOrAdd("Edit Task");
  };
  const todoItem = tasks.map((task) => (
    <Col key={task._id}>
      <TodoItem
        id={task._id}
        task={task.task}
        student={task.student}
        isCompleted={task.isCompleted}
        handleDelete={handleDelete}
        handleChecked={handleChecked}
        handleUpdateTask={handleUpdateTask}
      />
    </Col>
  ));

  return (
    <Container>
      {loading && <Spinner animation="grow" />}
      {!loading && <Row>{todoItem}</Row>}
    </Container>
  );
};
