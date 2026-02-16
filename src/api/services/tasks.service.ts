import {TasksRepository} from "@/api/repositories/tasks.repository.js";
import type {AddTaskDto} from "@/api/dto/add-task.dto.js";

export const TasksService = {
  getAll() {
    return TasksRepository.getAll()
  },
  add(dto: AddTaskDto) {
    return TasksRepository.add(dto)
  }
}
