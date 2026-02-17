import type {AddTaskDto} from "@/api/dto/add-task.dto.js";
import {TasksService} from "@/api/services/tasks.service.js";

export const useTaskStore = defineStore('task', () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const addTask = async (task: AddTaskDto) => {
    console.log('add')
    try {
      isLoading.value = true;
      await TasksService.add(task);
    } catch (e) {
      error.value = e as string;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    error,

    addTask,
  }
})
