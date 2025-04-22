// types (for reference)
type Task = {
    id: string;
    text: string;
    completed: boolean;
  };
  
  type TodoList = {
    id: string;
    title: string;
    tasks: Task[];
  };
  
  // mock data
  export const mockTodoLists: TodoList[] = [
    {
      id: "1",
      title: "Grocery Shopping",
      tasks: [
        { id: "1-1", text: "Buy milk", completed: true },
        { id: "1-2", text: "Pick up eggs", completed: true },
        { id: "1-3", text: "Get fresh bread", completed: true },
      ],
    },
    {
      id: "2",
      title: "Work Projects",
      tasks: [
        { id: "2-1", text: "Finish homepage redesign", completed: false },
        { id: "2-2", text: "Email client feedback", completed: true },
        { id: "2-3", text: "Deploy staging build", completed: false },
        { id: "2-4", text: "Write unit tests", completed: false },
      ],
    },
    {
      id: "3",
      title: "Weekend Errands",
      tasks: [
        { id: "3-1", text: "Car wash", completed: true },
        { id: "3-2", text: "Library books return", completed: true },
        { id: "3-3", text: "Pick up dry cleaning", completed: false },
      ],
    },
    {
      id: "4",
      title: "Study Plan",
      tasks: [
        { id: "4-1", text: "Read React Hooks docs", completed: false },
        { id: "4-2", text: "Complete TypeScript tutorial", completed: false },
        { id: "4-3", text: "Build sample CRUD app", completed: false },
      ],
    },
  ];
  