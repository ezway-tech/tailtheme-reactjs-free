export interface SampleLesson {
  id: string;
  title: string;
  durationMinutes: number;
  completed?: boolean;
}

export interface SampleCourse {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: string;
  instructorAvatar?: string;
  coverColor: string;
  rating: number;
  learners: number;
  lessons: SampleLesson[];
  progress: number;
}

export const sampleCourses: SampleCourse[] = [
  {
    id: '1',
    title: 'Advanced TypeScript for React',
    description:
      'Master generics, conditional types, and advanced patterns used in modern React codebases.',
    level: 'advanced',
    category: 'Programming',
    instructor: 'Maria Garcia',
    coverColor: '205 70% 37%',
    rating: 4.8,
    learners: 1342,
    progress: 62,
    lessons: [
      { id: 'l-1-1', title: 'Generics primer', durationMinutes: 18, completed: true },
      { id: 'l-1-2', title: 'Conditional types', durationMinutes: 22, completed: true },
      { id: 'l-1-3', title: 'Template literal types', durationMinutes: 25, completed: true },
      { id: 'l-1-4', title: 'Discriminated unions', durationMinutes: 30 },
      { id: 'l-1-5', title: 'Infer and utility types', durationMinutes: 28 },
      { id: 'l-1-6', title: 'Advanced React generics', durationMinutes: 35 },
    ],
  },
  {
    id: '2',
    title: 'Design Systems with Tailwind CSS',
    description: 'Build a scalable design system from tokens to production-ready components.',
    level: 'intermediate',
    category: 'Design',
    instructor: 'Aisha Khan',
    coverColor: '262 72% 52%',
    rating: 4.7,
    learners: 2104,
    progress: 30,
    lessons: [
      { id: 'l-2-1', title: 'Token architecture', durationMinutes: 20, completed: true },
      { id: 'l-2-2', title: 'Semantic tokens', durationMinutes: 22 },
      { id: 'l-2-3', title: 'Dark mode strategy', durationMinutes: 18 },
      { id: 'l-2-4', title: 'Component variants with CVA', durationMinutes: 30 },
    ],
  },
  {
    id: '3',
    title: 'E-learning UX Foundations',
    description: 'Principles for designing engaging, accessible learning experiences.',
    level: 'beginner',
    category: 'UX',
    instructor: 'Layla Ahmed',
    coverColor: '16 86% 54%',
    rating: 4.9,
    learners: 3210,
    progress: 0,
    lessons: [
      { id: 'l-3-1', title: 'Learner personas', durationMinutes: 15 },
      { id: 'l-3-2', title: 'Cognitive load', durationMinutes: 20 },
      { id: 'l-3-3', title: 'Accessibility in learning', durationMinutes: 25 },
      { id: 'l-3-4', title: 'Assessment patterns', durationMinutes: 22 },
      { id: 'l-3-5', title: 'Motivation & streaks', durationMinutes: 18 },
    ],
  },
  {
    id: '4',
    title: 'React Performance Deep Dive',
    description: 'Profile, memoize and split bundles. Ship fast React apps at scale.',
    level: 'advanced',
    category: 'Programming',
    instructor: 'Alex Nguyen',
    coverColor: '160 72% 36%',
    rating: 4.6,
    learners: 890,
    progress: 0,
    lessons: [
      { id: 'l-4-1', title: 'Profiling tools', durationMinutes: 25 },
      { id: 'l-4-2', title: 'Memoization tactics', durationMinutes: 30 },
      { id: 'l-4-3', title: 'Virtualization', durationMinutes: 28 },
      { id: 'l-4-4', title: 'Bundle splitting', durationMinutes: 26 },
    ],
  },
  {
    id: '5',
    title: 'Form Validation with Zod',
    description: 'End-to-end validation using Zod + react-hook-form, including async rules.',
    level: 'intermediate',
    category: 'Programming',
    instructor: 'Hiro Tanaka',
    coverColor: '350 82% 55%',
    rating: 4.5,
    learners: 1210,
    progress: 100,
    lessons: [
      { id: 'l-5-1', title: 'Zod basics', durationMinutes: 15, completed: true },
      { id: 'l-5-2', title: 'Schemas & inference', durationMinutes: 22, completed: true },
      { id: 'l-5-3', title: 'RHF resolver', durationMinutes: 18, completed: true },
      { id: 'l-5-4', title: 'Async validation', durationMinutes: 24, completed: true },
    ],
  },
  {
    id: '6',
    title: 'Accessibility Essentials',
    description: 'WCAG, keyboard flows, screen readers, focus management and testing.',
    level: 'beginner',
    category: 'Accessibility',
    instructor: 'Aisha Khan',
    coverColor: '22 92% 53%',
    rating: 4.9,
    learners: 2750,
    progress: 18,
    lessons: [
      { id: 'l-6-1', title: 'WCAG at a glance', durationMinutes: 18 },
      { id: 'l-6-2', title: 'Semantic HTML', durationMinutes: 22, completed: true },
      { id: 'l-6-3', title: 'Focus management', durationMinutes: 25 },
      { id: 'l-6-4', title: 'Screen readers', durationMinutes: 28 },
    ],
  },
];

export function findCourse(id: string): SampleCourse | undefined {
  return sampleCourses.find((c) => c.id === id);
}
