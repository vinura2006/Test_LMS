import React, { useState } from 'react';
import { Users, BookOpen, CheckCircle, Clock, Unlock, User, TrendingUp } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useData } from '../../context/DataContext';

export const TeacherDashboard: React.FC = () => {
  const { user } = useUser();
  const { getTeacherCourses, courses, unlockLesson } = useData();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'students' | 'courses'>('overview');

  const teacherCourses = getTeacherCourses(user!.id);
  
  // Get all users to find students
  const allUsers = JSON.parse(localStorage.getItem('mapaUsers') || '[]');
  const allStudents = allUsers.filter((u: any) => u.role === 'student');
  
  // Get students enrolled in teacher's courses
  const myStudents = allStudents.filter((student: any) => 
    teacherCourses.some(course => course.studentIds.includes(student.id))
  );

  const handleUnlockLesson = (courseId: string, lessonId: string, studentId: string) => {
    unlockLesson(courseId, lessonId, studentId);
  };

  const getStudentProgress = (studentId: string, courseId: string) => {
    const progress = JSON.parse(localStorage.getItem('mapaProgress') || '[]');
    return progress.filter((p: any) => p.studentId === studentId && p.courseId === courseId);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <BookOpen className="w-8 h-8 mb-3" />
          <div className="text-2xl font-bold">{teacherCourses.length}</div>
          <div className="text-blue-100">My Courses</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <Users className="w-8 h-8 mb-3" />
          <div className="text-2xl font-bold">{myStudents.length}</div>
          <div className="text-green-100">My Students</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <CheckCircle className="w-8 h-8 mb-3" />
          <div className="text-2xl font-bold">
            {teacherCourses.reduce((total, course) => total + course.lessons.length, 0)}
          </div>
          <div className="text-purple-100">Total Lessons</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6">
          <TrendingUp className="w-8 h-8 mb-3" />
          <div className="text-2xl font-bold">85%</div>
          <div className="text-orange-100">Avg. Progress</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Course Overview</h3>
        <div className="space-y-4">
          {teacherCourses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{course.title}</h4>
                <span className="text-sm text-gray-500">{course.studentIds.length} students</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="ml-2 font-medium">{course.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">Level:</span>
                  <span className="ml-2 font-medium">{course.level}</span>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <span className="ml-2 font-medium">{course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      {myStudents.map((student) => {
        const studentCourses = teacherCourses.filter(course => 
          course.studentIds.includes(student.id)
        );
        
        return (
          <div key={student.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {student.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                  <p className="text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-500">Grade: {student.grade}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Enrolled in</div>
                <div className="text-lg font-bold text-indigo-600">{studentCourses.length} courses</div>
              </div>
            </div>

            <div className="space-y-4">
              {studentCourses.map((course) => {
                const progress = getStudentProgress(student.id, course.id);
                const completedLessons = progress.filter((p: any) => p.completed).length;
                const progressPercentage = Math.round((completedLessons / course.lessons.length) * 100);
                
                return (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{course.title}</h4>
                      <span className="text-sm font-medium text-indigo-600">{progressPercentage}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>

                    <div className="space-y-2">
                      {course.lessons.map((lesson) => {
                        const lessonProgress = progress.find((p: any) => p.lessonId === lesson.id);
                        const isCompleted = lessonProgress?.completed || false;
                        
                        return (
                          <div key={lesson.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              ) : (
                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                              )}
                              <span className="text-sm font-medium">{lesson.title}</span>
                            </div>
                            {lesson.isLocked && !isCompleted && (
                              <button
                                onClick={() => handleUnlockLesson(course.id, lesson.id, student.id)}
                                className="flex items-center text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition-colors"
                              >
                                <Unlock className="w-3 h-3 mr-1" />
                                Unlock
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {myStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Students Yet</h3>
          <p className="text-gray-500">Students will appear here once they're enrolled in your courses.</p>
        </div>
      )}
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teacherCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={course.imageUrl} 
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div>📚 {course.lessons.length} lessons</div>
                <div>👥 {course.studentIds.length} students</div>
                <div>📊 {course.level}</div>
                <div>⏱️ {course.duration}</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Lessons:</h4>
                {course.lessons.map((lesson, index) => (
                  <div key={lesson.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{index + 1}. {lesson.title}</span>
                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {teacherCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Courses Assigned</h3>
          <p className="text-gray-500">Contact your course admin to get assigned to courses.</p>
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
              <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard 👩‍🏫</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Subject Specialization</div>
              <div className="text-lg font-semibold text-indigo-600">{user?.subject}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'overview'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setSelectedTab('students')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'students'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              👥 My Students
            </button>
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
          </div>

          <div className="p-8">
            {selectedTab === 'overview' && renderOverview()}
            {selectedTab === 'students' && renderStudents()}
            {selectedTab === 'courses' && renderCourses()}
          </div>
        </div>
      </div>
    </div>
  );
};