import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { API_URl } from "../config";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import api from "../api/axiosInstance";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const userName=email;
    try {
      const response = await api.post('/admin/login',{userName,password});
      console.log(userName);
      
      localStorage.setItem("admin_id", response.data.data.admin._id);
      localStorage.setItem("token",response.data.data.token);
      console.log(response);
      
      if (response.data.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
          style: {
            background: "black",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
          },
        });
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message ||
          "Network error. Please try again later."
      );
    }
  };

  const showErrorAlert = (message) => {
    alert(message);
  };

  const showSuccessAlert = (message) => {
    toast.success(message);
  };

  return (
    <>
      <ToastContainer
        position="top-center" // Adjust the duration if needed
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="bg-white shadow-md rounded border-2 border-blue-500 px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
              LogIn
            </span>
          </h2>
          <Form onSubmit={onSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <i className="fas fa-envelope mr-2"></i>Email
              </label>
              <div>
                <input
                  id="email"
                  type="email"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <i className="fas fa-lock mr-2"></i>Password
              </label>
              <div>
                <input
                  id="password"
                  type="password"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                LogIn
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
