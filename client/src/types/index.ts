export interface Project {
  id: number;
  title: string;
  category: string;
  confidential: boolean;
  challenge: string;
  outcome: string;
  metrics: string[];
  technologies: string[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  color: string;
}

export interface ExperienceItem {
  id: number;
  organization: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  organization: string;
  initials: string;
  color: string;
}

export interface TechGroup {
  id: number;
  category: string;
  items: string[];
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}
