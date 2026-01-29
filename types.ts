
export type UserRole = 'MEMBER' | 'VPE';

export interface Member {
  id: string;
  name: string;
  email: string;
  toastmastersId: string;
  currentPath: string;
  currentLevel: number;
  mentorName: string;
  joinedAt: string;
  role: UserRole;
  mfaEnabled: boolean;
}

export type MeetingStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Meeting {
  id: string;
  date: string;
  theme: string;
  toastmasterOfTheDay: string;
  zoomLink?: string;
  meetingStatus: MeetingStatus;
  createdAt: string;
}

export interface MeetingRole {
  id: string;
  meetingId: string;
  userId: string;
  roleName: string;
  speechTitle?: string;
  projectManual?: string;
}

export interface EducationalAchievement {
  id: string;
  userId: string;
  awardType: string; // e.g., "Level 1", "Level 2", etc.
  completionDate: string;
  verifiedByVPE: boolean;
  pathName: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
}

export interface AuthState {
  user: Member | null;
  isAuthenticated: boolean;
}
