import React from "react";
import { Button, Form } from "react-bootstrap";

export const TodoItem = ({
  id,
  task,
  student,
  isCompleted,
  handleDelete,
  handleChecked,
}) => {
  return (
    <>
      <td>
        <Form.Check
          aria-label="option 1"
          defaultChecked={isCompleted}
          onChange={({ target }) => handleChecked(target.checked, id)}
        />
      </td>
      <td colSpan="2">{task}</td>
      <td>{student}</td>
      <td>
        <Button variant="light">Update</Button>
      </td>
      <td>
        <Button variant="light" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </td>
    </>
  );
};
