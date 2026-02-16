import type {Task} from "@/models/task.model.js";

export type AddTaskDto = Pick<Task,
  'title' | 'description' | 'priority' | 'dueDate'
>;
