import { useParams } from "react-router-dom";
import { useTodos } from "../context/TodoProvider";
import { AddItem } from "../components/AddItem";
import { useEffect, useRef, useState } from "react";
import { TaskList } from "../components/TaskList";

const Todo = () => {
  const { id } = useParams();
  const { getTodoById, addTaskToTodo,  } =
    useTodos();

  const [menuOpenTaskId, setMenuOpenTaskId] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const todo = getTodoById(id || "");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpenTaskId &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setMenuOpenTaskId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpenTaskId]);



  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="">
      <h2>{todo.title}</h2>

      <TaskList
        todo={todo}
      />

      <div className="todo-container">
        <AddItem
          onAdd={(text) => addTaskToTodo(id!, text)}
          placeholder="New task"
        />
      </div>
    </div>
  );
};

export default Todo;
