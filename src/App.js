import { useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/createTodo/CreateTodo";
import { TodoContainer } from "./components/todoContainer/TodoContainer";

function App() {
  const [newTask, setNewTask] = useState(null);
  const [resetForm, setResetForm] = useState(false);
  const [taskForUpdate, setTaskForUpdate] = useState({});
  const [isEditOrAdd, setIsEditOrAdd] = useState("Create a New Task");
  const onSubmit = (data) => {
    setNewTask(data);
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
        />
      </div>
    </div>
  );
}

export default App;
