// Utilities
import { defineStore } from "pinia";
import type { Post } from "../types/post.ts";
import { ref, computed } from "vue";

export const useAppStore = defineStore("app", () => {
  const posts = ref<Post[]>([]);
  const likedPostsIds = ref(new Set<number>());
  const unlikedPostsIds = ref(new Set<number>());

  const postsById = computed(() => {
    return posts.value.reduce((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {} as Record<number, Post>);
  });

  const likePost = (id: number) => {
    likedPostsIds.value.add(id);
    const post = postsById.value[id];
    post.isLiked = true;
    console.log(likedPostsIds.value);
  };

  const unlikePost = (id: number) => {
    likedPostsIds.value.delete(id);
    const post = postsById.value[id];
    post.isUnliked = true;
    console.log(unlikedPostsIds.value);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const json = await response.json();

      posts.value = json.map((post) => ({
        ...post,
        isLiked: false,
        isUnliked: false,
      }));
    } catch (error) {
      console.error(error);
    }

    return posts;
  };

  const likedPosts = computed(() => {
    return posts.value.filter((post) => likedPostsIds.value.has(post.id));
  });

  const unlikedPosts = computed(() => {
    return posts.value.filter((post) => unlikedPostsIds.value.has(post.id));
  });

  return {
    posts,
    postsById,
    likedPostsIds,
    unlikedPostsIds,
    likedPosts,
    unlikedPosts,
    likePost,
    unlikePost,
    fetchPosts,
  };
});
