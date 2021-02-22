import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { request } from "../../utils/HttpMethods";
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
    const getTasks = async (endpoint = "/todos", method = "GET") => {
      const response = await request(method, endpoint);
      setTasks(response.data.todos);
      setLoading(false);
    };
    getTasks();
  }, []);

  //--POST---
  useEffect(() => {
    const insertTask = async (newTask, endpoint = "/todo", method = "POST") => {
      const response = await request(method, endpoint, newTask);
      setTasks([response.data, ...tasks]);
      setResetForm(true);
    };
    if (newTask) insertTask(newTask);
  }, [newTask]);

  //--DELETE---
  useEffect(() => {
    const deleteTask = async (
      idToDelete,
      endpoint = "/todo",
      method = "DELETE"
    ) => {
      await request(method, `${endpoint}/${idToDelete}`);
      const filterTasks = tasks.filter((task) => task._id !== idToDelete);
      setTasks(filterTasks);
      setIsEditOrAdd("Create a New Task");
      setResetForm(true);
    };
    if (idToDelete) deleteTask(idToDelete);
  }, [idToDelete]);

  //--PUT-Checked-Task
  useEffect(() => {
    const markAsDone = async (
      idTaskDone,
      taskDone,
      endpoint = "/todo",
      method = "PUT"
    ) => await request(method, `${endpoint}/${idTaskDone}`, taskDone);

    if (idTaskDone) markAsDone(idTaskDone, taskDone);
  }, [taskDone, idTaskDone]);

  //--PUT-Edit-Task
  useEffect(() => {
    const updTask = async (
      idToUpdate,
      updateTask,
      endpoint = "/todo",
      method = "PUT"
    ) => {
      const response = await request(
        method,
        `${endpoint}/${idToUpdate}`,
        updateTask
      );
      const { _id: id, task, student } = response.data;
      const findTask = tasks.find((element) => element._id == id);
      [findTask.task, findTask.student] = [task, student];
      setTasks([...tasks]);
      setIsEditOrAdd("Create a New Task");
      setResetForm(true);
    };
    if (updateTask) updTask(taskForUpdate.id, updateTask);
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
