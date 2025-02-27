import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setError("");
    setMessage("");

    try {
      const emailCheckResponse = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/check-email`,
        { email }
      );

      if (emailCheckResponse.data.exists) {
        setError("Email is already registered. Please use a different email.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/register`,
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        const verificationResponse = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/send-verification`,
          { email }
        );

        setMessage(
          verificationResponse.data.success
            ? "Registration successful! Please check your email for verification."
            : "Registration successful! Verification email will be sent shortly."
        );

        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-2xl transform -rotate-3"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-2xl transform rotate-3"></div>

        {/* Main Form Container */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/20">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-blue-200">Join our community of learners</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">
                Full Name
              </label>
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">
                Email Address
              </label>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200"
                placeholder="your.email"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">
                Password
              </label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200"
                placeholder="Create a strong password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-300 text-sm bg-red-500/10 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="text-green-300 text-sm bg-green-500/10 px-4 py-2 rounded-lg">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium 
                ${
                  isLoading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:from-blue-600 hover:to-purple-600"
                } 
                transform transition-all duration-300 hover:scale-[1.02]`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center text-blue-200">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
