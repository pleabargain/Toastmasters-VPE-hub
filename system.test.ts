import { describe, it, expect, beforeEach } from 'vitest';
import { store } from './services/mockStore';
import { EducationalAchievement, MeetingRole } from './types';

describe('Toastmasters VPE System Core Logic', () => {
    beforeEach(() => {
        // Reset localStorage if needed, but mockStore uses it as a singleton.
        // For these tests, we rely on the initial state or state from previous tests.
        localStorage.clear();
    });

    it('should have initial members data on startup', () => {
        const members = store.getMembers();
        expect(members.length).toBeGreaterThan(0);
        expect(members.some(m => m.role === 'VPE')).toBe(true);
    });

    it('should enforce level sequencing (Level 3 requires Level 2)', () => {
        // Add Level 1 verified achievement for user_2
        const level1: EducationalAchievement = {
            id: 'ach_1',
            userId: 'user_2',
            awardType: 'Level 1',
            pathName: 'Presentation Mastery',
            completionDate: '2023-01-01',
            verifiedByVPE: true
        };
        store.saveAchievement(level1);

        const level3: EducationalAchievement = {
            id: 'ach_3',
            userId: 'user_2',
            awardType: 'Level 3',
            pathName: 'Presentation Mastery',
            completionDate: '2024-01-01',
            verifiedByVPE: false
        };

        const result = store.saveAchievement(level3);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Level 2 is completed');
    });

    it('should block double signup in same meeting (Role Uniqueness)', () => {
        const role1: MeetingRole = {
            id: 'role_a',
            meetingId: 'meet_1',
            userId: 'user_2',
            roleName: 'Speaker'
        };
        const role2: MeetingRole = {
            id: 'role_b',
            meetingId: 'meet_1',
            userId: 'user_2',
            roleName: 'Ah-Counter'
        };

        store.saveRole(role1);
        const result = store.saveRole(role2);
        expect(result.success).toBe(false);
        expect(result.message).toContain('already signed up');
    });

    it('should block edits to completed meetings (Meeting Integrity)', () => {
        // meet_2 is initially completed in mock data
        const role: MeetingRole = {
            id: 'role_x',
            meetingId: 'meet_2',
            userId: 'user_2',
            roleName: 'Timer'
        };

        const result = store.saveRole(role);
        expect(result.success).toBe(false);
        expect(result.message).toContain('completed meeting');
    });
});
