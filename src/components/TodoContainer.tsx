import { useTodos } from "../context/TodoProvider";
import { TodoItem } from "./TodoItem";
import { AddItem } from "./AddItem";
import { useMemo } from "react";

export function TodoContainer() {
  const { todos, filter, addTodo } = useTodos();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'all') return true;
      if (filter === 'completed') {
        return todo.tasks.length > 0 && todo.tasks.every((task) => task.completed);
      }
      if (filter === 'incomplete') {
        return todo.tasks.length === 0 || todo.tasks.some((task) => !task.completed);
      }
      return false;
    });
  }, [todos, filter]);

  return (
    <div className="todo-container">
      {filteredTodos.map(todo => {
        const total = todo.tasks.length;
        const done = todo.tasks.filter(t => t.completed).length;
        const progress = total === 0 ? 0 : Math.round((done / total) * 100);

        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            tasks={todo.tasks}
            progress={progress}
          />
        );
      })}
      <AddItem onAdd={addTodo} placeholder="Write to add new list" />
    </div>
  );
}