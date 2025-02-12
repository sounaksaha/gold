import api from "./axiosInstance";

// Fetch Dashboard Data
// export const getDashboardData = async () => {
//   try {
//     const response = await api.get("/dashboard");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     throw error;
//   }
// };

// // Create a New Post
// export const createPost = async (postData) => {
//   try {
//     const response = await api.post("/posts", postData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// };

// // Update a Post
// export const updatePost = async (postId, updatedData) => {
//   try {
//     const response = await api.put(`/posts/${postId}`, updatedData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating post:", error);
//     throw error;
//   }
// };

// // Delete a Post
// export const deletePost = async (postId) => {
//   try {
//     const response = await api.delete(`/posts/${postId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     throw error;
//   }
// };
