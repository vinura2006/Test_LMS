import React from 'react';
import { Phone, User, UserPlus, LogOut, BookOpen } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLogin, onOpenRegister }) => {
  const { user, logout } = useUser();

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'student': return '👨‍🎓 Student';
      case 'teacher': return '👩‍🏫 Teacher';
      case 'site_admin': return '⚙️ Site Admin';
      case 'course_admin': return '📚 Course Admin';
      default: return role;
    }
  };

  return (
    <header className="bg-gradient-to-r from-pink-100 to-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg flex items-center space-x-2">
              <BookOpen className="w-6 h-6" />
              <span>MAPA</span>
            </div>
            {user && (
              <div className="hidden md:block text-sm text-gray-600">
                Welcome, <span className="font-semibold text-indigo-600">{user.name}</span>
                <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                  {getRoleDisplay(user.role)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
                
                <button
                  onClick={onOpenRegister}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </button>
              </>
            )}
            
            <div className="flex items-center space-x-2 text-gray-600 font-medium">
              <Phone className="w-4 h-4" />
              <span>071 8 111 600</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};