import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrEmail("");
    setErrPassword("");

    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`, {
        email,
        password,
      })
      .then((result) => {
        if (result.data.success) {
          localStorage.setItem("token", result.data.token); // Save Token
          navigate("/home");
        } else {
          switch (result.data.error) {
            case "No record found for this email":
              setErrEmail("No account found for this email.");
              break;
            case "Incorrect password":
              setErrPassword("Incorrect password. Please try again.");
              break;
            case "Email not verified. Please check your inbox.":
              setErrEmail(
                "Email not verified. Please check your inbox for the verification email."
              );
              break;
            default:
              setErrEmail("An unexpected error occurred. Please try again.");
          }
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setErrEmail("An error occurred. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md">
        {/* Decorative Elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>

        {/* Main Container */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-200">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200"
                  placeholder="your.email@aau.edu.et"
                />
                {errEmail && (
                  <p className="absolute -bottom-6 left-0 text-red-300 text-sm">
                    {errEmail}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200"
                  placeholder="Enter your password"
                />
                {errPassword && (
                  <p className="absolute -bottom-6 left-0 text-red-300 text-sm">
                    {errPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
              >
                Forgot your password?
              </a>
            </div>

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
                transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-blue-200">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Create one
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
