import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { CourseAdminDashboard } from './components/dashboards/CourseAdminDashboard';
import { CourseViewer } from './components/CourseViewer';
import { UserProvider, useUser } from './context/UserContext';
import { DataProvider } from './context/DataContext';

function AppContent() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user } = useUser();

  const getDashboardComponent = () => {
    if (!user) return <Hero />;
    
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'site_admin':
        return <AdminDashboard />;
      case 'course_admin':
        return <CourseAdminDashboard />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header 
        onOpenLogin={() => setShowLoginModal(true)}
        onOpenRegister={() => setShowRegisterModal(true)}
      />
      
      <Routes>
        <Route path="/" element={getDashboardComponent()} />
        <Route path="/course/:courseId" element={<CourseViewer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </UserProvider>
  );
}

export default App;