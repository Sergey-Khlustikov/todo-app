<script setup lang="ts">
import Priority from "@/models/priority.enum.js";
import {useTaskStore} from "@/stores/task.store.js";
import type {AddTaskDto} from "@/api/dto/add-task.dto.js";
import {useRules} from "vuetify/lib/labs/rules/index.js";

const taskStore = useTaskStore();
const rules = useRules();

const dialog = shallowRef(false)

const task = ref<AddTaskDto>({
  title: '',
  description: '',
  priority: Priority.LOW,
  dueDate: null,
});

const addNewTask = async () => {
  await taskStore.addTask(task.value);

  if (!taskStore.error) {
    dialog.value = false;
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
          ></v-btn>
        </template>

        <v-form @submit.prevent="addNewTask" validate-on="submit">
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
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="task.description"
                    label="Description"
                    :rules="[rules.required(), rules.minLength(2), rules.maxLength(255)]"
                    validate-on="blur"
                    variant="outlined"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="12">
                  <p>Priority:</p>
                  <v-radio-group v-model="task.priority" inline>
                    <v-radio :value="Priority.LOW">
                      <template #label>
                        Low
                        <v-icon icon="mdi-arrow-down-thin-circle-outline" color="green"></v-icon>
                      </template>
                    </v-radio>
                    <v-radio :value="Priority.MEDIUM">
                      <template #label>
                        Medium
                        <v-icon icon="mdi-dots-horizontal-circle-outline" color="primary"></v-icon>
                      </template>
                    </v-radio>
                    <v-radio :value="Priority.HIGH">
                      <template #label>
                        High
                        <v-icon icon="mdi-arrow-up-thin-circle-outline" color="red"></v-icon>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-date-input
                    label="Due date"
                    prepend-icon=""
                    variant="outlined"
                    persistent-placeholder
                  ></v-date-input>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text="Close"
                variant="plain"
                @click="dialog = false"
                :disabled="taskStore.isLoading"
              ></v-btn>

              <v-btn
                color="primary"
                text="Save"
                variant="tonal"
                type="submit"
                :loading="taskStore.isLoading"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
  </div>
</template>
