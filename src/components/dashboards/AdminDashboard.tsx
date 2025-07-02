import React, { useState } from 'react';
import { Users, BookOpen, Settings, UserPlus, Shield, Database } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'system'>('overview');

  // Get all users from localStorage
  const allUsers = JSON.parse(localStorage.getItem('mapaUsers') || '[]');
  const students = allUsers.filter((u: any) => u.role === 'student');
  const teachers = allUsers.filter((u: any) => u.role === 'teacher');
  const courseAdmins = allUsers.filter((u: any) => u.role === 'course_admin');
  const siteAdmins = allUsers.filter((u: any) => u.role === 'site_admin');

  const promoteToAdmin = (userId: string, newRole: 'course_admin' | 'site_admin') => {
    const users = JSON.parse(localStorage.getItem('mapaUsers') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === userId ? { ...u, role: newRole } : u
    );
    localStorage.setItem('mapaUsers', JSON.stringify(updatedUsers));
    window.location.reload(); // Refresh to show changes
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <Users className="w-8 h-8 mb-3" />
          <div className="text-2xl font-bold">{students.length}</div>
          <div className="text-blue-100">Total Students</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <UserPlus className="w-8 h-8 mb-3" />
          <div className="text-2xl font-bold">{teachers.length}</div>
          <div className="text-green-100">Total Teachers</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <BookOpen className="w-8 h-8 mb-3" />
          <div className="text-2xl font-bold">{courseAdmins.length}</div>
          <div className="text-purple-100">Course Admins</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6">
          <Shield className="w-8 h-8 mb-3" />
          <div className="text-2xl font-bold">{siteAdmins.length}</div>
          <div className="text-orange-100">Site Admins</div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🖥️ System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-semibold text-green-800">Server Status</div>
            <div className="text-sm text-green-600">Online</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl mb-2">💾</div>
            <div className="font-semibold text-blue-800">Database</div>
            <div className="text-sm text-blue-600">Healthy</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-semibold text-purple-800">Security</div>
            <div className="text-sm text-purple-600">Protected</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                +
              </div>
              <span className="ml-3 text-gray-800">New student registration</span>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                📚
              </div>
              <span className="ml-3 text-gray-800">Course content updated</span>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                👩‍🏫
              </div>
              <span className="ml-3 text-gray-800">Teacher application approved</span>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Students */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">👨‍🎓 Students ({students.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Grade</th>
                <th className="text-left py-2">Joined</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((student: any) => (
                <tr key={student.id} className="border-b">
                  <td className="py-2">{student.name}</td>
                  <td className="py-2">{student.email}</td>
                  <td className="py-2">{student.grade}</td>
                  <td className="py-2">{new Date(student.createdAt).toLocaleDateString()}</td>
                  <td className="py-2">
                    <button
                      onClick={() => promoteToAdmin(student.id, 'course_admin')}
                      className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                    >
                      Make Course Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teachers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">👩‍🏫 Teachers ({teachers.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Subject</th>
                <th className="text-left py-2">Experience</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher: any) => (
                <tr key={teacher.id} className="border-b">
                  <td className="py-2">{teacher.name}</td>
                  <td className="py-2">{teacher.email}</td>
                  <td className="py-2">{teacher.subject}</td>
                  <td className="py-2">{teacher.experience} years</td>
                  <td className="py-2">
                    <div className="space-x-2">
                      <button
                        onClick={() => promoteToAdmin(teacher.id, 'course_admin')}
                        className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                      >
                        Make Course Admin
                      </button>
                      <button
                        onClick={() => promoteToAdmin(teacher.id, 'site_admin')}
                        className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                      >
                        Make Site Admin
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Admins */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Course Admins ({courseAdmins.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Department</th>
                <th className="text-left py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {courseAdmins.map((admin: any) => (
                <tr key={admin.id} className="border-b">
                  <td className="py-2">{admin.name}</td>
                  <td className="py-2">{admin.email}</td>
                  <td className="py-2">{admin.department}</td>
                  <td className="py-2">{new Date(admin.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSystem = () => (
    <div className="space-y-6">
      {/* System Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">⚙️ System Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🔒 Security Settings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Two-Factor Authentication</span>
                <span className="text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span>Password Policy</span>
                <span className="text-green-600">Strong</span>
              </div>
              <div className="flex justify-between">
                <span>Session Timeout</span>
                <span className="text-gray-600">30 minutes</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">💾 Database Settings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Auto Backup</span>
                <span className="text-green-600">Daily</span>
              </div>
              <div className="flex justify-between">
                <span>Storage Used</span>
                <span className="text-gray-600">2.3 GB</span>
              </div>
              <div className="flex justify-between">
                <span>Last Backup</span>
                <span className="text-gray-600">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Server Maintenance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🛠️ Server Maintenance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <Database className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="font-semibold text-blue-800">Backup Database</div>
            <div className="text-sm text-blue-600">Create manual backup</div>
          </button>

          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <Settings className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="font-semibold text-green-800">System Update</div>
            <div className="text-sm text-green-600">Check for updates</div>
          </button>

          <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
            <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="font-semibold text-orange-800">Security Scan</div>
            <div className="text-sm text-orange-600">Run security check</div>
          </button>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📋 System Logs</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
          <div>[2025-01-27 10:30:15] INFO: System startup completed</div>
          <div>[2025-01-27 10:30:16] INFO: Database connection established</div>
          <div>[2025-01-27 10:30:17] INFO: User authentication service started</div>
          <div>[2025-01-27 10:32:45] INFO: New user registration: student@example.com</div>
          <div>[2025-01-27 10:35:12] INFO: Course content updated: Total English Solution</div>
          <div>[2025-01-27 10:37:28] INFO: Backup completed successfully</div>
          <div>[2025-01-27 10:40:15] INFO: Security scan completed - No threats detected</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Site Admin Dashboard ⚙️</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Users</div>
              <div className="text-2xl font-bold text-indigo-600">{allUsers.length}</div>
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
              onClick={() => setSelectedTab('users')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'users'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              👥 User Management
            </button>
            <button
              onClick={() => setSelectedTab('system')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                selectedTab === 'system'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              🛠️ System
            </button>
          </div>

          <div className="p-8">
            {selectedTab === 'overview' && renderOverview()}
            {selectedTab === 'users' && renderUsers()}
            {selectedTab === 'system' && renderSystem()}
          </div>
        </div>
      </div>
    </div>
  );
};