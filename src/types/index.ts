// src/types/index.ts

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  shortBio: string;
  location: string;
  email: string;
  phone?: string;
  avatar: string;
  resumeUrl: string;
  availability: 'available' | 'busy' | 'not-available';
  yearsOfExperience: number;
  projectsCompleted: number;
  companiesWorked: number;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
  color?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: 'web' | 'mobile' | 'ai' | 'system' | 'devops' | 'other';
  techStack: string[];
  image: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  role: string;
  challenges?: string[];
  outcomes?: string[];
  startDate: string;
  endDate?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  companyUrl?: string;
  position: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  institutionLogo?: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  achievements?: string[];
  courses?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar?: string;
  content: string;
  rating?: number;
  linkedinUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  category: 'award' | 'certification' | 'publication' | 'speaking' | 'opensource' | 'other';
  url?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  username?: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  author: string;
  twitterHandle?: string;
  themeColor: string;
  googleAnalyticsId?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}