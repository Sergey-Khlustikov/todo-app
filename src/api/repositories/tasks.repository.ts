import {db} from "@/api/db.js";
import type {AddTaskDto} from "@/api/dto/add-task.dto.js";

export const TasksRepository = {
  getAll: () => {
    return db.tasks.toArray();
  },
  add: (dto: AddTaskDto) => {
    return db.tasks.add({
      ...dto,
      createdAt: new Date(),
      completed: false
    });
  },
};
