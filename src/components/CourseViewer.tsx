import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Lock, CheckCircle, Download, Clock, BookOpen } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useData } from '../context/DataContext';

export const CourseViewer: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { courses, getCourseProgress, updateProgress, addAchievement } = useData();
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState(0);

  const course = courses.find(c => c.id === courseId);
  const progress = getCourseProgress(user!.id, courseId!);

  useEffect(() => {
    if (course && course.lessons.length > 0 && !selectedLesson) {
      // Select first unlocked lesson
      const firstUnlocked = course.lessons.find(lesson => !lesson.isLocked);
      if (firstUnlocked) {
        setSelectedLesson(firstUnlocked);
      }
    }
  }, [course, selectedLesson]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedLesson) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedLesson]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress.some(p => p.lessonId === lessonId && p.completed);
  };

  const markLessonComplete = () => {
    if (selectedLesson && !isLessonCompleted(selectedLesson.id)) {
      updateProgress({
        studentId: user!.id,
        courseId: courseId!,
        lessonId: selectedLesson.id,
        completed: true,
        timeSpent: timeSpent
      });

      // Check if this completes the course
      const completedLessons = progress.filter(p => p.completed).length + 1;
      if (completedLessons === course.lessons.length) {
        addAchievement({
          studentId: user!.id,
          title: 'Course Completed!',
          description: `Completed ${course.title}`,
          icon: '🎓',
          courseId: courseId
        });
      }

      // Unlock next lesson
      const currentIndex = course.lessons.findIndex(l => l.id === selectedLesson.id);
      if (currentIndex < course.lessons.length - 1) {
        const nextLesson = course.lessons[currentIndex + 1];
        // In a real app, you'd update the lesson's lock status in the database
      }
    }
  };

  const calculateProgress = () => {
    const completedLessons = progress.filter(p => p.completed).length;
    return Math.round((completedLessons / course.lessons.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
              <p className="text-gray-600">{course.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Progress</div>
            <div className="text-2xl font-bold text-indigo-600">{calculateProgress()}%</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lesson List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Course Content</h3>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                {course.lessons.map((lesson, index) => {
                  const isCompleted = isLessonCompleted(lesson.id);
                  const isSelected = selectedLesson?.id === lesson.id;
                  const canAccess = !lesson.isLocked || isCompleted;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => canAccess && setSelectedLesson(lesson)}
                      disabled={!canAccess}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-indigo-100 border-2 border-indigo-500'
                          : canAccess
                          ? 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          : 'bg-gray-100 opacity-50 cursor-not-allowed border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          ) : lesson.isLocked ? (
                            <Lock className="w-5 h-5 text-gray-400 mr-3" />
                          ) : (
                            <Play className="w-5 h-5 text-indigo-500 mr-3" />
                          )}
                          <div>
                            <div className="font-medium text-gray-800 text-sm">
                              {index + 1}. {lesson.title}
                            </div>
                            <div className="text-xs text-gray-500">{lesson.duration}</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {course.pdfUrl && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href={course.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Course PDF
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-3">
            {selectedLesson ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedLesson.title}</h2>
                    <p className="text-gray-600 mt-2">{selectedLesson.description}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedLesson.duration}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedLesson.content}
                  </div>
                </div>

                {selectedLesson.videoUrl && (
                  <div className="mb-8">
                    <video
                      controls
                      className="w-full rounded-lg"
                      src={selectedLesson.videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {!isLessonCompleted(selectedLesson.id) && (
                  <div className="flex justify-center">
                    <button
                      onClick={markLessonComplete}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Mark as Complete
                    </button>
                  </div>
                )}

                {isLessonCompleted(selectedLesson.id) && (
                  <div className="text-center">
                    <div className="inline-flex items-center bg-green-100 text-green-800 py-2 px-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Lesson Completed!
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Lesson</h3>
                <p className="text-gray-500">Choose a lesson from the sidebar to start learning.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};