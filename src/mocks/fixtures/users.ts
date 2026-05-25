export interface SampleUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  avatarUrl?: string;
  status: 'active' | 'invited' | 'suspended';
  joinedAt: string;
  streak: number;
  points: number;
}

export const sampleUsers: SampleUser[] = [
  {
    id: 'u-1',
    name: 'Alex Nguyen',
    email: 'alex@tailtheme.test',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-03-15',
    streak: 27,
    points: 4120,
  },
  {
    id: 'u-2',
    name: 'Maria Garcia',
    email: 'maria@tailtheme.test',
    role: 'instructor',
    status: 'active',
    joinedAt: '2024-05-02',
    streak: 41,
    points: 3890,
  },
  {
    id: 'u-3',
    name: 'Hiro Tanaka',
    email: 'hiro@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2025-01-20',
    streak: 12,
    points: 2650,
  },
  {
    id: 'u-4',
    name: 'Priya Patel',
    email: 'priya@tailtheme.test',
    role: 'student',
    status: 'invited',
    joinedAt: '2025-02-11',
    streak: 3,
    points: 380,
  },
  {
    id: 'u-5',
    name: 'Liam Johnson',
    email: 'liam@tailtheme.test',
    role: 'student',
    status: 'suspended',
    joinedAt: '2024-11-08',
    streak: 0,
    points: 1210,
  },
  {
    id: 'u-6',
    name: 'Aisha Khan',
    email: 'aisha@tailtheme.test',
    role: 'instructor',
    status: 'active',
    joinedAt: '2024-07-22',
    streak: 55,
    points: 5400,
  },
  {
    id: 'u-7',
    name: 'Noah Smith',
    email: 'noah@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2025-03-01',
    streak: 8,
    points: 940,
  },
  {
    id: 'u-8',
    name: 'Sofia Rossi',
    email: 'sofia@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2024-10-15',
    streak: 19,
    points: 2200,
  },
  {
    id: 'u-9',
    name: 'Ethan Lee',
    email: 'ethan@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2025-02-28',
    streak: 6,
    points: 720,
  },
  {
    id: 'u-10',
    name: 'Layla Ahmed',
    email: 'layla@tailtheme.test',
    role: 'instructor',
    status: 'active',
    joinedAt: '2024-09-05',
    streak: 33,
    points: 4600,
  },
];
