<template>
  <v-card>
    <v-card-title>{{ value.title }}</v-card-title>
    <v-card-text>{{ value.body }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Post } from "../types/post";

defineProps<{ value: Post }>();
</script>
