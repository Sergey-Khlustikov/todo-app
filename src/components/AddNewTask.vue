<script setup lang="ts">
  import type { AddTaskDto } from '@/api/dto/add-task.dto.js'
  import { useRules } from 'vuetify/lib/labs/rules/index.js'
  import { useComponentState } from '@/composables/component-state.composable.js'
  import Priority from '@/models/priority.enum.js'
  import { useTaskStore } from '@/stores/task.store.js'

  const taskStore = useTaskStore()
  const rules = useRules()

  const dialog = shallowRef(false)

  const task = ref<AddTaskDto>({
    title: '',
    description: '',
    priority: Priority.LOW,
    dueDate: null,
  })

  const isValid = ref<boolean | null>(null)

  async function addNewTask () {
    if (isValid.value !== true) {
      return
    }

    await taskStore.addTask(task.value)

    if (!taskStore.error) {
      dialog.value = false
    }
  }
</script>

<template>
  <div>
    <div class="pa-4 text-center">
      <v-dialog v-model="dialog" max-width="600">
        <template #activator="{ props: activatorProps }">
          <v-btn
            class="text-none font-weight-regular"
            prepend-icon="mdi-plus"
            text="New Task"
            variant="tonal"
            v-bind="activatorProps"
          />
        </template>

        <v-form v-model="isValid" validate-on="submit lazy" @submit.prevent="addNewTask">
          <v-card title="Adding new task">
            <v-card-text>
              <v-row dense>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="task.title"
                    label="Title *"
                    :rules="[rules.required(), rules.minLength(3), rules.maxLength(40)]"
                    validate-on="blur"
                    variant="outlined"
                  />
                </v-col>

                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="task.description"
                    label="Description"
                    :rules="[rules.required(), rules.minLength(2), rules.maxLength(255)]"
                    validate-on="blur"
                    variant="outlined"
                  />
                </v-col>

                <v-col cols="12" sm="12">
                  <p>Priority:</p>
                  <v-radio-group v-model="task.priority" inline>
                    <v-radio :value="Priority.LOW">
                      <template #label>
                        Low
                        <v-icon color="green" icon="mdi-arrow-down-thin-circle-outline" />
                      </template>
                    </v-radio>
                    <v-radio :value="Priority.MEDIUM">
                      <template #label>
                        Medium
                        <v-icon color="primary" icon="mdi-dots-horizontal-circle-outline" />
                      </template>
                    </v-radio>
                    <v-radio :value="Priority.HIGH">
                      <template #label>
                        High
                        <v-icon color="red" icon="mdi-arrow-up-thin-circle-outline" />
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-date-input
                    label="Due date"
                    persistent-placeholder
                    prepend-icon=""
                    variant="outlined"
                  />
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />

              <v-btn
                :disabled="taskStore.isLoading"
                text="Close"
                variant="plain"
                @click="dialog = false"
              />

              <v-btn
                color="primary"
                :loading="taskStore.isLoading"
                text="Save"
                type="submit"
                variant="tonal"
              />
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
  </div>
</template>
