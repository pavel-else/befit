<template>
  <v-card>
    <v-card-title>{{ value.title }}</v-card-title>
    <v-card-subtitle>{{ value.id }}</v-card-subtitle>
    <v-card-text>{{ value.body }}</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="value.rating > 0"
        density="compact"
        color="deep-purple-accent-4"
        icon="mdi-thumb-up"
        @click="unlikePost(value.id)"
      ></v-btn>
      <v-btn
        v-else
        density="compact"
        icon="mdi-thumb-up-outline"
        @click="likePost(value.id)"
      ></v-btn>

      <v-btn
        v-if="value.rating < 0"
        density="compact"
        color="deep-purple-accent-4"
        icon="mdi-thumb-down"
        @click="unlikePost(value.id)"
      ></v-btn>
      <v-btn
        density="compact"
        icon="mdi-thumb-down-outline"
        v-else
        @click="dislikePost(value.id)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Post } from "../types/post";
import { useAppStore } from "../stores/app";

const { likePost, dislikePost, unlikePost } = useAppStore();

defineProps<{ value: Post }>();
</script>
