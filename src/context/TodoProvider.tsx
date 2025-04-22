import { createContext, useContext, useReducer, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthProvider";
import { openDB } from "idb";
import { TodoList } from "../types/Todo";

// Types
type TodoState = {
  todos: TodoList[];
};

type Action =
  | { type: "SET_TODOS"; payload: TodoList[] }
  | { type: "ADD_TODO"; payload: TodoList }
  | { type: "UPDATE_TODO"; payload: TodoList }
  | { type: "TOGGLE_TASK"; payload: { todoId: string; taskId: string } }
  | { type: "DELETE_TODO"; payload: string };

// Reducer
function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case "SET_TODOS":
      return { todos: action.payload };
    case "ADD_TODO":
      return { todos: [...state.todos, action.payload] };
    case "UPDATE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "TOGGLE_TASK":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.todoId) return todo;
          const updatedTasks = todo.tasks.map((task) =>
            task.id === action.payload.taskId
              ? { ...task, completed: !task.completed }
              : task
          );
          return { ...todo, tasks: updatedTasks };
        }),
      };
    case "DELETE_TODO":
      return { todos: state.todos.filter((todo) => todo.id !== action.payload) };
    default:
      return state;
  }
}

// Context
interface TodoContextType {
  todos: TodoList[];
  filter: 'all' | 'completed' | 'incomplete';
  setFilter: (filter: 'all' | 'completed' | 'incomplete') => void;
  addTodo: (title: string) => Promise<void>;
  getTodoById: (id: string) => TodoList | undefined;
  addTaskToTodo: (todoId: string, taskText: string) => Promise<void>;
  toggleTask: (todoId: string, taskId: string) => Promise<void>;
  deleteTask: (todoId: string, taskId: string) => Promise<void>;
  editTask: (todoId: string, taskId: string, newText: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodoTitle: (id: string, newTitle: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// IndexedDB helpers
const initDB = async () =>
  openDB("TodoDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("todos")) {
        db.createObjectStore("todos", { keyPath: "id" });
      }
    },
  });

const saveTodoToDB = async (todo: TodoList) => {
  const db = await initDB();
  await db.put("todos", todo);
};

const getTodosFromDB = async (): Promise<TodoList[]> => {
  const db = await initDB();
  return (await db.getAll("todos")) || [];
};

const deleteTodoFromDB = async (id: string) => {
  const db = await initDB();
  await db.delete("todos", id);
};

// Provider
export function TodoProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  // Load user-specific todos on mount or user change
  useEffect(() => {
    const fetchUserTodos = async () => {
      if (!currentUser) return;
      const stored = await getTodosFromDB();
      const userTodos = stored.filter((t) => t.user === currentUser.email);
      dispatch({ type: "SET_TODOS", payload: userTodos });
    };
    fetchUserTodos();
  }, [currentUser]);

  const addTodo = async (title: string) => {
    if (!currentUser) return;
    const newTodo: TodoList = {
      id: uuidv4(),
      title,
      user: currentUser.email,
      tasks: [],
    };
    await saveTodoToDB(newTodo);
    dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  const getTodoById = (id: string) =>
    state.todos.find((t) => t.id === id && t.user === currentUser?.email);

  const addTaskToTodo = async (todoId: string, taskText: string) => {
    const todo = getTodoById(todoId);
    if (!todo) return;
    const updated = {
      ...todo,
      tasks: [...todo.tasks, { id: uuidv4(), text: taskText, completed: false }],
    };
    await saveTodoToDB(updated);
    dispatch({ type: "UPDATE_TODO", payload: updated });
  };

  const toggleTask = async (todoId: string, taskId: string) => {
    const todo = getTodoById(todoId);
    if (!todo) return;
    const updatedTasks = todo.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    const updated = { ...todo, tasks: updatedTasks };
    await saveTodoToDB(updated);
    dispatch({ type: "UPDATE_TODO", payload: updated });
  };

  const deleteTask = async (todoId: string, taskId: string) => {
    const todo = getTodoById(todoId);
    if (!todo) return;
    const updatedTasks = todo.tasks.filter((task) => task.id !== taskId);
    const updated = { ...todo, tasks: updatedTasks };
    await saveTodoToDB(updated);
    dispatch({ type: "UPDATE_TODO", payload: updated });
  };

  const editTask = async (todoId: string, taskId: string, newText: string) => {
    const todo = getTodoById(todoId);
    if (!todo) return;
    const updatedTasks = todo.tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    const updated = { ...todo, tasks: updatedTasks };
    await saveTodoToDB(updated);
    dispatch({ type: "UPDATE_TODO", payload: updated });
  };

  const deleteTodo = async (id: string) => {
    await deleteTodoFromDB(id);
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const editTodoTitle = async (id: string, newTitle: string) => {
    const todo = getTodoById(id);
    if (!todo) return;
    const updated = { ...todo, title: newTitle };
    await saveTodoToDB(updated);
    dispatch({ type: "UPDATE_TODO", payload: updated });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        filter,
        setFilter,
        addTodo,
        getTodoById,
        addTaskToTodo,
        toggleTask,
        deleteTask,
        editTask,
        deleteTodo,
        editTodoTitle,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Hook
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used inside TodoProvider");
  return context;
}