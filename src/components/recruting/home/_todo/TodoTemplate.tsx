import { useState, useRef, useCallback, useEffect } from "react";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodoStatus
} from "./service/todo";

export default function TodoTemplate() {
  const [todos, setTodos] = useState<Todo>();
  const nextId = useRef<number>(0);

  //get
  const { data: todo } = useQuery(["todo"], getTodos, {
    onError: (error) => {
      console.error("todo 조회 실패:", error);
    }
  });

  //post
  const { mutate } = useMutation(createTodo, {
    onSuccess: () => {
      console.log("todo 성공적으로 등록되었습니다!");
    },
    onError: (error) => {
      console.error("todo 생성 중 오류 발생:", error);
    }
  });

  const onInsert = useCallback(async (content: string) => {
    try {
      const newTodo: TodoRequest = {
        content
      };
      const { data }: { data: Todo } = await mutate(newTodo);

      // setTodos((prev) => [...prev, data]);
    } catch (error) {
      console.error("TODO 추가 실패:", error);
    }
  }, []);

  // const onRemove = useCallback(
  //   (id: number) => {
  //     setTodos(todos.filter((todo) => todo.id !== id));
  //   },
  //   [todos]
  // );

  const onRemove = useCallback(async (id: number) => {
    await deleteTodo(id.toString());
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  // const onToggle = useCallback((id: number) => {
  //   setTodos((todos) =>
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, status: !todo.status } : todo
  //     )
  //   );
  // }, []);

  const onToggle = useCallback(async (id: number) => {
    await updateTodoStatus(id.toString());
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
