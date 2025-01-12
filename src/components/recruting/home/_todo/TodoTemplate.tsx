import { useState, useRef, useCallback } from "react";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodoStatus
} from "./service/todo";

type TodoItem = {
  id: number;
  content: string;
  status: boolean;
};

type TodosResponse = {
  [key: string]: TodoItem[];
};

export default function TodoTemplate() {
  const [todos, setTodos] = useState<TodosResponse>({
    "미완료 리스트": [],
    "완료 리스트": []
  });
  const nextId = useRef<number>(0);

  const queryClient = useQueryClient();

  // API에서 투두 데이터 가져오기
  const { data: todoData } = useQuery(["todos"], getTodos, {
    onSuccess: (data) => {
      setTodos(data);
    }
  });

  const createTodoMutation = useMutation(
    (content: string) => createTodo(content),
    {
      onSuccess: (newTodo: TodoItem) => {
        setTodos((prevTodos) => {
          queryClient.invalidateQueries(["todos"]);
          const key = Object.keys(prevTodos)[0] || "additionalProp1";
          return {
            ...prevTodos,
            [key]: [...(prevTodos[key] || []), newTodo]
          };
        });
      },
      onError: (error) => {
        console.error("TODO 생성 중 오류 발생:", error);
      }
    }
  );

  const onInsert = useCallback(
    (content: string) => {
      createTodoMutation.mutate(content);
    },
    [createTodoMutation]
  );

  const deleteTodoMutation = useMutation(
    (id: number) => deleteTodo(Number(id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
      onError: (error) => {
        console.error("TODO 삭제 중 오류 발생:", error);
      }
    }
  );

  const onRemove = useCallback(
    (id: number, key: string) => {
      deleteTodoMutation.mutate(id, {
        onSuccess: () => {
          setTodos((prevTodos) => ({
            ...prevTodos,
            [key]: prevTodos[key]?.filter((todo) => todo.id !== id) || []
          }));
        }
      });
    },
    [deleteTodoMutation]
  );

  const updateTodoStatusMutation = useMutation(
    (id: number) => updateTodoStatus(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
      onError: (error) => {
        console.error("TODO 상태 변경 중 오류 발생:", error);
      }
    }
  );

  const onToggle = useCallback(
    (id: number) => {
      updateTodoStatusMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(["todos"]);
        }
      });
    },
    [updateTodoStatusMutation, queryClient]
  );

  // 완료된 투두와 미완료 투두 분리
  const incompleteTodos = todoData?.["미완료 리스트"] || [];
  const completedTodos = todoData?.["완료 리스트"] || [];

  return (
    <div className="w-[585px] h-[340.88] bg-[#F2F2F7] px-[9px] py-[13px] pb-[20.88px] mx-auto rounded-xl overflow-hidden relative flex">
      <div className="w-1/2 flex flex-col justify-between ">
        <div className="h-[265px] overflow-auto border-r-4">
          <TodoList
            todos={incompleteTodos}
            onToggle={onToggle}
            onRemove={(id) => onRemove(id, "additionalProp1")}
          />
        </div>
        <TodoInsert onInsert={onInsert} />
      </div>
      <div className="w-1/2">
        <div className="h-[307px] overflow-auto">
          <TodoList
            todos={completedTodos}
            onToggle={onToggle}
            onRemove={(id) => onRemove(id, "additionalProp1")}
          />
        </div>
      </div>
    </div>
  );
}
