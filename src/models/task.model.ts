import type Priority from "@/models/priority.enum.js";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  categoryId?: number;
  tagIds?: number[];
  dueDate?: Date | null;
  createdAt: Date;
}
