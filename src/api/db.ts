import {Dexie, type Table} from 'dexie';
import type {Task} from "@/models/task.model.js";

export class TodoDB extends Dexie {
  tasks!: Table<Task>;

  constructor() {
    super('TodoAppDB');
    this.version(1).stores({
      tasks: '++id, title, priority, completed, categoryId, *tagIds, dueDate, createdAt',
    });
  }
}

export const db = new TodoDB();
