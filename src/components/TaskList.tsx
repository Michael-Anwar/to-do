import { TodoList } from "../types/Todo";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  todo: TodoList;
}

export const TaskList = ({ todo }: TaskListProps) => {
  return (
    <ul className="todo-container">
      {todo.tasks.map((task) => (
        <TaskItem key={task.id} todoId={todo.id} task={task} />
      ))}
    </ul>
  );
};
