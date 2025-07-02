import React, { useState } from 'react';
import { BookOpen, Trophy, Clock, Play, Lock, CheckCircle, Star, Download } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { user } = useUser();
  const { getStudentCourses, getCourseProgress, achievements, enrollStudent } = useData();
  const [selectedTab, setSelectedTab] = useState<'courses' | 'progress' | 'achievements'>('courses');
  const navigate = useNavigate();

  const enrolledCourses = getStudentCourses(user!.id);
  const studentAchievements = achievements.filter(a => a.studentId === user!.id);

  const handleEnrollInCourse = (courseId: string) => {
    enrollStudent(user!.id, courseId);
  };

  const calculateCourseProgress = (courseId: string) => {
    const progress = getCourseProgress(user!.id, courseId);
    const course = enrolledCourses.find(c => c.id === courseId);
    if (!course) return 0;
    
    const completedLessons = progress.filter(p => p.completed).length;
    return Math.round((completedLessons / course.lessons.length) * 100);
  };

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => {
          const progress = calculateCourseProgress(course.id);
          const courseProgress = getCourseProgress(user!.id, course.id);
          const completedLessons = courseProgress.filter(p => p.completed).length;
          
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <img 
                src={course.imageUrl} 
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>📚 {completedLessons}/{course.lessons.length} lessons</span>
                  <span>⏱️ {course.duration}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Continue
                  </button>
                  {course.pdfUrl && (
                    <a
                      href={course.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {enrolledCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Courses Enrolled</h3>
          <p className="text-gray-500">Contact your teacher or admin to get enrolled in courses.</p>
        </div>
      )}
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      {enrolledCourses.map((course) => {
        const courseProgress = getCourseProgress(user!.id, course.id);
        const overallProgress = calculateCourseProgress(course.id);
        
        return (
          <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
              <span className="text-2xl font-bold text-indigo-600">{overallProgress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>

            <div className="space-y-3">
              {course.lessons.map((lesson) => {
                const lessonProgress = courseProgress.find(p => p.lessonId === lesson.id);
                const isCompleted = lessonProgress?.completed || false;
                const timeSpent = lessonProgress?.timeSpent || 0;
                
                return (
                  <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      ) : lesson.isLocked ? (
                        <Lock className="w-5 h-5 text-gray-400 mr-3" />
                      ) : (
                        <Play className="w-5 h-5 text-indigo-500 mr-3" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {isCompleted && (
                        <div className="text-sm text-green-600 font-medium">
                          ✅ Completed
                        </div>
                      )}
                      {timeSpent > 0 && (
                        <div className="text-xs text-gray-500">
                          {Math.round(timeSpent / 60)} min spent
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentAchievements.map((achievement) => (
          <div key={achievement.id} className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">{achievement.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{achievement.title}</h3>
            <p className="text-gray-600 mb-4">{achievement.description}</p>
            <div className="text-sm text-gray-500">
              Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {studentAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Achievements Yet</h3>
          <p className="text-gray-500">Complete lessons and courses to earn achievements!</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}! 👨‍🎓</h1>
              <p className="text-gray-600 mt-2">Continue your learning journey</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{enrolledCourses.length}</div>
              <div className="text-sm text-gray-600">Enrolled Courses</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <BookOpen className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">{enrolledCourses.length}</div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">
              {enrolledCourses.reduce((total, course) => {
                const progress = getCourseProgress(user!.id, course.id);
                return total + progress.filter(p => p.completed).length;
              }, 0)}
            </div>
            <div className="text-sm text-gray-600">Completed Lessons</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">{studentAchievements.length}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Clock className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(enrolledCourses.reduce((total, course) => {
                const progress = getCourseProgress(user!.id, course.id);
                return total + progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
              }, 0) / 3600)}h
            </div>
            <div className="text-sm text-gray-600">Study Time</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setSelectedTab('courses')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'courses'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📚 My Courses
            </button>
            <button
              onClick={() => setSelectedTab('progress')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'progress'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📊 Progress
            </button>
            <button
              onClick={() => setSelectedTab('achievements')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'achievements'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              🏆 Achievements
            </button>
          </div>

          <div className="p-8">
            {selectedTab === 'courses' && renderCourses()}
            {selectedTab === 'progress' && renderProgress()}
            {selectedTab === 'achievements' && renderAchievements()}
          </div>
        </div>
      </div>
    </div>
  );
};