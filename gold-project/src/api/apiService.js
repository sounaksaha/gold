import api from "./axiosInstance";

export const createPrice = async (price) => {
  try {
    const response = await api.post("/price/create", price);
    console.log("hey", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error Creating Price:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || { message: "Something went wrong" }; // Re-throw error properly
  }
};

export const singlePrice = async (type) => {
  try {
    const response = await api.get(`/price/get?type=${type}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(
      "Error getting Price:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const getAllPrice = async (type, page, pageSize,date) => {
  try {
    const response = await api.get(
      `/price/get-all?type=${type}&page=${page}&pageSize=${pageSize}&date=${date}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error getting Price:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || { message: "Something went wrong" };
  }
};

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
