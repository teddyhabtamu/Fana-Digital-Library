import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  // State declarations
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };


  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/books`
        );
        if (response.data.success) {
          setBooks(response.data.books);
          setFilteredBooks(response.data.books);
        } else {
          setError("Failed to load books");
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Filter books
  useEffect(() => {
    const filtered = books.filter((book) => {
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment =
        departmentFilter === "" || book.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
    setFilteredBooks(filtered);
  }, [searchQuery, departmentFilter, books]);

  // Event handlers
  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleDepartmentChange = (e) => setDepartmentFilter(e.target.value);
  const handleBookClick = (book) => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-bold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-indigo-900/50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/path/to/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 tracking-tight">
            Digital Library
          </h1>
          <p className="text-2xl text-blue-200/80 font-light">
            Explore the universe of engineering knowledge
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
          <div className="relative flex flex-col md:flex-row items-center gap-6 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-6 h-6 text-blue-300/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <select
              value={departmentFilter}
              onChange={handleDepartmentChange}
              className="w-full md:w-auto px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
            >
              <option className="bg-purple-900 " value="">
                All Departments
              </option>
              <option className="bg-purple-900" value="Electrical">
                Electrical
              </option>
              <option className="bg-purple-900" value="Biomedical">
                Biomedical
              </option>
              <option className="bg-purple-900" value="Chemical">
                Chemical
              </option>
              <option className="bg-purple-900" value="Mechanical">
                Mechanical
              </option>
              <option className="bg-purple-900" value="Civil">
                Civil
              </option>
              <option className="bg-purple-900" value="Software">
                Software
              </option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 "></div>
              <div className="relative p-6 space-y-4">
                {book.thumbnail && (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      onClick={() => handleBookClick(book)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                )}

                <div className="space-y-3">
                  <h2
                    className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                    onClick={() => handleBookClick(book)}
                  >
                    {book.title}
                  </h2>
                  <p className="text-blue-200/80">{book.author}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {book.department}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-2.5 px-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read
                  </a>
                  {book.downloadLink && (
                    <a
                      href={book.downloadLink}
                      download
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white font-medium py-2.5 px-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50">
            <div className="relative w-full max-w-5xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/20">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-white">
                    {selectedBook.title}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <img
                    src={selectedBook.thumbnail}
                    alt={selectedBook.title}
                    className="w-full rounded-xl shadow-lg"
                  />
                  <div className="space-y-4">
                    <p className="text-xl text-white/90">
                      Author: {selectedBook.author}
                    </p>
                    <p className="text-white/70">
                      Department: {selectedBook.department}
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      {selectedBook.description}
                    </p>

                    <div className="flex gap-4 pt-6">
                      <a
                        href={selectedBook.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 px-6 rounded-lg text-center font-semibold transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
                      >
                        Read Online
                      </a>
                      {selectedBook.downloadLink && (
                        <a
                          href={selectedBook.downloadLink}
                          download
                          className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 py-3 px-6 rounded-lg text-center font-semibold transition-all duration-300 border border-emerald-500/30 hover:border-emerald-500/50"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
