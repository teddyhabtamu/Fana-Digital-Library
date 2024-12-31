import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Success or info message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@aau.edu.et")) {
      setError("Email must end with '@aau.edu.et'");
      return;
    }

    setError("");
    setMessage("");

    try {
      // Step 1: Check if email is already registered
      const emailCheckResponse = await axios.post(
        "http://127.0.0.1:3001/check-email",
        { email }
      );

      if (emailCheckResponse.data.exists) {
        setError("Email is already registered. Please use a different email.");
        return;
      }

      // Step 2: Proceed with registration
      const response = await axios.post("http://127.0.0.1:3001/register", {
        name,
        email,
        password,
      });
      console.log(response.data);

      if (response.data.success) {
        // Send email verification
        const verificationResponse = await axios.post(
          "http://127.0.0.1:3001/send-verification",
          { email }
        );
        if (verificationResponse.data.success) {
          setMessage(
            "Registration successful! A verification email has been sent. Please check your inbox."
          );
        } else {
          setMessage(
            "Registration successful! However, there was an issue sending the verification email."
          );
        }
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div
      id="signup"
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      {/* Form Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md font-poppins">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Register
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              onChange={(e) => setname(e.target.value)}
            />
          </div>

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
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </a>
        </p>
        {message && (
          <p className="text-green-500 text-center mt-4 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
