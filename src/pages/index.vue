<template>
  <v-container class="page">
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
      class="mb-8"
    >
      <v-tab :value="1">Все публикации</v-tab>
      <v-tab :value="2" :disabled="!likedPosts.length">Выбранные</v-tab>
      <v-tab :value="3" :disabled="!unlikedPosts.length">Скрытые</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item :value="1">
        <div class="posts-wrapper mb-8">
          <div class="posts">
            <post-card
              :key="index"
              v-for="(post, index) in slicePosts"
              :value="post"
              class="mb-8 rounded-lg"
            />
          </div>

          <v-spacer />

          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="pagesCount"
              rounded="circle"
              :disabled="loading"
            ></v-pagination>
          </div>
        </div>
      </v-window-item>
      <v-window-item :value="2">
        <div class="posts">
          <post-card
            :key="index"
            v-for="(post, index) in likedPosts"
            :value="post"
            class="mb-8 rounded-lg"
          />
        </div>
      </v-window-item>
      <v-window-item :value="3">
        <div class="posts">
          <post-card
            :key="index"
            v-for="(post, index) in unlikedPosts"
            :value="post"
            class="mb-8 rounded-lg"
          />
        </div>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/app";
import { useRoute, useRouter } from "vue-router";

const postsPerPage = 5;

const { fetchPosts } = useAppStore();
const { posts, likedPosts, unlikedPosts } = storeToRefs(useAppStore());

const loading = ref(false);
const pagesCount = ref(0);

onMounted(async () => {
  loading.value = true;
  await fetchPosts();

  pagesCount.value = Math.floor(posts.value.length / postsPerPage);

  loading.value = false;
});

const slicePosts = computed(() => {
  const clearPosts = posts.value.filter((post) => !post.isLiked);

  const from = (page.value ? Number(page.value) - 1 : 0) * postsPerPage;
  const to = from + postsPerPage;
  return clearPosts.slice(from, to);
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

const tab = ref(1);
</script>

<style scoped></style>
