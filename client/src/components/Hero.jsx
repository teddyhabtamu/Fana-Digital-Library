import React from "react";

export const Hero = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 shadow-md fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fana Digital Library</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-gray-200">
              Features
            </a>
            <a href="#about" className="hover:text-gray-200">
              About Us
            </a>
            <a href="#contact" className="hover:text-gray-200">
              Contact
            </a>
          </nav>
          <div className="hidden md:block">
            <a
              href="/login"
              className="bg-white text-blue-500 px-4 py-2 rounded mr-2 hover:bg-gray-100"
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              Sign Up
            </a>
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 h-screen flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlock the Power of Knowledge
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover, Learn, and Grow with the Fana Digital Library.
        </p>
        <a
          href="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 shadow-lg text-lg"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose Fana Library?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Extensive Resources
              </h3>
              <p className="text-gray-600">
                Access a wide collection of books, research papers, and digital
                archives in one place.
              </p>
            </div>
            <div className="p-8 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">User-Friendly</h3>
              <p className="text-gray-600">
                Experience a seamless and intuitive interface for efficient
                learning.
              </p>
            </div>
            <div className="p-8 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Join a network of learners and contribute to collective
                knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Fana Digital Library aims to bridge the gap in education by
            providing free and accessible resources for students, researchers,
            and educators. Our platform is built to inspire learning and foster
            a global knowledge-sharing community.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Do you have questions or feedback? Connect with us, and we’ll assist
            you promptly.
          </p>
          <a
            href="mailto:info@fanalibrary.com"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 text-lg shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center pl-10 pr-10">
          <p className="text-sm md:text-base">
            &copy; 2024 Fana Digital Library. All rights reserved.
          </p>
          <nav className="space-x-6">
            <a href="#features" className="hover:text-gray-200">
              Features
            </a>
            <a href="#about" className="hover:text-gray-200">
              About Us
            </a>
            <a href="#contact" className="hover:text-gray-200">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
