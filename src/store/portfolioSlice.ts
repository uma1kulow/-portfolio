import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioState {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  skills: Skill[];
  projects: Project[];
  socialLinks: SocialLink[];
  education: {
    institution: string;
    period: string;
    location: string;
  };
  languages: {
    name: string;
    level: string;
  }[];
  theme: 'light' | 'dark' | 'snow' | 'autumn' | 'rain';
}

const initialState: PortfolioState = {
  name: 'Umarkulov Ilyaz',
  title: 'Frontend Developer',
  subtitle: 'Web & Digital Specialist',
  bio: 'Специалист по веб-разработке с опытом создания современных сайтов и веб-приложений. Уверенно работаю с адаптивной вёрсткой, JavaScript и React, интеграцией API и UI-дизайном. Ответственный, быстро обучаюсь, умею работать по техническому заданию и в команде.',
  email: 'ilyaz@example.com',
  phone: '+996 XXX XXX XXX',
  location: 'Kyrgyzstan',
  education: {
    institution: 'Okurmen IT',
    period: '2025 - 2026',
    location: 'Okurmen, Kyrgyzstan',
  },
  skills: [
    { id: '1', name: 'HTML5', category: 'Frontend', level: 95 },
    { id: '2', name: 'CSS3', category: 'Frontend', level: 90 },
    { id: '3', name: 'JavaScript (ES6+)', category: 'Frontend', level: 90 },
    { id: '4', name: 'React', category: 'Frontend', level: 88 },
    { id: '5', name: 'Redux Toolkit', category: 'Frontend', level: 85 },
    { id: '6', name: 'TypeScript', category: 'Frontend', level: 85 },
    { id: '7', name: 'Next.js', category: 'Frontend', level: 80 },
    { id: '8', name: 'Node.js', category: 'Backend', level: 75 },
    { id: '9', name: 'REST API', category: 'Backend', level: 85 },
    { id: '10', name: 'Tailwind CSS', category: 'Styling', level: 92 },
    { id: '11', name: 'Material UI', category: 'Styling', level: 80 },
    { id: '12', name: 'Git / GitHub', category: 'Tools', level: 88 },
    { id: '13', name: 'npm', category: 'Tools', level: 90 },
    { id: '14', name: 'Vite', category: 'Tools', level: 88 },
    { id: '15', name: 'Figma', category: 'Design', level: 85 },
    { id: '16', name: 'Adobe XD', category: 'Design', level: 75 },
    { id: '17', name: 'Canva', category: 'Design', level: 80 },
    { id: '18', name: 'Photoshop', category: 'Design', level: 70 },
    { id: '19', name: 'After Effects', category: 'Design', level: 65 },
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with React and Redux',
      technologies: ['React', 'Redux', 'TypeScript', 'Tailwind'],
      link: '#',
      github: '#',
    },
    {
      id: '2',
      title: 'Dashboard App',
      description: 'Admin dashboard with data visualization',
      technologies: ['React', 'Chart.js', 'Material UI'],
      link: '#',
      github: '#',
    },
  ],
  socialLinks: [
    { id: '1', platform: 'GitHub', url: 'https://github.com', icon: 'github' },
    { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { id: '3', platform: 'Telegram', url: 'https://t.me', icon: 'telegram' },
    { id: '4', platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
  ],
  languages: [
    { name: 'English', level: 'Intermediate' },
    { name: 'Turkish', level: 'Fluent' },
    { name: 'Russian', level: 'Fluent' },
    { name: 'Kyrgyzcha', level: 'Native' },
    { name: 'Korean', level: 'Beginner' },
  ],
  theme: 'dark',
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<PortfolioState>>) => {
      return { ...state, ...action.payload };
    },
    setTheme: (state, action: PayloadAction<PortfolioState['theme']>) => {
      state.theme = action.payload;
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.skills.findIndex(s => s.id === action.payload.id);
      if (index !== -1) state.skills[index] = action.payload;
    },
    deleteSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(s => s.id !== action.payload);
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.projects[index] = action.payload;
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    addSocialLink: (state, action: PayloadAction<SocialLink>) => {
      state.socialLinks.push(action.payload);
    },
    updateSocialLink: (state, action: PayloadAction<SocialLink>) => {
      const index = state.socialLinks.findIndex(l => l.id === action.payload.id);
      if (index !== -1) state.socialLinks[index] = action.payload;
    },
    deleteSocialLink: (state, action: PayloadAction<string>) => {
      state.socialLinks = state.socialLinks.filter(l => l.id !== action.payload);
    },
    updateEducation: (state, action: PayloadAction<PortfolioState['education']>) => {
      state.education = action.payload;
    },
    updateLanguages: (state, action: PayloadAction<PortfolioState['languages']>) => {
      state.languages = action.payload;
    },
  },
});

export const {
  updateProfile,
  setTheme,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  updateEducation,
  updateLanguages,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
