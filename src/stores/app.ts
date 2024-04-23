// Utilities
import { defineStore } from "pinia";
import type { Post } from "../types/post.ts";
import { ref, computed } from "vue";

export const useAppStore = defineStore("app", () => {
  const posts = ref<Post[]>([]);

  const postsById = computed(() => {
    return posts.value.reduce((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {} as Record<number, Post>);
  });

  const likePost = (id: number) => {
    const post = postsById.value[id];
    post.rating = 1;
  };

  const dislikePost = (id: number) => {
    const post = postsById.value[id];
    post.rating = -1;
  };

  const unlikePost = (id: number) => {
    const post = postsById.value[id];
    post.rating = 0;
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const json = await response.json();

      posts.value = json.map((post) => ({
        ...post,
        rating: 0,
      }));
    } catch (error) {
      console.error(error);
    }

    return posts;
  };

  const likedPosts = computed(() => {
    return posts.value.filter((post) => post.rating > 0);
  });

  const unlikedPosts = computed(() => {
    return posts.value.filter((post) => post.rating < 0);
  });

  return {
    posts,
    postsById,
    likedPosts,
    unlikedPosts,
    likePost,
    dislikePost,
    unlikePost,
    fetchPosts,
  };
});
