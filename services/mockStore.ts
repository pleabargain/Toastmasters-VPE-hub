
import { Member, Meeting, MeetingRole, EducationalAchievement, ActivityLog } from '../types';

const STORAGE_KEYS = {
  MEMBERS: 'tm_members',
  MEETINGS: 'tm_meetings',
  ROLES: 'tm_meeting_roles',
  ACHIEVEMENTS: 'tm_achievements',
  LOGS: 'tm_logs'
};

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'user_1',
    name: 'Admin VPE',
    email: 'vpe@toastmasters.org',
    toastmastersId: '0000001',
    currentPath: 'Dynamic Leadership',
    currentLevel: 2,
    mentorName: 'None',
    joinedAt: '2022-01-01',
    role: 'VPE',
    mfaEnabled: true
  },
  {
    id: 'user_2',
    name: 'John Doe',
    email: 'john@example.com',
    toastmastersId: '1234567',
    currentPath: 'Presentation Mastery',
    currentLevel: 1,
    mentorName: 'Admin VPE',
    joinedAt: '2023-06-15',
    role: 'MEMBER',
    mfaEnabled: false
  }
];

const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'meet_1',
    date: '2024-05-20',
    theme: 'Embracing Change',
    toastmasterOfTheDay: 'Jane Smith',
    meetingStatus: 'Scheduled',
    createdAt: new Date().toISOString()
  },
  {
    id: 'meet_2',
    date: '2024-05-13',
    theme: 'Public Speaking Secrets',
    toastmasterOfTheDay: 'John Doe',
    meetingStatus: 'Completed',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_ACHIEVEMENTS: EducationalAchievement[] = [
  {
    id: 'ach_1',
    userId: 'user_2',
    awardType: 'Level 1',
    pathName: 'Presentation Mastery',
    completionDate: '2023-12-01',
    verifiedByVPE: true
  },
  {
    id: 'ach_2',
    userId: 'user_1',
    awardType: 'Level 1',
    pathName: 'Dynamic Leadership',
    completionDate: '2022-06-01',
    verifiedByVPE: true
  },
  {
    id: 'ach_3',
    userId: 'user_1',
    awardType: 'Level 2',
    pathName: 'Dynamic Leadership',
    completionDate: '2023-01-15',
    verifiedByVPE: true
  }
];

class MockStore {
  private getData<T>(key: string, initial: T[]): T[] {
    const saved = localStorage.getItem(key);
    if (!saved) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(saved);
  }

  private saveData<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Members
  getMembers(): Member[] { return this.getData(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS); }
  
  updateMember(member: Member) {
    this.saveMember(member);
  }

  saveMember(member: Member) {
    const members = this.getMembers();
    const index = members.findIndex(m => m.id === member.id);
    if (index > -1) {
      members[index] = member;
    } else {
      members.push(member);
    }
    this.saveData(STORAGE_KEYS.MEMBERS, members);
  }

  deleteMember(id: string) {
    const members = this.getMembers();
    const filtered = members.filter(m => m.id !== id);
    this.saveData(STORAGE_KEYS.MEMBERS, filtered);
  }

  // Meetings
  getMeetings(): Meeting[] { return this.getData(STORAGE_KEYS.MEETINGS, INITIAL_MEETINGS); }
  saveMeeting(meeting: Meeting) {
    const meetings = this.getMeetings();
    const index = meetings.findIndex(m => m.id === meeting.id);
    if (index > -1) meetings[index] = meeting;
    else meetings.push(meeting);
    this.saveData(STORAGE_KEYS.MEETINGS, meetings);
  }

  // Meeting Roles
  getRoles(): MeetingRole[] { return this.getData(STORAGE_KEYS.ROLES, []); }
  saveRole(role: MeetingRole): { success: boolean, message: string } {
    const roles = this.getRoles();
    const meetings = this.getMeetings();
    const meeting = meetings.find(m => m.id === role.meetingId);

    // Business Rule: Meeting Integrity
    if (meeting?.meetingStatus === 'Completed') {
      return { success: false, message: 'Cannot edit roles for a completed meeting.' };
    }

    // Business Rule: Role Uniqueness
    const alreadySignedUp = roles.find(r => r.meetingId === role.meetingId && r.userId === role.userId && r.id !== role.id);
    if (alreadySignedUp) {
      return { success: false, message: 'You are already signed up for a role in this meeting.' };
    }

    const index = roles.findIndex(r => r.id === role.id);
    if (index > -1) roles[index] = role;
    else roles.push(role);
    this.saveData(STORAGE_KEYS.ROLES, roles);
    return { success: true, message: 'Role saved successfully.' };
  }

  deleteRole(roleId: string): { success: boolean, message: string } {
    const roles = this.getRoles();
    const role = roles.find(r => r.id === roleId);
    if (!role) return { success: false, message: 'Role not found.' };

    const meetings = this.getMeetings();
    const meeting = meetings.find(m => m.id === role.meetingId);
    if (meeting?.meetingStatus === 'Completed') {
      return { success: false, message: 'Cannot delete roles for a completed meeting.' };
    }

    const filtered = roles.filter(r => r.id !== roleId);
    this.saveData(STORAGE_KEYS.ROLES, filtered);
    return { success: true, message: 'Role deleted.' };
  }

  // Achievements
  getAchievements(): EducationalAchievement[] { return this.getData(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS); }
  saveAchievement(achievement: EducationalAchievement): { success: boolean, message: string } {
    const achievements = this.getAchievements();
    
    // Business Rule: Level Sequencing
    const levelNum = parseInt(achievement.awardType.replace(/\D/g, ''));
    if (levelNum > 1) {
      const prevLevel = `Level ${levelNum - 1}`;
      const hasPrev = achievements.some(a => a.userId === achievement.userId && a.awardType === prevLevel && a.verifiedByVPE);
      if (!hasPrev) {
        return { success: false, message: `Cannot log ${achievement.awardType} until ${prevLevel} is completed and verified.` };
      }
    }

    const index = achievements.findIndex(a => a.id === achievement.id);
    if (index > -1) achievements[index] = achievement;
    else achievements.push(achievement);
    this.saveData(STORAGE_KEYS.ACHIEVEMENTS, achievements);

    // Data Integrity: Update member currentLevel if verified
    if (achievement.verifiedByVPE) {
      const members = this.getMembers();
      const member = members.find(m => m.id === achievement.userId);
      if (member && levelNum > member.currentLevel) {
        member.currentLevel = levelNum;
        this.saveMember(member);
      }
    }

    return { success: true, message: 'Achievement logged.' };
  }

  // Logs
  getLogs(): ActivityLog[] { return this.getData(STORAGE_KEYS.LOGS, []); }
  logAction(userId: string, userName: string, action: string) {
    const logs = this.getLogs();
    logs.push({
      id: Math.random().toString(36).substr(2, 9),
      userId,
      userName,
      action,
      timestamp: new Date().toISOString()
    });
    this.saveData(STORAGE_KEYS.LOGS, logs);
  }
}

export const store = new MockStore();
