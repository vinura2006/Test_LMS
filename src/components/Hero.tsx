import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Hero: React.FC = () => {
  const { courses } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "2025 New Courses",
      subtitle: "Discover our latest educational offerings",
      bg: "from-indigo-500 to-purple-600"
    },
    {
      title: "Learn English",
      subtitle: "Master English with expert guidance",
      bg: "from-red-500 to-orange-500"
    },
    {
      title: "Learn Tamil",
      subtitle: "Explore the beauty of Tamil language",
      bg: "from-green-500 to-teal-500"
    },
    {
      title: "Award Winning",
      subtitle: "Recognized excellence in education",
      bg: "from-yellow-500 to-orange-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const englishCourses = courses.filter(course => course.category === 'english');
  const tamilCourses = courses.filter(course => course.category === 'tamil');

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="text-center py-8 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-8 shadow-2xl border-2 border-blue-500">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎓 MAPA Gurugedara Learning Management System
          </h1>
          <p className="text-xl md:text-2xl text-white/90">Premium Education with Modern Technology</p>
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white font-semibold text-lg">🚀 Ready to explore? Try our demo accounts!</p>
            <p className="text-white/90 text-sm mt-2">Click Login and use the demo account buttons to test different user roles</p>
          </div>
        </div>
      </div>

      {/* Slideshow */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-64 md:h-80">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-gradient-to-r ${slide.bg} flex items-center justify-center transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg md:text-xl">{slide.subtitle}</p>
                </div>
              </div>
            ))}
            
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center space-x-2 py-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <BookOpen className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">{courses.length}</h3>
            <p className="text-gray-600">Total Courses</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">1000+</h3>
            <p className="text-gray-600">Active Students</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">50+</h3>
            <p className="text-gray-600">Expert Teachers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">24/7</h3>
            <p className="text-gray-600">Learning Access</p>
          </div>
        </div>
      </div>

      {/* English Courses */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 shadow-xl border-2 border-blue-500">
            <h2 className="text-3xl md:text-4xl font-bold text-white">🎯 English Language Courses</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishCourses.map((course) => (
              <div key={course.id} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-indigo-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>📚 {course.level}</span>
                  <span>⏱️ {course.duration}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>👥 {course.studentIds.length} students</span>
                  <span>📖 {course.lessons.length} lessons</span>
                </div>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tamil Courses */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 shadow-xl border-2 border-blue-500">
            <h2 className="text-3xl md:text-4xl font-bold text-white">🎯 Tamil Language Courses</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tamilCourses.map((course) => (
              <div key={course.id} className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-200">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-red-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>📚 {course.level}</span>
                  <span>⏱️ {course.duration}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>👥 {course.studentIds.length} students</span>
                  <span>📖 {course.lessons.length} lessons</span>
                </div>
                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 shadow-xl border-2 border-blue-500">
            <h2 className="text-3xl md:text-4xl font-bold text-white">✨ Why Choose MAPA Gurugedara?</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Expert Teachers", desc: "Learn from qualified and experienced instructors" },
              { icon: "📱", title: "Modern Technology", desc: "Access courses anytime, anywhere with our LMS" },
              { icon: "🏆", title: "Proven Results", desc: "Award-winning courses with thousands of successful students" },
              { icon: "💬", title: "Interactive Learning", desc: "Engage with multimedia content and live sessions" },
              { icon: "📋", title: "Progress Tracking", desc: "Monitor your learning journey with detailed reports" },
              { icon: "🎓", title: "Certificates", desc: "Earn recognized certificates upon completion" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border-2 border-purple-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Account Info */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🎮 Try Our Demo!</h2>
          <p className="text-xl text-white/90 mb-6">Experience the full LMS with different user roles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">👨‍🎓</div>
              <div className="font-semibold text-white">Student</div>
              <div className="text-white/80">Track progress & achievements</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">👩‍🏫</div>
              <div className="font-semibold text-white">Teacher</div>
              <div className="text-white/80">Manage students & unlock lessons</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-white">Course Admin</div>
              <div className="text-white/80">Create & manage courses</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-semibold text-white">Site Admin</div>
              <div className="text-white/80">Full system control</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-8 shadow-xl border-2 border-blue-500 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">📞 Get in Touch</h2>
          <p className="text-xl text-white/90 mb-2">Ready to start your learning journey?</p>
          <p className="text-2xl font-bold text-white">Call us: 071 8 111 600</p>
        </div>
      </div>
    </div>
  );
};