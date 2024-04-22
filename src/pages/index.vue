<template>
  <v-container class="page">
    <div class="posts-wrapper d-flex flex-column align-stretch">
      <div class="posts flex-grow-1 mb-8">
        <post-card
          :key="index"
          v-for="(post, index) in slicePosts"
          :value="post"
          class="mb-8 rounded-lg"
        />
      </div>

      <v-spacer />

      <div class="text-center flex-grow-1">
        <v-pagination
          v-model="page"
          :length="pagesCount"
          rounded="circle"
          :disabled="loading"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/app";
import { useRoute, useRouter } from "vue-router";

const postsPerPage = 5;

const { fetchPosts } = useAppStore();
const { posts } = storeToRefs(useAppStore());

const loading = ref(false);
const pagesCount = ref(0);

onMounted(async () => {
  loading.value = true;
  await fetchPosts();

  pagesCount.value = Math.floor(posts.value.length / postsPerPage);

  loading.value = false;
});

const slicePosts = computed(() => {
  const from = (page.value ? Number(page.value) - 1 : 0) * postsPerPage;
  const to = from + postsPerPage;
  return posts.value.slice(from, to);
});

const route = useRoute();
const router = useRouter();

const page = computed({
  get() {
    return Number(route.query.page || 0);
  },
  set(newPage) {
    router.push({
      path: "/",
      query: {
        page: newPage,
      },
    });
  },
});
</script>

<style scoped>
.posts-wrapper {
  min-height: 100vh;
}
</style>
