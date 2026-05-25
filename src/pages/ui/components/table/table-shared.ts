import { sampleUsers, type SampleUser } from '@/mocks/fixtures';

/** Extended row shape used across table gallery demos (flat datasets). */
export interface GalleryUser extends SampleUser {
  department: 'engineering' | 'design' | 'sales' | 'support';
}

const DEPARTMENTS: GalleryUser['department'][] = ['engineering', 'design', 'sales', 'support'];

const EXTRA: Omit<GalleryUser, 'id'>[] = [
  {
    name: 'Oliver Chen',
    email: 'oliver@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2024-04-12',
    streak: 14,
    points: 1850,
    department: 'engineering',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@tailtheme.test',
    role: 'instructor',
    status: 'active',
    joinedAt: '2024-06-01',
    streak: 22,
    points: 3200,
    department: 'design',
  },
  {
    name: 'Lucas Martin',
    email: 'lucas@tailtheme.test',
    role: 'student',
    status: 'invited',
    joinedAt: '2025-03-15',
    streak: 0,
    points: 120,
    department: 'sales',
  },
  {
    name: 'Mia Brown',
    email: 'mia@tailtheme.test',
    role: 'admin',
    status: 'active',
    joinedAt: '2023-11-20',
    streak: 60,
    points: 6200,
    department: 'engineering',
  },
  {
    name: 'James Taylor',
    email: 'james@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2024-08-08',
    streak: 9,
    points: 1100,
    department: 'support',
  },
  {
    name: 'Charlotte Davis',
    email: 'charlotte@tailtheme.test',
    role: 'student',
    status: 'suspended',
    joinedAt: '2024-02-14',
    streak: 0,
    points: 400,
    department: 'sales',
  },
  {
    name: 'Benjamin Moore',
    email: 'benjamin@tailtheme.test',
    role: 'instructor',
    status: 'active',
    joinedAt: '2024-01-10',
    streak: 45,
    points: 5100,
    department: 'engineering',
  },
  {
    name: 'Amelia Clark',
    email: 'amelia@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2025-01-05',
    streak: 11,
    points: 980,
    department: 'design',
  },
  {
    name: 'Henry Walker',
    email: 'henry@tailtheme.test',
    role: 'student',
    status: 'invited',
    joinedAt: '2025-03-20',
    streak: 1,
    points: 50,
    department: 'support',
  },
  {
    name: 'Isabella Hall',
    email: 'isabella@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2024-12-01',
    streak: 17,
    points: 2400,
    department: 'engineering',
  },
  {
    name: 'William Young',
    email: 'william@tailtheme.test',
    role: 'admin',
    status: 'active',
    joinedAt: '2023-05-18',
    streak: 90,
    points: 8900,
    department: 'sales',
  },
  {
    name: 'Harper King',
    email: 'harper@tailtheme.test',
    role: 'instructor',
    status: 'active',
    joinedAt: '2024-07-01',
    streak: 38,
    points: 4100,
    department: 'design',
  },
  {
    name: 'Jack Wright',
    email: 'jack@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2024-09-22',
    streak: 5,
    points: 650,
    department: 'support',
  },
  {
    name: 'Evelyn Lopez',
    email: 'evelyn@tailtheme.test',
    role: 'student',
    status: 'invited',
    joinedAt: '2025-03-25',
    streak: 0,
    points: 0,
    department: 'engineering',
  },
  {
    name: 'Daniel Hill',
    email: 'daniel@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2024-11-11',
    streak: 7,
    points: 880,
    department: 'sales',
  },
  {
    name: 'Abigail Scott',
    email: 'abigail@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2025-02-02',
    streak: 20,
    points: 3100,
    department: 'design',
  },
  {
    name: 'Matthew Green',
    email: 'matthew@tailtheme.test',
    role: 'instructor',
    status: 'suspended',
    joinedAt: '2024-04-30',
    streak: 0,
    points: 900,
    department: 'engineering',
  },
  {
    name: 'Emily Adams',
    email: 'emily@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2024-10-03',
    streak: 13,
    points: 1750,
    department: 'support',
  },
  {
    name: 'Joseph Baker',
    email: 'joseph@tailtheme.test',
    role: 'student',
    status: 'active',
    joinedAt: '2025-03-10',
    streak: 4,
    points: 520,
    department: 'sales',
  },
  {
    name: 'Elizabeth Nelson',
    email: 'elizabeth@tailtheme.test',
    role: 'admin',
    status: 'active',
    joinedAt: '2023-08-14',
    streak: 72,
    points: 7200,
    department: 'engineering',
  },
];

/** ~30 rows for filtering / pagination demos (extends fixtures with department). */
export const tableGalleryUsers: GalleryUser[] = [
  ...sampleUsers.map((u, i) => ({
    ...u,
    department: DEPARTMENTS[i % DEPARTMENTS.length],
  })),
  ...EXTRA.map((row, i) => ({
    ...row,
    id: `u-${11 + i}`,
  })),
];

/** Tree-shaped org data for sub-row expansion demos. */
export interface OrgRow {
  id: string;
  name: string;
  region: string;
  revenue: number;
  headcount: number;
  subRows?: OrgRow[];
}

export const orgTreeData: OrgRow[] = [
  {
    id: 'org-1',
    name: 'North America',
    region: 'NA',
    revenue: 4_200_000,
    headcount: 420,
    subRows: [
      {
        id: 'org-1-1',
        name: 'US East',
        region: 'NA-US-E',
        revenue: 2_100_000,
        headcount: 210,
        subRows: [
          { id: 'org-1-1-1', name: 'NYC Hub', region: 'NA-US-E', revenue: 900_000, headcount: 90 },
          {
            id: 'org-1-1-2',
            name: 'Boston Hub',
            region: 'NA-US-E',
            revenue: 1_200_000,
            headcount: 120,
          },
        ],
      },
      {
        id: 'org-1-2',
        name: 'US West',
        region: 'NA-US-W',
        revenue: 1_800_000,
        headcount: 150,
      },
      {
        id: 'org-1-3',
        name: 'Canada',
        region: 'NA-CA',
        revenue: 300_000,
        headcount: 60,
      },
    ],
  },
  {
    id: 'org-2',
    name: 'EMEA',
    region: 'EU',
    revenue: 3_100_000,
    headcount: 310,
    subRows: [
      {
        id: 'org-2-1',
        name: 'UK & Ireland',
        region: 'EU-UK',
        revenue: 1_400_000,
        headcount: 140,
      },
      {
        id: 'org-2-2',
        name: 'DACH',
        region: 'EU-DACH',
        revenue: 1_700_000,
        headcount: 170,
      },
    ],
  },
  {
    id: 'org-3',
    name: 'APAC',
    region: 'APAC',
    revenue: 2_400_000,
    headcount: 280,
    subRows: [
      { id: 'org-3-1', name: 'Japan', region: 'APAC-JP', revenue: 1_100_000, headcount: 110 },
      { id: 'org-3-2', name: 'Australia', region: 'APAC-AU', revenue: 800_000, headcount: 95 },
      { id: 'org-3-3', name: 'Singapore', region: 'APAC-SG', revenue: 500_000, headcount: 75 },
    ],
  },
];

/** Manual pivot-style dataset: regions as rows, categories as numeric columns. */
export interface PivotSaleRow {
  region: string;
  electronics: number;
  apparel: number;
  food: number;
}

export const pivotSaleRows: PivotSaleRow[] = [
  { region: 'North America', electronics: 420_000, apparel: 310_000, food: 180_000 },
  { region: 'EMEA', electronics: 290_000, apparel: 240_000, food: 120_000 },
  { region: 'APAC', electronics: 380_000, apparel: 190_000, food: 210_000 },
  { region: 'LATAM', electronics: 150_000, apparel: 95_000, food: 85_000 },
];
