import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const CreateTodo = ({
  onSubmit,
  resetForm,
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
    }
  }, [resetForm]);

  useEffect(() => {
    setValue("_id", _id);
    setValue("task", task);
    setValue("student", student);
  }, [taskForUpdate, setValue]);
  return (
    <div>
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
          <br />
          <Form.Control
            size="lg"
            type="text"
            placeholder="Student"
            name="student"
            ref={register}
          />
          <br />
          <Button type="submit" size="lg">
            {addOrUpdate}
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};
