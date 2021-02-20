import { useState } from "react";
import { CreateTodo } from "./components/createTodo/CreateTodo";
import { TodoContainer } from "./components/todoContainer/TodoContainer";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState(null);
  const [resetForm, setResetForm] = useState(false);
  const [taskForUpdate, setTaskForUpdate] = useState({});
  const [updateTask, setUpdateTask] = useState(null);
  const [isEditOrAdd, setIsEditOrAdd] = useState("Create a New Task");
  const onSubmit = (data) => {
    if (isEditOrAdd == "Create a New Task") {
      setNewTask(data);
    } else {
      setUpdateTask(data);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <CreateTodo
          onSubmit={onSubmit}
          resetForm={resetForm}
          taskForUpdate={taskForUpdate}
          addOrUpdate={isEditOrAdd}
        />
        <TodoContainer
          newTask={newTask}
          setResetForm={setResetForm}
          setTaskForUpdate={setTaskForUpdate}
          setIsEditOrAdd={setIsEditOrAdd}
          taskForUpdate={taskForUpdate}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

export default App;
