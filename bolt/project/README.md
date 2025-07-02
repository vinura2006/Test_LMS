# MAPA Gurugedara Learning Management System

A comprehensive Learning Management System built with React, TypeScript, and Tailwind CSS. This system provides role-based access for students, teachers, course administrators, and site administrators.

## 🚀 Features

### User Roles & Permissions

#### 👨‍🎓 Students
- View enrolled courses and track progress
- Complete lessons and earn achievements
- Download course PDFs
- Monitor study time and completion rates
- Unlock lessons progressively

#### 👩‍🏫 Teachers
- View assigned students and their progress
- Unlock lessons for individual students
- Monitor student performance and engagement
- Access course materials and resources

#### 📚 Course Administrators
- Create, edit, and manage courses
- Add lessons with content, videos, and PDFs
- Assign teachers to courses
- Monitor course analytics and enrollment

#### ⚙️ Site Administrators
- Manage all users and promote roles
- System monitoring and maintenance
- User analytics and reporting
- Full system control and configuration

## 🎯 Demo Accounts

The system comes with pre-configured demo accounts for testing:

### Students
- **Amal Perera**: `amal@student.com` / `student123`
- **Saman Silva**: `saman@student.com` / `student123`
- **Nimal Fernando**: `nimal@student.com` / `student123`
- **Kamala Jayasinghe**: `kamala@student.com` / `student123`
- **Ruwan Bandara**: `ruwan@student.com` / `student123`

### Teachers
- **Mrs. Priyanka Wijesinghe**: `priyanka@teacher.com` / `teacher123`
- **Mr. Sunil Rajapaksa**: `sunil@teacher.com` / `teacher123`
- **Ms. Dilani Kumari**: `dilani@teacher.com` / `teacher123`

### Course Administrators
- **Dr. Mahesh Gunasekara**: `mahesh@courseadmin.com` / `admin123`
- **Prof. Chandrika Mendis**: `chandrika@courseadmin.com` / `admin123`

### Site Administrator
- **Kanishka Jayathilaka**: `kanishka@siteadmin.com` / `admin123`

## 📚 Available Courses

### English Courses
1. **Total English Solution** - Complete mastery program (12 months)
2. **English ABCD** - Foundation for young learners (6 months)
3. **My First 1000 Words** - Vocabulary building (8 months)
4. **Basic English** - Fundamental communication (10 months)
5. **English for O/L** - Exam preparation (18 months)

### Tamil Courses
1. **Tamil for Beginners** - Script and basics (12 months)
2. **Advanced Tamil** - Literature and advanced skills (15 months)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Data Storage**: Local Storage (no backend required)

## 🚀 Deployment to GitHub Pages

This project is designed to work perfectly with GitHub Pages without any server-side requirements.

### Steps to Deploy:

1. **Fork or Clone this repository**
   ```bash
   git clone <repository-url>
   cd mapa-gurugedara-lms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages**
   - Push your code to a GitHub repository
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/docs" folder (or use GitHub Actions)
   - Your site will be available at `https://yourusername.github.io/repository-name`

### Alternative: Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 💾 Data Persistence

The system uses browser Local Storage for data persistence, which means:
- ✅ No server required
- ✅ Works offline
- ✅ Fast performance
- ✅ Easy deployment
- ⚠️ Data is browser-specific
- ⚠️ Data may be cleared if user clears browser data

## 🎨 Features Highlights

- **Responsive Design**: Works on all devices
- **Role-based Dashboards**: Customized experience for each user type
- **Progress Tracking**: Visual progress indicators and analytics
- **Achievement System**: Badges and certificates for motivation
- **Course Management**: Complete CRUD operations for courses
- **User Management**: Admin tools for user promotion and management
- **Real-time Updates**: Instant updates across all components

## 🔧 Development

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Mobile Responsive

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎯 Perfect for GitHub Pages

This LMS is specifically designed for GitHub Pages deployment:
- No backend dependencies
- Static file hosting
- Client-side routing with fallback
- Local storage for data persistence
- Fast loading and performance optimized

## 📞 Support

For support and inquiries:
- **Phone**: 071 8 111 600
- **Website**: [mapalk.com](https://www.mapalk.com)

## 📄 License

This project is created for MAPA Gurugedara educational purposes.