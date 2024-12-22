import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onToggle, onRemove }: TodoListProps) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default React.memo(TodoList);
