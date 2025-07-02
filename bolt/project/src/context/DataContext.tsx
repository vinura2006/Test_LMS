import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'english' | 'tamil';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: Lesson[];
  adminId?: string;
  teacherIds: string[];
  studentIds: string[];
  isActive: boolean;
  createdAt: string;
  pdfUrl?: string;
  imageUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  pdfUrl?: string;
  order: number;
  isLocked: boolean;
  duration: string;
}

export interface StudentProgress {
  studentId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
  lastAccessed: string;
}

export interface Achievement {
  id: string;
  studentId: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  courseId?: string;
}

interface DataContextType {
  courses: Course[];
  studentProgress: StudentProgress[];
  achievements: Achievement[];
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  enrollStudent: (studentId: string, courseId: string) => void;
  updateProgress: (progress: Omit<StudentProgress, 'lastAccessed'>) => void;
  unlockLesson: (courseId: string, lessonId: string, studentId: string) => void;
  addAchievement: (achievement: Omit<Achievement, 'id' | 'earnedAt'>) => void;
  getStudentCourses: (studentId: string) => Course[];
  getTeacherCourses: (teacherId: string) => Course[];
  getCourseProgress: (studentId: string, courseId: string) => StudentProgress[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial courses data from mapalk.com with dummy enrollments
const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Total English Solution',
    description: 'Complete English mastery program covering all aspects from basic to advanced levels',
    category: 'english',
    level: 'beginner',
    duration: '12 months',
    teacherIds: ['6', '8'], // Priyanka and Dilani
    studentIds: ['1', '2', '3'], // Amal, Saman, Nimal
    isActive: true,
    createdAt: new Date().toISOString(),
    adminId: '9', // Dr. Mahesh
    pdfUrl: 'https://www.mapalk.com/pdfs/total-english-solution.pdf',
    imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    lessons: [
      {
        id: '1-1',
        title: 'English Alphabet & Phonics',
        description: 'Master the English alphabet and basic phonetic sounds',
        content: 'Welcome to the first lesson of Total English Solution!\n\nIn this lesson, you will learn:\n\n1. All 26 letters of the English alphabet\n2. Proper pronunciation of each letter\n3. Basic phonetic sounds\n4. Letter recognition exercises\n5. Writing practice\n\nThe English alphabet is the foundation of all English learning. Each letter has a unique sound and shape that you must master.\n\nA - Apple, B - Ball, C - Cat, D - Dog, E - Elephant...\n\nPractice writing each letter both in uppercase and lowercase. Pay attention to the correct formation of each letter.\n\nRemember: Consistent practice is the key to mastering the alphabet!',
        order: 1,
        isLocked: false,
        duration: '45 minutes'
      },
      {
        id: '1-2',
        title: 'Basic Grammar Foundations',
        description: 'Understanding parts of speech and sentence structure',
        content: 'Grammar is the backbone of any language. In this lesson, we will cover:\n\n1. Parts of Speech:\n   - Nouns (person, place, thing)\n   - Verbs (action words)\n   - Adjectives (describing words)\n   - Adverbs (modify verbs)\n\n2. Sentence Structure:\n   - Subject + Verb + Object\n   - Simple sentences\n   - Question formation\n\n3. Basic Rules:\n   - Capital letters at the beginning\n   - Periods at the end\n   - Proper spacing\n\nExamples:\n- The cat (noun) runs (verb) quickly (adverb).\n- She (pronoun) is (verb) beautiful (adjective).\n\nPractice forming simple sentences using different parts of speech.',
        order: 2,
        isLocked: true,
        duration: '60 minutes'
      },
      {
        id: '1-3',
        title: 'Vocabulary Building',
        description: 'Essential English words for daily communication',
        content: 'Building a strong vocabulary is essential for effective communication. This lesson includes:\n\n1. Common Daily Words:\n   - Family members: mother, father, sister, brother\n   - Colors: red, blue, green, yellow, black, white\n   - Numbers: one, two, three, four, five\n   - Days: Monday, Tuesday, Wednesday, Thursday, Friday\n\n2. Learning Techniques:\n   - Visual association\n   - Repetition\n   - Context usage\n   - Word families\n\n3. Practice Exercises:\n   - Match words with pictures\n   - Fill in the blanks\n   - Word pronunciation\n   - Sentence formation\n\nTip: Learn 5 new words every day and use them in sentences!',
        order: 3,
        isLocked: true,
        duration: '50 minutes'
      }
    ]
  },
  {
    id: '2',
    title: 'English ABCD',
    description: 'Foundation English for young learners focusing on alphabet and basic vocabulary',
    category: 'english',
    level: 'beginner',
    duration: '6 months',
    teacherIds: ['6'], // Priyanka
    studentIds: ['4'], // Kamala
    isActive: true,
    createdAt: new Date().toISOString(),
    adminId: '9',
    pdfUrl: 'https://www.mapalk.com/pdfs/english-abcd.pdf',
    imageUrl: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg',
    lessons: [
      {
        id: '2-1',
        title: 'Letter Recognition A-M',
        description: 'Learn to recognize and write letters A through M',
        content: 'Welcome to English ABCD! Let\'s start with the first half of the alphabet.\n\nLetters A to M:\n\nA - Apple 🍎\nB - Ball ⚽\nC - Cat 🐱\nD - Dog 🐶\nE - Elephant 🐘\nF - Fish 🐟\nG - Goat 🐐\nH - House 🏠\nI - Ice cream 🍦\nJ - Juice 🧃\nK - Kite 🪁\nL - Lion 🦁\nM - Monkey 🐵\n\nActivities:\n1. Trace each letter\n2. Say the letter name\n3. Say the word that starts with that letter\n4. Draw the object\n\nRemember: Practice makes perfect!',
        order: 1,
        isLocked: false,
        duration: '30 minutes'
      },
      {
        id: '2-2',
        title: 'Letter Recognition N-Z',
        description: 'Learn to recognize and write letters N through Z',
        content: 'Now let\'s complete the alphabet with letters N to Z!\n\nLetters N to Z:\n\nN - Nest 🪺\nO - Orange 🍊\nP - Parrot 🦜\nQ - Queen 👸\nR - Rabbit 🐰\nS - Sun ☀️\nT - Tree 🌳\nU - Umbrella ☂️\nV - Van 🚐\nW - Watch ⌚\nX - X-ray 🩻\nY - Yellow 💛\nZ - Zebra 🦓\n\nFun Activities:\n1. Alphabet song\n2. Letter matching games\n3. Find objects that start with each letter\n4. Write your name using these letters\n\nCongratulations! You now know the complete English alphabet!',
        order: 2,
        isLocked: true,
        duration: '30 minutes'
      }
    ]
  },
  {
    id: '3',
    title: 'My First 1000 Words',
    description: 'Essential vocabulary building program with visual learning',
    category: 'english',
    level: 'beginner',
    duration: '8 months',
    teacherIds: ['8'], // Dilani
    studentIds: ['5'], // Ruwan
    isActive: true,
    createdAt: new Date().toISOString(),
    adminId: '9',
    pdfUrl: 'https://www.mapalk.com/pdfs/first-1000-words.pdf',
    imageUrl: 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg',
    lessons: [
      {
        id: '3-1',
        title: 'Common Nouns (1-100)',
        description: 'Learn your first 100 essential English nouns',
        content: 'Welcome to your vocabulary journey! Let\'s start with 100 common nouns.\n\nBody Parts:\nhead, eye, nose, mouth, ear, hand, foot, arm, leg, finger\n\nFamily:\nmother, father, sister, brother, baby, grandmother, grandfather, aunt, uncle, cousin\n\nHome:\nhouse, room, kitchen, bedroom, bathroom, door, window, table, chair, bed\n\nFood:\napple, banana, bread, milk, water, rice, chicken, fish, egg, cheese\n\nAnimals:\ndog, cat, bird, fish, cow, horse, sheep, pig, lion, elephant\n\nColors:\nred, blue, green, yellow, black, white, brown, pink, purple, orange\n\nNumbers:\none, two, three, four, five, six, seven, eight, nine, ten\n\nClothes:\nshirt, pants, dress, shoes, hat, coat, socks, gloves, belt, tie\n\nSchool:\nbook, pen, pencil, paper, desk, teacher, student, classroom, board, bag\n\nTransport:\ncar, bus, train, plane, boat, bicycle, motorcycle, truck, taxi, ship\n\nPractice: Use each word in a simple sentence!',
        order: 1,
        isLocked: false,
        duration: '40 minutes'
      },
      {
        id: '3-2',
        title: 'Action Verbs (101-200)',
        description: 'Master 100 common action verbs',
        content: 'Now let\'s learn action words (verbs) that describe what we do!\n\nDaily Actions:\nwake, sleep, eat, drink, walk, run, sit, stand, jump, dance\n\nCommunication:\ntalk, speak, listen, read, write, sing, shout, whisper, ask, answer\n\nMovement:\ngo, come, move, stop, start, turn, climb, fall, fly, swim\n\nWork Actions:\nwork, study, learn, teach, help, make, build, fix, clean, wash\n\nEmotions:\nlove, like, hate, want, need, hope, wish, feel, think, know\n\nSenses:\nsee, look, watch, hear, smell, taste, touch, feel\n\nCooking:\ncook, bake, fry, boil, cut, mix, pour, serve, eat, drink\n\nSports:\nplay, kick, throw, catch, hit, score, win, lose, practice, exercise\n\nShopping:\nbuy, sell, pay, cost, choose, pick, carry, bring, take, give\n\nTime:\nbegin, start, finish, end, continue, wait, hurry, delay, arrive, leave\n\nRemember: Verbs show action or state of being!',
        order: 2,
        isLocked: true,
        duration: '40 minutes'
      }
    ]
  },
  {
    id: '4',
    title: 'Basic English',
    description: 'Fundamental English skills for everyday communication',
    category: 'english',
    level: 'beginner',
    duration: '10 months',
    teacherIds: ['6', '8'],
    studentIds: ['1', '4'],
    isActive: true,
    createdAt: new Date().toISOString(),
    adminId: '9',
    pdfUrl: 'https://www.mapalk.com/pdfs/basic-english.pdf',
    imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    lessons: [
      {
        id: '4-1',
        title: 'Greetings & Introductions',
        description: 'Learn how to greet people and introduce yourself',
        content: 'Communication starts with greetings! Let\'s learn how to meet and greet people in English.\n\nBasic Greetings:\n- Hello! / Hi!\n- Good morning! (before 12 PM)\n- Good afternoon! (12 PM - 6 PM)\n- Good evening! (after 6 PM)\n- Good night! (when going to bed)\n\nIntroducing Yourself:\n- My name is...\n- I am...\n- Nice to meet you!\n- Pleased to meet you!\n\nAsking About Others:\n- What\'s your name?\n- How are you?\n- Where are you from?\n- How old are you?\n\nCommon Responses:\n- I\'m fine, thank you.\n- I\'m from Sri Lanka.\n- I\'m 25 years old.\n- Nice to meet you too!\n\nFormal vs Informal:\nFormal: Good morning, Mr. Silva.\nInformal: Hi, John!\n\nPractice Dialogue:\nA: Hello! My name is Amal.\nB: Hi Amal! I\'m Saman. Nice to meet you!\nA: Nice to meet you too, Saman. How are you?\nB: I\'m fine, thank you. How about you?\nA: I\'m doing well, thanks!\n\nHomework: Practice introducing yourself to 5 different people!',
        order: 1,
        isLocked: false,
        duration: '35 minutes'
      }
    ]
  },
  {
    id: '5',
    title: 'English for O/L',
    description: 'Comprehensive English preparation for Ordinary Level examinations',
    category: 'english',
    level: 'intermediate',
    duration: '18 months',
    teacherIds: ['6'],
    studentIds: ['2', '5'],
    isActive: true,
    createdAt: new Date().toISOString(),
    adminId: '9',
    pdfUrl: 'https://www.mapalk.com/pdfs/english-ol.pdf',
    imageUrl: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg',
    lessons: [
      {
        id: '5-1',
        title: 'O/L Grammar Essentials',
        description: 'Advanced grammar concepts for O/L examination',
        content: 'Master the grammar concepts essential for O/L English success!\n\nKey Grammar Topics:\n\n1. Tenses:\n   - Simple Present: I study English.\n   - Present Continuous: I am studying English.\n   - Simple Past: I studied English yesterday.\n   - Present Perfect: I have studied English for 2 years.\n   - Future: I will study English tomorrow.\n\n2. Passive Voice:\n   - Active: The teacher teaches the lesson.\n   - Passive: The lesson is taught by the teacher.\n\n3. Reported Speech:\n   - Direct: He said, "I am happy."\n   - Indirect: He said that he was happy.\n\n4. Conditionals:\n   - Zero: If you heat water, it boils.\n   - First: If it rains, I will stay home.\n   - Second: If I were rich, I would travel.\n   - Third: If I had studied, I would have passed.\n\n5. Articles:\n   - A/An: indefinite articles\n   - The: definite article\n\n6. Prepositions:\n   - Time: at, on, in\n   - Place: at, on, in, under, over\n   - Movement: to, from, into, out of\n\n7. Modal Verbs:\n   - Can/Could: ability\n   - May/Might: possibility\n   - Must/Should: obligation\n   - Will/Would: future/politeness\n\nExam Tips:\n- Read questions carefully\n- Check your answers\n- Manage your time well\n- Practice past papers\n\nPractice Exercise:\nTransform these sentences:\n1. "I am reading a book," she said.\n2. They built this house in 1990.\n3. If I have time, I will visit you.',
        order: 1,
        isLocked: false,
        duration: '75 minutes'
      }
    ]
  },
  {
    id: '6',
    title: 'Tamil for Beginners',
    description: 'Introduction to Tamil language and script',
    category: 'tamil',
    level: 'beginner',
    duration: '12 months',
    teacherIds: ['7'], // Sunil
    studentIds: ['3', '4'],
    isActive: true,
    createdAt: new Date().toISOString(),
    adminId: '10', // Prof. Chandrika
    pdfUrl: 'https://www.mapalk.com/pdfs/tamil-beginners.pdf',
    imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    lessons: [
      {
        id: '6-1',
        title: 'Tamil Script Basics',
        description: 'Learn the Tamil alphabet and basic writing',
        content: 'வணக்கம்! Welcome to Tamil learning!\n\nTamil is one of the oldest languages in the world. Let\'s start with the beautiful Tamil script.\n\nTamil Vowels (உயிரெழுத்துக்கள்):\nஅ (a), ஆ (aa), இ (i), ஈ (ii), உ (u), ஊ (uu), எ (e), ஏ (ee), ஐ (ai), ஒ (o), ஓ (oo), ஔ (au)\n\nTamil Consonants (மெய்யெழுத்துக்கள்):\nக், ங், ச், ஞ், ட், ண், த், ந், ப், ம், ய், ர், ல், வ், ழ், ள், ற், ன்\n\nBasic Words:\n- வணக்கம் (Vanakkam) - Hello\n- நன்றி (Nandri) - Thank you\n- அம்மா (Amma) - Mother\n- அப்பா (Appa) - Father\n- பள்ளி (Palli) - School\n- வீடு (Veedu) - House\n- நீர் (Neer) - Water\n- சாப்பாடு (Saappaadu) - Food\n\nWriting Practice:\n1. Trace each letter carefully\n2. Practice writing vowels first\n3. Then practice consonants\n4. Combine letters to form words\n\nCultural Note:\nTamil has a rich literary tradition spanning over 2000 years. It\'s spoken by over 75 million people worldwide!\n\nHomework: Practice writing your name in Tamil script.',
        order: 1,
        isLocked: false,
        duration: '50 minutes'
      }
    ]
  },
  {
    id: '7',
    title: 'Advanced Tamil',
    description: 'Advanced Tamil language skills and literature',
    category: 'tamil',
    level: 'advanced',
    duration: '15 months',
    teacherIds: ['7'],
    studentIds: ['1'],
    isActive: true,
    createdAt: new Date().toISOString(),
    adminId: '10',
    pdfUrl: 'https://www.mapalk.com/pdfs/advanced-tamil.pdf',
    imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    lessons: [
      {
        id: '7-1',
        title: 'Tamil Literature Introduction',
        description: 'Explore classical Tamil literature and poetry',
        content: 'தமிழ் இலக்கியம் - Tamil Literature\n\nTamil literature is one of the oldest and richest in the world. Let\'s explore its treasures!\n\nClassical Tamil Literature:\n\n1. Tolkappiyam (தொல்காப்பியம்):\n   - The oldest Tamil grammar work\n   - Written by Tolkappiyar\n   - Defines rules for Tamil language and poetry\n\n2. Tirukkural (திருக்குறள்):\n   - Written by Thiruvalluvar\n   - 1330 couplets on virtue, wealth, and love\n   - Universal wisdom applicable to all humanity\n\nExample Kural:\nஅறத்துப்பால் - Virtue:\n"அன்புடைமை ஆன்ற குடிப்பிறப்பு இன்புடைமை\nஈன்றிய தாயிற் பெரிது"\n\nTranslation: "Love, noble birth, and joy - these three\nAre greater than the mother who gave birth"\n\n3. Sangam Literature:\n   - Ettuthokai (Eight Anthologies)\n   - Pattupattu (Ten Idylls)\n   - Poems about love, war, and nature\n\n4. Epic Literature:\n   - Silappatikaram (சிலப்பதிகாரம்)\n   - Manimekalai (மணிமேகலை)\n   - Stories of love, justice, and spirituality\n\nModern Tamil Literature:\n- Bharathiyar\'s patriotic poems\n- Kalki\'s historical novels\n- Contemporary writers\n\nPoetic Forms:\n- Venba (வெண்பா) - Classical meter\n- Aasiriyappa (ஆசிரியப்பா) - Epic meter\n- Kalivenba (கலிவெண்பா) - Mixed meter\n\nLiterary Devices:\n- Ullurai (உள்ளுறை) - Metaphor\n- Iraicci (இறைச்சி) - Metonymy\n- Uyarvu (உயர்வு) - Hyperbole\n\nAssignment: Read and analyze one Thirukkural couplet.',
        order: 1,
        isLocked: false,
        duration: '90 minutes'
      }
    ]
  }
];

// Initial progress data for demo
const initialProgress: StudentProgress[] = [
  // Amal's progress
  { studentId: '1', courseId: '1', lessonId: '1-1', completed: true, timeSpent: 2700, lastAccessed: '2024-01-20T10:00:00Z' },
  { studentId: '1', courseId: '1', lessonId: '1-2', completed: false, timeSpent: 1800, lastAccessed: '2024-01-21T10:00:00Z' },
  { studentId: '1', courseId: '4', lessonId: '4-1', completed: true, timeSpent: 2100, lastAccessed: '2024-01-22T10:00:00Z' },
  { studentId: '1', courseId: '7', lessonId: '7-1', completed: false, timeSpent: 3600, lastAccessed: '2024-01-23T10:00:00Z' },
  
  // Saman's progress
  { studentId: '2', courseId: '1', lessonId: '1-1', completed: true, timeSpent: 2400, lastAccessed: '2024-01-20T11:00:00Z' },
  { studentId: '2', courseId: '5', lessonId: '5-1', completed: false, timeSpent: 4200, lastAccessed: '2024-01-21T11:00:00Z' },
  
  // Kamala's progress
  { studentId: '4', courseId: '2', lessonId: '2-1', completed: true, timeSpent: 1800, lastAccessed: '2024-01-20T14:00:00Z' },
  { studentId: '4', courseId: '4', lessonId: '4-1', completed: false, timeSpent: 1200, lastAccessed: '2024-01-21T14:00:00Z' },
  { studentId: '4', courseId: '6', lessonId: '6-1', completed: true, timeSpent: 3000, lastAccessed: '2024-01-22T14:00:00Z' },
  
  // Ruwan's progress
  { studentId: '5', courseId: '3', lessonId: '3-1', completed: true, timeSpent: 2400, lastAccessed: '2024-01-20T16:00:00Z' },
  { studentId: '5', courseId: '5', lessonId: '5-1', completed: false, timeSpent: 3000, lastAccessed: '2024-01-21T16:00:00Z' }
];

// Initial achievements
const initialAchievements: Achievement[] = [
  { id: '1', studentId: '1', title: 'First Lesson Complete!', description: 'Completed your first lesson in Total English Solution', icon: '🎯', earnedAt: '2024-01-20T10:45:00Z', courseId: '1' },
  { id: '2', studentId: '1', title: 'Basic English Master', description: 'Completed Greetings & Introductions', icon: '👋', earnedAt: '2024-01-22T10:35:00Z', courseId: '4' },
  { id: '3', studentId: '2', title: 'Alphabet Expert', description: 'Mastered English Alphabet & Phonics', icon: '🔤', earnedAt: '2024-01-20T11:30:00Z', courseId: '1' },
  { id: '4', studentId: '4', title: 'Young Learner', description: 'Completed Letter Recognition A-M', icon: '⭐', earnedAt: '2024-01-20T14:30:00Z', courseId: '2' },
  { id: '5', studentId: '4', title: 'Tamil Script Master', description: 'Learned Tamil Script Basics', icon: '🎨', earnedAt: '2024-01-22T14:50:00Z', courseId: '6' },
  { id: '6', studentId: '5', title: 'Vocabulary Builder', description: 'Learned 100 Common Nouns', icon: '📚', earnedAt: '2024-01-20T16:40:00Z', courseId: '3' }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Load data from localStorage or use initial data
    const savedCourses = localStorage.getItem('mapaCourses');
    const savedProgress = localStorage.getItem('mapaProgress');
    const savedAchievements = localStorage.getItem('mapaAchievements');

    setCourses(savedCourses ? JSON.parse(savedCourses) : initialCourses);
    setStudentProgress(savedProgress ? JSON.parse(savedProgress) : initialProgress);
    setAchievements(savedAchievements ? JSON.parse(savedAchievements) : initialAchievements);

    // Save initial data if not exists
    if (!savedCourses) {
      localStorage.setItem('mapaCourses', JSON.stringify(initialCourses));
    }
    if (!savedProgress) {
      localStorage.setItem('mapaProgress', JSON.stringify(initialProgress));
    }
    if (!savedAchievements) {
      localStorage.setItem('mapaAchievements', JSON.stringify(initialAchievements));
    }
  }, []);

  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('mapaCourses', JSON.stringify(updatedCourses));
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    const updatedCourses = courses.map(course =>
      course.id === courseId ? { ...course, ...updates } : course
    );
    setCourses(updatedCourses);
    localStorage.setItem('mapaCourses', JSON.stringify(updatedCourses));
  };

  const deleteCourse = (courseId: string) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem('mapaCourses', JSON.stringify(updatedCourses));
  };

  const enrollStudent = (studentId: string, courseId: string) => {
    const updatedCourses = courses.map(course =>
      course.id === courseId
        ? { ...course, studentIds: [...course.studentIds, studentId] }
        : course
    );
    setCourses(updatedCourses);
    localStorage.setItem('mapaCourses', JSON.stringify(updatedCourses));
  };

  const updateProgress = (progress: Omit<StudentProgress, 'lastAccessed'>) => {
    const newProgress: StudentProgress = {
      ...progress,
      lastAccessed: new Date().toISOString()
    };

    const updatedProgress = studentProgress.filter(
      p => !(p.studentId === progress.studentId && 
             p.courseId === progress.courseId && 
             p.lessonId === progress.lessonId)
    );
    updatedProgress.push(newProgress);

    setStudentProgress(updatedProgress);
    localStorage.setItem('mapaProgress', JSON.stringify(updatedProgress));
  };

  const unlockLesson = (courseId: string, lessonId: string, studentId: string) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            return { ...lesson, isLocked: false };
          }
          return lesson;
        });
        return { ...course, lessons: updatedLessons };
      }
      return course;
    });

    setCourses(updatedCourses);
    localStorage.setItem('mapaCourses', JSON.stringify(updatedCourses));
  };

  const addAchievement = (achievementData: Omit<Achievement, 'id' | 'earnedAt'>) => {
    const newAchievement: Achievement = {
      ...achievementData,
      id: Date.now().toString(),
      earnedAt: new Date().toISOString()
    };

    const updatedAchievements = [...achievements, newAchievement];
    setAchievements(updatedAchievements);
    localStorage.setItem('mapaAchievements', JSON.stringify(updatedAchievements));
  };

  const getStudentCourses = (studentId: string) => {
    return courses.filter(course => course.studentIds.includes(studentId));
  };

  const getTeacherCourses = (teacherId: string) => {
    return courses.filter(course => course.teacherIds.includes(teacherId));
  };

  const getCourseProgress = (studentId: string, courseId: string) => {
    return studentProgress.filter(
      p => p.studentId === studentId && p.courseId === courseId
    );
  };

  return (
    <DataContext.Provider value={{
      courses,
      studentProgress,
      achievements,
      addCourse,
      updateCourse,
      deleteCourse,
      enrollStudent,
      updateProgress,
      unlockLesson,
      addAchievement,
      getStudentCourses,
      getTeacherCourses,
      getCourseProgress
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}