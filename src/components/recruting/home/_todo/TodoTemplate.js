import { useState, useRef, useCallback } from "react";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

const TodoTemplate = () => {
  const [todos, setTodos] = useState([]);
  const nextId = useRef(0);

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
    <div className="w-[585px] h-[340.88] bg-[#F2F2F7] px-[9px] py-[13px] pb-[20.88px] mx-auto rounded-xl overflow-hidden relative flex">
      <div className="w-1/2 flex flex-col justify-between ">
        <div className="h-[265px] overflow-auto">
          <TodoList todos={incompleteTodos} onToggle={onToggle} />
        </div>
        <TodoInsert onInsert={onInsert} />
      </div>
      <div className="w-1/2">
        <div className="h-[307px] overflow-auto">
          <TodoList todos={completedTodos} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
};
export default TodoTemplate;
