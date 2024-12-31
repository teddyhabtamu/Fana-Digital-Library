import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors before making a new request
    setErrEmail("");
    setErrPassword("");

    axios
      .post("http://127.0.0.1:3001/login", { email, password })
      .then((result) => {
        if (result.data.success) {
          // If login is successful, navigate to the home page
          navigate("/home");
        } else {
          // Handle different error cases based on the backend response
          if (result.data.error === "No record found for this email") {
            setErrEmail("No account found for this email.");
          } else if (result.data.error === "Incorrect password") {
            setErrPassword("Incorrect password. Please try again.");
          } else if (
            result.data.error === "Email not verified. Please check your inbox."
          ) {
            setErrEmail(
              "Email not verified. Please check your inbox for the verification email."
            );
          } else {
            // For unexpected errors
            setErrEmail("An unexpected error occurred. Please try again.");
          }
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setErrEmail("An error occurred. Please try again later.");
      });
  };

  return (
    <div
      id="login"
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      {/* Form Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md font-poppins">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-red-600 text-sm">{errEmail}</p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-600 text-sm">{errPassword}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};
