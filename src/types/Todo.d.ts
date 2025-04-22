import { Tasktype } from "./Task"

export type TodoList = {
  id: string;
  title: string;
  user: string;
  tasks: Tasktype[];
};