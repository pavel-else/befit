<template>
  <v-container>
    <div class="posts">
      <post-card
        :key="index"
        v-for="(post, index) in slicePosts"
        :value="post"
        class="mb-8 rounded-lg"
      />
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/app";

const { fetchPosts } = useAppStore();
const { posts } = storeToRefs(useAppStore());

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await fetchPosts();

  loading.value = false;
});

const slicePosts = computed(() => {
  return posts.value.slice(0, 4);
});
</script>
