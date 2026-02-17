import type { AddTaskDto } from '@/api/dto/add-task.dto.js'
import { TasksRepository } from '@/api/repositories/tasks.repository.js'

export const TasksService = {
  getAll () {
    return TasksRepository.getAll()
  },
  add (dto: AddTaskDto) {
    return TasksRepository.add(dto)
  },
  update (id: number, data: any) {
    return TasksRepository.update(id, data)
  },
}
