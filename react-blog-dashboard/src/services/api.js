const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Generic fetch function with error handling
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// Posts API functions
export const fetchPosts = async () => {
  return fetchData(`${BASE_URL}/posts`);
};

export const fetchPost = async (id) => {
  return fetchData(`${BASE_URL}/posts/${id}`);
};

export const fetchPostComments = async (id) => {
  return fetchData(`${BASE_URL}/posts/${id}/comments`);
};

// Users API functions
export const fetchUsers = async () => {
  return fetchData(`${BASE_URL}/users`);
};

export const fetchUser = async (id) => {
  return fetchData(`${BASE_URL}/users/${id}`);
};

export const fetchUserPosts = async (userId) => {
  return fetchData(`${BASE_URL}/users/${userId}/posts`);
};

// Albums API functions (bonus)
export const fetchAlbums = async () => {
  return fetchData(`${BASE_URL}/albums`);
};

export const fetchUserAlbums = async (userId) => {
  return fetchData(`${BASE_URL}/users/${userId}/albums`);
};