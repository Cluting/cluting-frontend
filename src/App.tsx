import React from "react";
import "./App.css";
import TodoTemplate from "./components/TodoTemplate";

const App = (): JSX.Element => {
  return (
    <div className="app">
      <TodoTemplate />
    </div>
  );
};

export default App;
