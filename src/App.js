import { useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/createTodo/CreateTodo";
import { TodoContainer } from "./components/todoContainer/TodoContainer";

function App() {
  const [newTask, setNewTask] = useState(null);
  const onSubmit = (data) => {
    setNewTask(data);
  };

  return (
    <div className="App">
      <div className="App-header">
        <CreateTodo onSubmit={onSubmit} />
        <TodoContainer newTask={newTask} />
      </div>
    </div>
  );
}

export default App;
