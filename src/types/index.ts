import { ReactElement } from 'react';

export interface CareerEvent {
  title: string;
  description: string;
  company?: string;
  location?: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  type: 'mobile' | 'desktop';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  distance?: string;
  origin?: 'top' | 'bottom' | 'left' | 'right';
}

export type LoaderType = 'curtain' | 'elegant' | 'minimalist';

export interface MousePosition {
  x: number;
  y: number;
}

export type LoadingStage = 'initial' | 'loading' | 'complete';

export interface IconMap {
  [key: string]: ReactElement;
}

export interface Service {
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}
