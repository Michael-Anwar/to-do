import { useState, useRef, useEffect } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useTodos } from "../context/TodoProvider";

interface TaskItemProps {
  todoId: string;
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
}

export const TaskItem = ({ todoId, task }: TaskItemProps) => {
  const { toggleTask, deleteTask, editTask } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleEditSubmit = async () => {
    if (editText.trim() !== task.text) {
      await editTask(todoId, task.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <li className="todo-item task">
      <div className="">
        <input
          type="checkbox"
          className="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(todoId, task.id)}
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSubmit();
            }}
            autoFocus
            className="edit-input"
          />
        ) : (
          <span>{task.text}</span>
        )}
      </div>
      <div className="kebab-container" ref={menuRef}>
        <FaEllipsisVertical
          className="kebab-icon"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
        {isMenuOpen && (
          <div className="kebab-menu">
            <button
              className="kebab-item"
              onClick={() => {
                setIsEditing(true);
                setIsMenuOpen(false);
              }}
            >
              Edit
            </button>
            <button
              className="kebab-item"
              onClick={() => {
                deleteTask(todoId, task.id);
                setIsMenuOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
};
