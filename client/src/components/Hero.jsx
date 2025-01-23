import React from "react";

export const Hero = () => {
  return (
    <div className="font-sans">
      {/* Navigation Bar */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 text-white p-6 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Fana Digital Library
          </h1>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-white/90 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-white/90 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-white/90 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex space-x-4">
            <a
              href="/login"
              className="px-6 py-2 text-sm font-medium text-white/90 hover:text-white border border-white/20 rounded-full transition-all duration-300 hover:border-white/40"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-6 py-2 text-sm font-medium bg-white text-blue-900 rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-20"></div>
        </div>

        <div className="relative flex flex-col justify-center items-center min-h-screen text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
            Unlock the Power of
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Digital Knowledge
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl">
            Experience a new era of learning with our comprehensive digital
            library platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="/register"
              className="px-8 py-4 bg-white text-blue-900 rounded-full text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-8 py-4 border border-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-blue-900 to-indigo-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Why Choose Fana Library?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Extensive Resources",
                description:
                  "Access a vast collection of curated educational materials.",
                icon: "📚",
              },
              {
                title: "Smart Learning",
                description:
                  "Personalized learning paths tailored to your needs.",
                icon: "🎯",
              },
              {
                title: "Global Community",
                description: "Connect with learners and experts worldwide.",
                icon: "🌍",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-indigo-900 to-purple-900"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            About Us
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
            Fana Digital Library represents the future of education, combining
            cutting-edge technology with comprehensive learning resources. Our
            mission is to make quality education accessible to everyone,
            everywhere.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-b from-purple-900 to-blue-900"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Get in Touch
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Ready to start your learning journey? Contact us for any questions
            or support.
          </p>
          <a
            href="mailto:info@fanalibrary.com"
            className="inline-block px-8 py-4 bg-white text-blue-900 rounded-full text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 mb-6 md:mb-0">
            © 2024 Fana Digital Library. All rights reserved.
          </p>
          <nav className="flex space-x-8">
            <a
              href="#features"
              className="text-blue-200 hover:text-white transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-blue-200 hover:text-white transition-colors duration-300"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-blue-200 hover:text-white transition-colors duration-300"
            >
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
