import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./createTodo.css";
export const CreateTodo = ({
  onSubmit,
  resetForm,
  setResetForm,
  taskForUpdate,
  addOrUpdate,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: taskForUpdate,
  });
  const { _id, task, student } = taskForUpdate;

  useEffect(() => {
    if (resetForm) {
      reset({
        task: "",
        student: "",
      });
      setResetForm(false);
    }
  }, [resetForm]);

  useEffect(() => {
    setValue("_id", _id);
    setValue("task", task);
    setValue("student", student);
  }, [taskForUpdate, setValue]);
  return (
    <div className="container-create">
      <h1>{addOrUpdate}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Task"
            name="task"
            ref={register}
          />
          <Form.Control
            size="lg"
            type="text"
            placeholder="Student"
            name="student"
            ref={register}
          />

          <Button type="submit" variant="dark" size="lg" style={{ margin: 8 }}>
            {addOrUpdate}
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};
