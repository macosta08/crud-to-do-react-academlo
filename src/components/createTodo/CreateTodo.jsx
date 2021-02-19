import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const CreateTodo = ({ onSubmit }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
	  
  });

  return (
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
          Create Task
        </Button>
      </Form.Group>
    </form>
  );
};
