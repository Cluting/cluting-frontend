import { useState, useRef, useCallback } from "react";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

export default function TodoTemplate() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const nextId = useRef<number>(0);

  const onInsert = useCallback((content: string) => {
    const todo: Todo = {
      id: nextId.current,
      content,
      status: false
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(
    (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback((id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  }, []);

  const incompleteTodos = todos.filter((todo) => !todo.status);
  const completedTodos = todos.filter((todo) => todo.status);

  return (
    <div className="w-[585px] h-[340.88] bg-[#F2F2F7] px-[9px] py-[13px] pb-[20.88px] mx-auto rounded-xl overflow-hidden relative flex">
      <div className="w-1/2 flex flex-col justify-between ">
        <div className="h-[265px] overflow-auto border-r-4">
          <TodoList
            todos={incompleteTodos}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        </div>
        <TodoInsert onInsert={onInsert} />
      </div>
      <div className="w-1/2">
        <div className="h-[307px] overflow-auto">
          <TodoList
            todos={completedTodos}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        </div>
      </div>
    </div>
  );
}
