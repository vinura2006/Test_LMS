import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'site_admin' | 'course_admin';
  phone?: string;
  grade?: string;
  subject?: string;
  experience?: number;
  qualifications?: string;
  department?: string;
  assignedCourses?: string[];
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Dummy accounts for testing
const dummyUsers = [
  // Students
  {
    id: '1',
    name: 'Amal Perera',
    email: 'amal@student.com',
    password: 'student123',
    role: 'student',
    phone: '+94771234567',
    grade: 'grade10-11',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Saman Silva',
    email: 'saman@student.com',
    password: 'student123',
    role: 'student',
    phone: '+94771234568',
    grade: 'grade12-13',
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    name: 'Nimal Fernando',
    email: 'nimal@student.com',
    password: 'student123',
    role: 'student',
    phone: '+94771234569',
    grade: 'adult',
    createdAt: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    name: 'Kamala Jayasinghe',
    email: 'kamala@student.com',
    password: 'student123',
    role: 'student',
    phone: '+94771234570',
    grade: 'grade6-9',
    createdAt: '2024-01-18T10:00:00Z'
  },
  {
    id: '5',
    name: 'Ruwan Bandara',
    email: 'ruwan@student.com',
    password: 'student123',
    role: 'student',
    phone: '+94771234571',
    grade: 'grade10-11',
    createdAt: '2024-01-19T10:00:00Z'
  },
  // Teachers
  {
    id: '6',
    name: 'Mrs. Priyanka Wijesinghe',
    email: 'priyanka@teacher.com',
    password: 'teacher123',
    role: 'teacher',
    phone: '+94771234572',
    subject: 'english',
    experience: 8,
    qualifications: 'B.A. in English Literature, TESOL Certificate',
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '7',
    name: 'Mr. Sunil Rajapaksa',
    email: 'sunil@teacher.com',
    password: 'teacher123',
    role: 'teacher',
    phone: '+94771234573',
    subject: 'tamil',
    experience: 12,
    qualifications: 'M.A. in Tamil Literature, Teaching Diploma',
    createdAt: '2024-01-11T10:00:00Z'
  },
  {
    id: '8',
    name: 'Ms. Dilani Kumari',
    email: 'dilani@teacher.com',
    password: 'teacher123',
    role: 'teacher',
    phone: '+94771234574',
    subject: 'both',
    experience: 6,
    qualifications: 'B.Ed. in Languages, CELTA Certificate',
    createdAt: '2024-01-12T10:00:00Z'
  },
  // Course Admins
  {
    id: '9',
    name: 'Dr. Mahesh Gunasekara',
    email: 'mahesh@courseadmin.com',
    password: 'admin123',
    role: 'course_admin',
    phone: '+94771234575',
    department: 'English Department',
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '10',
    name: 'Prof. Chandrika Mendis',
    email: 'chandrika@courseadmin.com',
    password: 'admin123',
    role: 'course_admin',
    phone: '+94771234576',
    department: 'Tamil Department',
    createdAt: '2024-01-06T10:00:00Z'
  },
  // Site Admin
  {
    id: '11',
    name: 'Kanishka Jayathilaka',
    email: 'kanishka@siteadmin.com',
    password: 'admin123',
    role: 'site_admin',
    phone: '+94718111600',
    department: 'IT Administration',
    createdAt: '2024-01-01T10:00:00Z'
  }
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize dummy users in localStorage if not exists
    const existingUsers = localStorage.getItem('mapaUsers');
    if (!existingUsers) {
      localStorage.setItem('mapaUsers', JSON.stringify(dummyUsers));
    }

    // Check for saved user session
    const savedUser = localStorage.getItem('mapaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('mapaUsers') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('mapaUser', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mapaUser');
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('mapaUsers') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === userData.email)) {
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        assignedCourses: userData.role === 'student' ? [] : undefined
      };

      users.push(newUser);
      localStorage.setItem('mapaUsers', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('mapaUser', JSON.stringify(updatedUser));
      
      // Update in users list
      const users = JSON.parse(localStorage.getItem('mapaUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('mapaUsers', JSON.stringify(users));
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}