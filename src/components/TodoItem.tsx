import { Link } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { useTodos } from "../context/TodoProvider";
import { Tasktype } from "../types/Task";

interface TodoItemProps {
  id: string;
  title: string;
  tasks: Tasktype[];
  progress: number;
}

export function TodoItem({ id, title, tasks, progress }: TodoItemProps) {
  const { deleteTodo, editTodoTitle } = useTodos();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);

  const containerRef = useRef<HTMLDivElement>(null);
  const allCompleted = tasks.length > 0 && tasks.every((t) => t.completed);
  const empty = tasks.length === 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleEditSubmit = async () => {
    if (editText.trim() !== title) {
      await editTodoTitle(id, editText);
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={containerRef}
      className={`todo-item ${allCompleted ? "completed" : ""}`}
      style={{ "--progress": `${progress}%` } as React.CSSProperties}
    >
      <p>
        <input type="checkbox" className="checkbox" checked={allCompleted} readOnly />

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
          <Link to={`/todo/${id}`}>{title}</Link>
        )}

        {empty && <span className="add-tasks-msg">No tasks added</span>}
      </p>

      {!empty && (
        <div className="progress">
          <span className="progress-text">{progress}%</span>
        </div>
      )}

      <div className="kebab-container">
        <FaEllipsisVertical onClick={() => setMenuOpen(!menuOpen)} />
        {menuOpen && (
          <div className="kebab-menu">
            <button
              className="kebab-item"
              onClick={() => {
                setIsEditing(true);
                setMenuOpen(false);
              }}
            >
              Edit
            </button>
            <button
              className="kebab-item"
              onClick={() => {
                deleteTodo(id);
                setMenuOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
