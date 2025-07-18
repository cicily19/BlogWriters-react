import { useQuery } from '@tanstack/react-query';
import {
  fetchPosts,
  fetchPost,
  fetchPostComments,
  fetchUsers,
  fetchUser,
  fetchUserPosts
} from '../services/api';

// Posts hooks
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePost = (id) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePostComments = (postId) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchPostComments(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};

// Users hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};