// Utilities
import { defineStore } from "pinia";
import type { Post } from "../types/post.ts";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const posts = ref<Post[]>([]);
  const likedPostsIds = ref(new Set<number>());
  const unlikedPostsIds = ref(new Set<number>());

  const likePost = (id: number) => {
    likedPostsIds.value.add(id);
  };

  const unlikePost = (id: number) => {
    likedPostsIds.value.delete(id);
  };

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts.value = await response.json();

    return posts;
  };

  return {
    posts,
    likedPostsIds,
    unlikedPostsIds,
    likePost,
    unlikePost,
    fetchPosts,
  };
});
