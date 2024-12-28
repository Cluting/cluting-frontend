import { useState, useRef, useCallback } from "react";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodoStatus
} from "./service/todo";

// 타입 정의
type TodoItem = {
  id: number;
  content: string;
  status: boolean;
};

type TodosResponse = {
  [key: string]: TodoItem[];
};

export default function TodoTemplate() {
  const [todos, setTodos] = useState<TodosResponse>({});
  const nextId = useRef<number>(0);

  // // API에서 투두 데이터 가져오기
  // const { data: todoData } = useQuery(["todo"], getTodos, {
  //   onSuccess: (data) => {
  //     setTodos(data);
  //   },
  //   onError: (error) => {
  //     console.error("TODO 조회 실패:", error);
  //   }
  // });

  const createTodoMutation = useMutation(createTodo, {
    onSuccess: (newTodo: TodoItem) => {
      setTodos((prevTodos) => {
        const key = "additionalProp1"; // 기본 키 사용 (필요 시 변경)
        return {
          ...prevTodos,
          [key]: [...(prevTodos[key] || []), newTodo]
        };
      });
    },
    onError: (error) => {
      console.error("TODO 생성 중 오류 발생:", error);
    }
  });

  const onInsert = useCallback((content: string) => {
    createTodoMutation.mutate({ content });
  }, []);

  const onRemove = useCallback(async (id: number, key: string) => {
    await deleteTodo(id.toString());
    setTodos((prevTodos) => ({
      ...prevTodos,
      [key]: prevTodos[key].filter((todo) => todo.id !== id)
    }));
  }, []);

  const onToggle = useCallback(async (id: number, key: string) => {
    await updateTodoStatus(id.toString());
    setTodos((prevTodos) => ({
      ...prevTodos,
      [key]: prevTodos[key].map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    }));
  }, []);

  // 완료된 투두와 미완료 투두 분리
  const incompleteTodos: TodoItem[] = Object.values(todos)
    .flat()
    .filter((todo) => !todo.status);
  const completedTodos: TodoItem[] = Object.values(todos)
    .flat()
    .filter((todo) => todo.status);

  return (
    <div className="w-[585px] h-[340.88] bg-[#F2F2F7] px-[9px] py-[13px] pb-[20.88px] mx-auto rounded-xl overflow-hidden relative flex">
      <div className="w-1/2 flex flex-col justify-between ">
        <div className="h-[265px] overflow-auto border-r-4">
          <TodoList
            todos={incompleteTodos}
            onToggle={(id) => onToggle(id, "additionalProp1")} // 기본 키 지정
            onRemove={(id) => onRemove(id, "additionalProp1")}
          />
        </div>
        <TodoInsert onInsert={onInsert} />
      </div>
      <div className="w-1/2">
        <div className="h-[307px] overflow-auto">
          <TodoList
            todos={completedTodos}
            onToggle={(id) => onToggle(id, "additionalProp1")}
            onRemove={(id) => onRemove(id, "additionalProp1")}
          />
        </div>
      </div>
    </div>
  );
}
