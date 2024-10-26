import { useState, useRef, useCallback } from "react";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import "./TodoTemplate.scss";

const TodoTemplate = () => {
  const [todos, setTodos] = useState([]);
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);

  const incompleteTodos = todos.filter((todo) => !todo.checked);
  const completedTodos = todos.filter((todo) => todo.checked);

  return (
    <div className="TodoTemplate">
      <div className="incompleteTodos">
        <TodoList todos={incompleteTodos} onToggle={onToggle} />
        <TodoInsert onInsert={onInsert} />
      </div>
      <div className="completedTodos">
        <TodoList todos={completedTodos} onToggle={onToggle} />
      </div>
      {/* <div className="content">
        <div className="incompleteTodos">
          <TodoList todos={incompleteTodos} onToggle={onToggle} />
          <TodoInsert onInsert={onInsert} />
        </div>
        <div className="completedTodos">
          <TodoList todos={completedTodos} onToggle={onToggle} />
        </div>
      </div> */}
    </div>
  );
};
export default TodoTemplate;
