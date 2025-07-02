import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Users, UserPlus } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useData } from '../../context/DataContext';

export const CourseAdminDashboard: React.FC = () => {
  const { user } = useUser();
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [selectedTab, setSelectedTab] = useState<'courses' | 'create' | 'teachers'>('courses');
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: 'english' as 'english' | 'tamil',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    duration: '',
    imageUrl: '',
    pdfUrl: '',
    lessons: [] as any[]
  });

  // Get all users to manage teachers
  const allUsers = JSON.parse(localStorage.getItem('mapaUsers') || '[]');
  const teachers = allUsers.filter((u: any) => u.role === 'teacher');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      ...newCourse,
      teacherIds: [],
      studentIds: [],
      isActive: true,
      adminId: user!.id
    });
    setNewCourse({
      title: '',
      description: '',
      category: 'english',
      level: 'beginner',
      duration: '',
      imageUrl: '',
      pdfUrl: '',
      lessons: []
    });
    setSelectedTab('courses');
  };

  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(editingCourse.id, editingCourse);
      setEditingCourse(null);
    }
  };

  const addLesson = (courseData: any, setCourseData: any) => {
    const newLesson = {
      id: Date.now().toString(),
      title: '',
      description: '',
      content: '',
      order: courseData.lessons.length + 1,
      isLocked: courseData.lessons.length > 0,
      duration: ''
    };
    setCourseData({
      ...courseData,
      lessons: [...courseData.lessons, newLesson]
    });
  };

  const updateLesson = (courseData: any, setCourseData: any, lessonIndex: number, field: string, value: string) => {
    const updatedLessons = courseData.lessons.map((lesson: any, index: number) =>
      index === lessonIndex ? { ...lesson, [field]: value } : lesson
    );
    setCourseData({
      ...courseData,
      lessons: updatedLessons
    });
  };

  const removeLesson = (courseData: any, setCourseData: any, lessonIndex: number) => {
    const updatedLessons = courseData.lessons.filter((_: any, index: number) => index !== lessonIndex);
    setCourseData({
      ...courseData,
      lessons: updatedLessons
    });
  };

  const assignTeacherToCourse = (courseId: string, teacherId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course && !course.teacherIds.includes(teacherId)) {
      updateCourse(courseId, {
        teacherIds: [...course.teacherIds, teacherId]
      });
    }
  };

  const removeTeacherFromCourse = (courseId: string, teacherId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      updateCourse(courseId, {
        teacherIds: course.teacherIds.filter(id => id !== teacherId)
      });
    }
  };

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">📚 My Courses</h3>
        <button
          onClick={() => setSelectedTab('create')}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.filter(course => course.adminId === user!.id).map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={course.imageUrl} 
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h4>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div>📚 {course.lessons.length} lessons</div>
                <div>👥 {course.studentIds.length} students</div>
                <div>👩‍🏫 {course.teacherIds.length} teachers</div>
                <div>⏱️ {course.duration}</div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingCourse(course)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourseForm = (courseData: any, setCourseData: any, onSubmit: any, title: string) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">{title}</h3>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
            <input
              type="text"
              value={courseData.title}
              onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              value={courseData.duration}
              onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
              placeholder="e.g., 12 months"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={courseData.description}
            onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={courseData.category}
              onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              value={courseData.level}
              onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={courseData.imageUrl}
              onChange={(e) => setCourseData({ ...courseData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PDF URL</label>
            <input
              type="url"
              value={courseData.pdfUrl}
              onChange={(e) => setCourseData({ ...courseData, pdfUrl: e.target.value })}
              placeholder="https://example.com/course.pdf"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Lessons Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Lessons</h4>
            <button
              type="button"
              onClick={() => addLesson(courseData, setCourseData)}
              className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600 transition-all"
            >
              Add Lesson
            </button>
          </div>
          
          <div className="space-y-4">
            {courseData.lessons.map((lesson: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium text-gray-800">Lesson {index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeLesson(courseData, setCourseData, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Lesson title"
                    value={lesson.title}
                    onChange={(e) => updateLesson(courseData, setCourseData, index, 'title', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 45 minutes)"
                    value={lesson.duration}
                    onChange={(e) => updateLesson(courseData, setCourseData, index, 'duration', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <textarea
                  placeholder="Lesson description"
                  value={lesson.description}
                  onChange={(e) => updateLesson(courseData, setCourseData, index, 'description', e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
                />
                
                <textarea
                  placeholder="Lesson content"
                  value={lesson.content}
                  onChange={(e) => updateLesson(courseData, setCourseData, index, 'content', e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            {title.includes('Create') ? 'Create Course' : 'Update Course'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (title.includes('Create')) {
                setSelectedTab('courses');
              } else {
                setEditingCourse(null);
              }
            }}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  const renderTeachers = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">👩‍🏫 Teacher Management</h3>
      
      {courses.filter(course => course.adminId === user!.id).map((course) => (
        <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">{course.title}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assigned Teachers */}
            <div>
              <h5 className="font-semibold text-gray-700 mb-3">Assigned Teachers</h5>
              <div className="space-y-2">
                {course.teacherIds.map((teacherId) => {
                  const teacher = teachers.find(t => t.id === teacherId);
                  return teacher ? (
                    <div key={teacherId} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <div className="font-medium text-green-800">{teacher.name}</div>
                        <div className="text-sm text-green-600">{teacher.subject}</div>
                      </div>
                      <button
                        onClick={() => removeTeacherFromCourse(course.id, teacherId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null;
                })}
                {course.teacherIds.length === 0 && (
                  <div className="text-gray-500 text-sm">No teachers assigned</div>
                )}
              </div>
            </div>
            
            {/* Available Teachers */}
            <div>
              <h5 className="font-semibold text-gray-700 mb-3">Available Teachers</h5>
              <div className="space-y-2">
                {teachers.filter(teacher => !course.teacherIds.includes(teacher.id)).map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <div className="font-medium text-gray-800">{teacher.name}</div>
                      <div className="text-sm text-gray-600">{teacher.subject}</div>
                    </div>
                    <button
                      onClick={() => assignTeacherToCourse(course.id, teacher.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (editingCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {renderCourseForm(editingCourse, setEditingCourse, handleUpdateCourse, '✏️ Edit Course')}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Course Admin Dashboard 📚</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">My Courses</div>
              <div className="text-2xl font-bold text-indigo-600">
                {courses.filter(course => course.adminId === user!.id).length}
              </div>
            </div>
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
              onClick={() => setSelectedTab('create')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'create'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              ➕ Create Course
            </button>
            <button
              onClick={() => setSelectedTab('teachers')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'teachers'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              👩‍🏫 Teachers
            </button>
          </div>

          <div className="p-8">
            {selectedTab === 'courses' && renderCourses()}
            {selectedTab === 'create' && renderCourseForm(newCourse, setNewCourse, handleCreateCourse, '➕ Create New Course')}
            {selectedTab === 'teachers' && renderTeachers()}
          </div>
        </div>
      </div>
    </div>
  );
};