<script lang="ts" setup>
  import AddNewTask from '@/components/AddNewTask.vue'
  import TaskList from '@/components/TaskList.vue'
  import { useTaskStore } from '@/stores/task.store.js'

  const taskStore = useTaskStore()
</script>

<template>

  <v-container class="mx-auto" max-width="700">
    <div class="mb-3">
      <add-new-task @task-added="taskStore.fetchTasks" />
    </div>

    <v-card>
      <task-list />
    </v-card>
  </v-container>
</template>
