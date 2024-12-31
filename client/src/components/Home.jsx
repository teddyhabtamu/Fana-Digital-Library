import React from "react";

export const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white h-screen flex flex-col items-center justify-center font-poppins text-center px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Welcome to Fana Digital Library
      </h1>
      <p className="text-lg md:text-2xl mb-6">
        Access thousands of books, research papers, and educational resources
        from anywhere.
      </p>
      <div>
        {/* <a
          href="/login"
          className="bg-yellow-400 text-blue-900 py-3 px-6 rounded-full font-medium hover:bg-yellow-500 transition duration-300"
        >
          Explore Now
        </a> */}
      </div>
    </div>
  );
};
