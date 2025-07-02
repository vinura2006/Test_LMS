import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface RegisterModalProps {
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'select' | 'student' | 'teacher' | 'admin'>('select');
  const [adminType, setAdminType] = useState<'site_admin' | 'course_admin' | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useUser();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const userData = {
      ...formData,
      role: step === 'admin' ? adminType : step
    };

    const success = await register(userData);
    
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError('Registration failed. Email might already exist.');
    }
    
    setLoading(false);
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center mb-6">Select Your Role:</h3>
      <div className="space-y-3">
        <button
          onClick={() => setStep('student')}
          className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
        >
          <h4 className="font-semibold text-lg">👨‍🎓 Student</h4>
          <p className="text-gray-600">Access courses and track your learning progress</p>
        </button>
        
        <button
          onClick={() => setStep('teacher')}
          className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
        >
          <h4 className="font-semibold text-lg">👩‍🏫 Teacher</h4>
          <p className="text-gray-600">Create and manage courses for students</p>
        </button>
        
        <button
          onClick={() => setStep('admin')}
          className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
        >
          <h4 className="font-semibold text-lg">⚙️ Administrator</h4>
          <p className="text-gray-600">Manage the entire learning system</p>
        </button>
      </div>
    </div>
  );

  const renderStudentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="button"
        onClick={() => setStep('select')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>
      
      <h3 className="text-xl font-semibold">Student Registration</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Level</label>
        <select
          value={formData.grade || ''}
          onChange={(e) => handleInputChange('grade', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="">Select Grade</option>
          <option value="grade1-5">Grade 1-5</option>
          <option value="grade6-9">Grade 6-9</option>
          <option value="grade10-11">Grade 10-11 (O/L)</option>
          <option value="grade12-13">Grade 12-13 (A/L)</option>
          <option value="adult">Adult Learner</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={formData.password || ''}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
        <input
          type="password"
          value={formData.confirmPassword || ''}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Student Account'}
      </button>
    </form>
  );

  const renderTeacherForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="button"
        onClick={() => setStep('select')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>
      
      <h3 className="text-xl font-semibold">Teacher Registration</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subject Specialization</label>
        <select
          value={formData.subject || ''}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="">Select Subject</option>
          <option value="english">English Language</option>
          <option value="tamil">Tamil Language</option>
          <option value="both">Both English & Tamil</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Experience (Years)</label>
        <input
          type="number"
          min="0"
          value={formData.experience || ''}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
        <textarea
          value={formData.qualifications || ''}
          onChange={(e) => handleInputChange('qualifications', e.target.value)}
          placeholder="List your educational qualifications and certifications"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={formData.password || ''}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
        <input
          type="password"
          value={formData.confirmPassword || ''}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
      >
        {loading ? 'Submitting Application...' : 'Submit Teacher Application'}
      </button>
    </form>
  );

  const renderAdminForm = () => (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setStep('select')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>
      
      <h3 className="text-xl font-semibold">Administrator Registration</h3>
      
      {!adminType ? (
        <div className="space-y-3">
          <p className="text-gray-600 mb-4">Select admin type:</p>
          <button
            onClick={() => setAdminType('site_admin')}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
          >
            <h4 className="font-semibold text-lg">🖥️ Site Admin</h4>
            <p className="text-gray-600">Manage technical aspects and user accounts</p>
          </button>
          
          <button
            onClick={() => setAdminType('course_admin')}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
          >
            <h4 className="font-semibold text-lg">📚 Course Admin</h4>
            <p className="text-gray-600">Oversee courses and educational content</p>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Official Email Address</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              value={formData.department || ''}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword || ''}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting Application...' : 'Submit Admin Application'}
          </button>
        </form>
      )}
    </div>
  );

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h2>
          <p className="text-gray-600">Your account has been created successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🚀 Create Your Account</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {step === 'select' && renderUserTypeSelection()}
          {step === 'student' && renderStudentForm()}
          {step === 'teacher' && renderTeacherForm()}
          {step === 'admin' && renderAdminForm()}
        </div>
      </div>
    </div>
  );
};