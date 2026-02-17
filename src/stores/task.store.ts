import type { AddTaskDto } from '@/api/dto/add-task.dto.js'
import type { Task } from '@/models/task.model.js'
import { TasksService } from '@/api/services/tasks.service.js'

export const useTaskStore = defineStore('task', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const addTask = async (task: AddTaskDto) => {
    try {
      isLoading.value = true
      await TasksService.add(task)
    } catch (error_) {
      error.value = error_ as string
    } finally {
      isLoading.value = false
    }
  }

  const list = ref<Task[]>([])

  const fetchTasks = async () => {
    list.value = await TasksService.getAll()
  }

  const toggleTaskStatus = async (id: number, completed: boolean) => {
    try {
      await TasksService.update(id, { completed })
      const task = list.value.find(t => t.id === id)
      if (task) {
        task.completed = completed
      }
    } catch (error_) {
      error.value = error_ as string
    }
  }

  return {
    isLoading,
    error,
    list,

    addTask,
    fetchTasks,
    toggleTaskStatus,
  }
})
