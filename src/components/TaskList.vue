<script setup lang="ts">
  import { useDate } from 'vuetify'
  import { useTaskStore } from '@/stores/task.store.js'

  const date = useDate()

  const taskStore = useTaskStore()
  taskStore.fetchTasks()

  const formattedList = computed(() => {
    return taskStore.list.map(task => {
      return {
        ...task,
        dueDate: task.dueDate ? date.format(task.dueDate, 'fullDateWithWeekday') : '',
      }
    })
  })

  function test () {
    console.log('test')
  }

  function toggleStatus (id: number, value: boolean) {
    taskStore.toggleTaskStatus(id, value)
  }
</script>

<template>
  <v-list
    lines="two"
  >
    <v-list-item
      v-for="task in formattedList"
      :key="task.id"
      :class="['py-3', { 'opacity-50': task.completed }]"
      @click="test"
    >
      <template #prepend>
        <v-list-item-action start>
          <v-checkbox-btn
            :model-value="task.completed"
            @click.stop
            @update:model-value="toggleStatus(task.id, $event)"
          />
        </v-list-item-action>
      </template>

      <v-list-item-title>{{ task.title }}</v-list-item-title>

      <v-list-item-subtitle class="text-high-emphasis">{{ task.description }}</v-list-item-subtitle>

      <v-list-item-subtitle v-if="task.dueDate" class="mt-3 font-italic">
        <v-icon class="mr-1">mdi-calendar-clock</v-icon>
        <span>{{ task.dueDate }}</span>
      </v-list-item-subtitle>

      <template #append>
        <v-list-item-action class="flex-column align-end">
          <v-icon @click.stop>mdi-delete</v-icon>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped>

</style>
