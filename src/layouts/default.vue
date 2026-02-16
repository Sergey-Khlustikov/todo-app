<script lang="ts" setup>
import {ref} from 'vue'

const drawer = ref(true)
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Todo App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <todo-categories-list></todo-categories-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>
