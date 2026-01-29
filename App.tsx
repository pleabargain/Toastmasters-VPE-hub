
import React, { useState, useEffect, useCallback } from 'react';
// Added MeetingStatus to the imports from ./types
import { Member, AuthState, Meeting, MeetingRole, EducationalAchievement, ActivityLog, MeetingStatus } from './types';
import { store } from './services/mockStore';
import { COLORS, PATHS, ROLES, StatusBadge } from './constants';
import { 
  Users, 
  Calendar, 
  Award, 
  BarChart3, 
  LogOut, 
  Plus, 
  ChevronRight, 
  UserCircle,
  ShieldCheck,
  History,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Key,
  Fingerprint,
  CloudDownload,
  MoreVertical,
  Mail,
  UserPlus
} from 'lucide-react';

// --- Views ---

const Login: React.FC<{ onLogin: (m: Member) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const members = store.getMembers();
    const user = members.find(m => m.email === email);
    
    if (user) {
      if (user.mfaEnabled && !showMFA) {
        setShowMFA(true);
        return;
      }
      onLogin(user);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-tmMaroon mx-auto rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Toastmasters VPE Hub</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to manage your club's education</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {!showMFA ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-400 bg-white text-slate-900 focus:ring-2 focus:ring-tmRoyalBlue focus:border-tmRoyalBlue outline-none transition-all font-medium placeholder:text-slate-400"
                placeholder="vpe@club.org"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-400 bg-white text-slate-900 focus:ring-2 focus:ring-tmRoyalBlue focus:border-tmRoyalBlue outline-none transition-all font-medium placeholder:text-slate-400"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full py-3 bg-tmMaroon text-white font-bold rounded-lg hover:opacity-90 transition-opacity mt-4 shadow-lg shadow-tmMaroon/20">
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-50 text-tmRoyalBlue rounded-full">
                <Fingerprint size={32} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Two-Factor Auth</h2>
            <p className="text-slate-600 text-sm mb-4">MFA is enabled for this account. Please enter any 6-digit code to continue.</p>
            <div className="flex justify-center gap-2">
              <input 
                type="text" 
                maxLength={6}
                className="w-40 text-center text-2xl tracking-widest font-mono py-3 rounded-lg border-2 border-slate-400 bg-white text-slate-900 focus:ring-2 focus:ring-tmRoyalBlue outline-none"
                placeholder="000000"
                value={mfaCode}
                onChange={e => setMfaCode(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="w-full py-3 bg-tmRoyalBlue text-white font-bold rounded-lg hover:opacity-90 transition-opacity mt-4 shadow-lg shadow-tmRoyalBlue/20">
              Verify & Log In
            </button>
            <button onClick={() => setShowMFA(false)} className="text-slate-500 text-sm hover:underline mt-2">
              Back to Login
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3 text-slate-400">
            <Key size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Test Credentials</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-tmMaroon uppercase">VPE Administrator</span>
                <span className="text-[10px] text-slate-400">MFA Required</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Email: <span className="text-slate-800">vpe@toastmasters.org</span></p>
              <p className="text-[10px] text-slate-400 mt-1 italic">Use any password and any 6-digit MFA code</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-tmRoyalBlue uppercase">Standard Member</span>
                <span className="text-[10px] text-slate-400 font-medium italic">No MFA</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Email: <span className="text-slate-800">john@example.com</span></p>
              <p className="text-[10px] text-slate-400 mt-1 italic">Use any password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Components ---

const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-tmRoyalBlue text-white shadow-lg shadow-tmRoyalBlue/20' 
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-slate-400'}`}>{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

// --- View: Dashboard ---
const Dashboard: React.FC<{ user: Member }> = ({ user }) => {
  const [stats, setStats] = useState({ members: 0, meetings: 0, achievements: 0 });

  useEffect(() => {
    setStats({
      members: store.getMembers().length,
      meetings: store.getMeetings().length,
      achievements: store.getAchievements().filter(a => a.verifiedByVPE).length
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Welcome, {user.name}!</h2>
        <p className="text-slate-500">Here's an overview of your Toastmasters club progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-tmRoyalBlue rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">{stats.members}</div>
            <div className="text-sm text-slate-500">Active Members</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">{stats.meetings}</div>
            <div className="text-sm text-slate-500">Total Meetings</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">{stats.achievements}</div>
            <div className="text-sm text-slate-500">Verified Awards</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Award className="text-tmMaroon" size={20} /> Your Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 font-medium">{user.currentPath}</span>
                <span className="text-slate-800 font-bold">Level {user.currentLevel}/5</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-tmMaroon h-full transition-all duration-1000" 
                  style={{ width: `${(user.currentLevel / 5) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-400">Next step: Complete Level {user.currentLevel + 1} project speech and request verification.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <History className="text-tmRoyalBlue" size={20} /> Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 text-left border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="text-sm font-semibold text-slate-700">Sign Up for Role</div>
              <div className="text-xs text-slate-400">Upcoming meetings</div>
            </button>
            <button className="p-3 text-left border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="text-sm font-semibold text-slate-700">Submit Award</div>
              <div className="text-xs text-slate-400">Level completion</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- View: Members Management ---
const MembersView: React.FC<{ user: Member }> = ({ user }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: 'info' });

  const refreshData = useCallback(() => {
    setMembers(store.getMembers());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleImportDrive = async () => {
    setIsImporting(true);
    setMsg({ text: 'Connecting to Google Drive API...', type: 'info' });
    
    // Simulate real-world network delay for senior UX feel
    await new Promise(r => setTimeout(r, 1200));
    setMsg({ text: 'Syncing Member_Roster_2024.xlsx...', type: 'info' });
    await new Promise(r => setTimeout(r, 1000));

    // Mock new members from "Drive"
    const mockNewMember: Member = {
      id: `user_${Date.now()}`,
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.org',
      toastmastersId: '9876543',
      currentPath: 'Visionary Communication',
      currentLevel: 1,
      mentorName: 'Admin VPE',
      joinedAt: new Date().toISOString().split('T')[0],
      role: 'MEMBER',
      mfaEnabled: false
    };

    store.saveMember(mockNewMember);
    store.logAction(user.id, user.name, `Imported Sarah Jenkins from Google Drive roster`);
    
    setIsImporting(false);
    setMsg({ text: 'Roster synchronized successfully. Added 1 new member.', type: 'success' });
    refreshData();
    setTimeout(() => setMsg({ text: '', type: 'info' }), 4000);
  };

  const handleAddMember = () => {
    // For prototype purposes, we'll just add a mock member
    const newM: Member = {
      id: `user_${Date.now()}`,
      name: 'New Member ' + (members.length + 1),
      email: `member${members.length + 1}@club.org`,
      toastmastersId: 'TEMP-' + Math.floor(Math.random() * 10000),
      currentPath: PATHS[0],
      currentLevel: 1,
      mentorName: user.name,
      joinedAt: new Date().toISOString().split('T')[0],
      role: 'MEMBER',
      mfaEnabled: false
    };
    store.saveMember(newM);
    store.logAction(user.id, user.name, `Manually added ${newM.name} to roster`);
    refreshData();
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this member? This cannot be undone.')) {
      const member = members.find(m => m.id === id);
      store.deleteMember(id);
      store.logAction(user.id, user.name, `Removed ${member?.name} from club roster`);
      refreshData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Member Directory</h2>
          <p className="text-sm text-slate-500">Manage club roster and educational status.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleImportDrive}
            disabled={isImporting}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            {isImporting ? <div className="w-4 h-4 border-2 border-tmRoyalBlue border-t-transparent animate-spin rounded-full" /> : <CloudDownload size={18} className="text-tmRoyalBlue" />}
            Import from Drive
          </button>
          <button 
            onClick={handleAddMember}
            className="flex items-center gap-2 bg-tmMaroon text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-tmMaroon/10 active:scale-95"
          >
            <UserPlus size={18} />
            Add Member
          </button>
        </div>
      </div>

      {msg.text && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700 border border-green-100'}`}>
          <CheckCircle2 size={20} />
          {msg.text}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Education Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-tmRoyalBlue/10 text-tmRoyalBlue rounded-xl flex items-center justify-center font-bold text-sm">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{m.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: {m.toastmastersId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700">{m.currentPath}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-[10px] font-bold text-tmMaroon px-2 py-0.5 bg-tmMaroon/5 rounded-full">LEVEL {m.currentLevel}</div>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-tmMaroon" style={{ width: `${(m.currentLevel / 5) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Mail size={14} className="text-slate-300" />
                      {m.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-tmRoyalBlue transition-colors rounded-lg hover:bg-tmRoyalBlue/5">
                        <UserCircle size={18} />
                      </button>
                      {m.role !== 'VPE' && (
                        <button 
                          onClick={() => handleDeleteMember(m.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- View: Meetings ---
const MeetingsView: React.FC<{ user: Member }> = ({ user }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [meetingRoles, setMeetingRoles] = useState<MeetingRole[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: 'info' });

  const refreshData = useCallback(() => {
    setMeetings(store.getMeetings());
    setMembers(store.getMembers());
    setMeetingRoles(store.getRoles());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleRoleSignup = (roleName: string) => {
    if (!selectedMeeting) return;
    
    const newRole: MeetingRole = {
      id: Math.random().toString(36).substr(2, 9),
      meetingId: selectedMeeting.id,
      userId: user.id,
      roleName: roleName,
    };

    const result = store.saveRole(newRole);
    if (result.success) {
      setMsg({ text: result.message, type: 'success' });
      store.logAction(user.id, user.name, `Signed up for ${roleName} at ${selectedMeeting.date}`);
      refreshData();
    } else {
      setMsg({ text: result.message, type: 'error' });
    }
    setTimeout(() => setMsg({ text: '', type: 'info' }), 3000);
  };

  const handleDeleteRole = (roleId: string) => {
    const result = store.deleteRole(roleId);
    if (result.success) {
      setMsg({ text: 'Withdrawn from role.', type: 'info' });
      refreshData();
    } else {
      setMsg({ text: result.message, type: 'error' });
    }
  };

  const updateMeetingStatus = (status: MeetingStatus) => {
    if (!selectedMeeting || user.role !== 'VPE') return;
    const updated = { ...selectedMeeting, meetingStatus: status };
    store.saveMeeting(updated);
    setSelectedMeeting(updated);
    refreshData();
  };

  return (
    <div className="space-y-6">
      {selectedMeeting ? (
        <div className="space-y-6">
          <button onClick={() => setSelectedMeeting(null)} className="text-slate-500 flex items-center gap-1 text-sm hover:text-tmRoyalBlue">
            ← Back to Meetings
          </button>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="flex justify-between items-start mb-6">
              <div>
                <StatusBadge status={selectedMeeting.meetingStatus} />
                <h2 className="text-3xl font-bold text-slate-800 mt-2">{selectedMeeting.theme}</h2>
                <p className="text-slate-500 font-medium">{new Date(selectedMeeting.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
              </div>
              {user.role === 'VPE' && (
                <div className="flex gap-2">
                  <select 
                    className="text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-tmRoyalBlue"
                    value={selectedMeeting.meetingStatus}
                    onChange={(e) => updateMeetingStatus(e.target.value as MeetingStatus)}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              )}
            </div>

            {msg.text && (
              <div className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-3 animate-pulse ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {msg.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                {msg.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 border-b pb-2">Agenda Roles</h3>
                {ROLES.map(role => {
                  const roleAssignment = meetingRoles.find(r => r.meetingId === selectedMeeting.id && r.roleName === role);
                  const assignedMember = roleAssignment ? members.find(m => m.id === roleAssignment.userId) : null;

                  return (
                    <div key={role} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <div className="text-xs font-bold uppercase text-slate-400">{role}</div>
                        <div className="text-sm font-semibold text-slate-700">
                          {assignedMember ? assignedMember.name : <span className="text-slate-300 italic">Unassigned</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!assignedMember && selectedMeeting.meetingStatus !== 'Completed' && (
                          <button 
                            onClick={() => handleRoleSignup(role)}
                            className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-tmRoyalBlue hover:text-tmRoyalBlue transition-colors shadow-sm"
                          >
                            Sign Up
                          </button>
                        )}
                        {assignedMember?.id === user.id && selectedMeeting.meetingStatus !== 'Completed' && (
                          <button 
                            onClick={() => handleDeleteRole(roleAssignment!.id)}
                            className="text-xs text-red-500 bg-white border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 border-b pb-2">Meeting Details</h3>
                <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Toastmaster of the Day</label>
                    <div className="text-slate-800 font-medium">{selectedMeeting.toastmasterOfTheDay}</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Zoom/Location</label>
                    <div className="text-tmRoyalBlue hover:underline cursor-pointer font-medium">{selectedMeeting.zoomLink || "Physical Meeting Hall"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Meetings</h2>
            {user.role === 'VPE' && (
              <button 
                onClick={() => {
                  const newM: Meeting = {
                    id: Math.random().toString(36).substr(2, 9),
                    date: new Date().toISOString().split('T')[0],
                    theme: 'New Theme',
                    toastmasterOfTheDay: user.name,
                    meetingStatus: 'Scheduled',
                    createdAt: new Date().toISOString()
                  };
                  store.saveMeeting(newM);
                  refreshData();
                }}
                className="bg-tmMaroon text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <Plus size={18} /> New Meeting
              </button>
            )}
          </div>
          <div className="grid gap-4">
            {meetings.map(m => (
              <div 
                key={m.id} 
                onClick={() => setSelectedMeeting(m)}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center cursor-pointer hover:border-tmRoyalBlue/30 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={m.meetingStatus} />
                    <span className="text-slate-400 text-sm font-medium">{m.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mt-1">{m.theme}</h3>
                  <div className="text-sm text-slate-500">TM of the Day: {m.toastmasterOfTheDay}</div>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-tmRoyalBlue group-hover:text-white transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- View: Progress/Awards ---
const ProgressView: React.FC<{ user: Member }> = ({ user }) => {
  const [achievements, setAchievements] = useState<EducationalAchievement[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: 'info' });

  const refreshData = useCallback(() => {
    setAchievements(store.getAchievements());
    setMembers(store.getMembers());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleSubmitAward = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const awardType = formData.get('awardType') as string;
    const pathName = formData.get('pathName') as string;

    const newAch: EducationalAchievement = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      awardType,
      pathName,
      completionDate: new Date().toISOString().split('T')[0],
      verifiedByVPE: false
    };

    const result = store.saveAchievement(newAch);
    if (result.success) {
      setMsg({ text: 'Award submitted for VPE verification.', type: 'success' });
      store.logAction(user.id, user.name, `Submitted ${awardType} for verification`);
      refreshData();
    } else {
      setMsg({ text: result.message, type: 'error' });
    }
  };

  const handleVerifyAward = (ach: EducationalAchievement) => {
    const updated = { ...ach, verifiedByVPE: true };
    const result = store.saveAchievement(updated);
    if (result.success) {
      setMsg({ text: 'Award verified!', type: 'success' });
      store.logAction(user.id, user.name, `Verified ${ach.awardType} for ${members.find(m => m.id === ach.userId)?.name}`);
      refreshData();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Award className="text-tmMaroon" /> Award History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Award</th>
                  <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Path</th>
                  {user.role === 'VPE' && <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Member</th>}
                  <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Date</th>
                  <th className="pb-3 text-xs font-bold text-slate-400 uppercase text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {achievements
                  .filter(a => user.role === 'VPE' || a.userId === user.id)
                  .sort((a,b) => new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime())
                  .map(a => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-semibold text-slate-700">{a.awardType}</td>
                    <td className="py-4 text-sm text-slate-500">{a.pathName}</td>
                    {user.role === 'VPE' && (
                      <td className="py-4 text-sm text-slate-700 font-medium">
                        {members.find(m => m.id === a.userId)?.name || 'Unknown'}
                      </td>
                    )}
                    <td className="py-4 text-sm text-slate-500">{a.completionDate}</td>
                    <td className="py-4">
                      <div className="flex justify-center">
                        {a.verifiedByVPE ? (
                          <span className="flex items-center gap-1 text-green-600 font-bold text-xs">
                            <CheckCircle2 size={14} /> VERIFIED
                          </span>
                        ) : user.role === 'VPE' ? (
                          <button 
                            onClick={() => handleVerifyAward(a)}
                            className="text-xs bg-tmRoyalBlue text-white px-2 py-1 rounded hover:opacity-90 transition-opacity"
                          >
                            VERIFY
                          </button>
                        ) : (
                          <span className="text-yellow-600 font-bold text-xs italic">PENDING</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Log Educational Award</h3>
          <p className="text-xs text-slate-500 mb-4 italic">Sequential logic enforced: Level 1 must be verified before Level 2, etc.</p>
          
          {msg.text && (
            <div className={`p-3 rounded-lg text-xs mb-4 ${msg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSubmitAward} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Select Level</label>
              <select name="awardType" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-tmRoyalBlue outline-none">
                <option value="Level 1">Level 1 Completion</option>
                <option value="Level 2">Level 2 Completion</option>
                <option value="Level 3">Level 3 Completion</option>
                <option value="Level 4">Level 4 Completion</option>
                <option value="Level 5">Level 5 Completion</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Pathway</label>
              <select name="pathName" defaultValue={user.currentPath} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-tmRoyalBlue outline-none">
                {PATHS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-tmMaroon text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity shadow-lg shadow-tmMaroon/10">
              Submit for Verification
            </button>
          </form>
        </div>

        <div className="bg-tmRoyalBlue p-6 rounded-2xl shadow-lg shadow-tmRoyalBlue/20 text-white">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <ShieldCheck size={20} /> Base Camp Verification
          </h3>
          <p className="text-sm opacity-80 leading-relaxed">
            As a VPE, once you verify awards here, the system automatically updates member profiles and audit logs.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- View: Reports ---
const ReportsView: React.FC<{ user: Member }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'progress' | 'audit'>('progress');
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [achievements, setAchievements] = useState<EducationalAchievement[]>([]);

  useEffect(() => {
    setLogs(store.getLogs());
    setMembers(store.getMembers());
    setAchievements(store.getAchievements());
  }, []);

  if (user.role !== 'VPE') {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <AlertCircle size={48} className="mb-4 text-tmMaroon" />
        <p>Access Restricted to VPE only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100 w-fit">
        <button 
          onClick={() => setActiveTab('progress')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'progress' ? 'bg-tmRoyalBlue text-white' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Progress Report
        </button>
        <button 
          onClick={() => setActiveTab('audit')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'audit' ? 'bg-tmRoyalBlue text-white' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Participation Audit
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
        {activeTab === 'progress' ? (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">Member Education Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Member</th>
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Current Path</th>
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Level</th>
                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase">Total Awards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="py-4 font-semibold text-slate-700">{m.name}</td>
                      <td className="py-4 text-sm text-slate-600">{m.currentPath}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800">{m.currentLevel}</span>
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full">
                            <div className="bg-tmMaroon h-full rounded-full" style={{ width: `${(m.currentLevel/5)*100}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        {achievements.filter(a => a.userId === m.id && a.verifiedByVPE).length} awards
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">System Activity Log</h3>
            <div className="space-y-4">
              {logs.length > 0 ? (
                logs.slice().reverse().map(log => (
                  <div key={log.id} className="flex gap-4 items-start p-4 border-l-2 border-tmRoyalBlue bg-slate-50 rounded-r-xl">
                    <div className="text-xs text-slate-400 font-mono pt-1">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">{log.userName}</span>
                      <p className="text-sm text-slate-600 mt-0.5">{log.action}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400">
                  No activity logged yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- View: Profile/Security ---
const ProfileView: React.FC<{ user: Member, onUpdate: (m: Member) => void }> = ({ user, onUpdate }) => {
  const [mfa, setMfa] = useState(user.mfaEnabled);

  const toggleMFA = () => {
    const newVal = !mfa;
    setMfa(newVal);
    const updated = { ...user, mfaEnabled: newVal };
    store.saveMember(updated);
    onUpdate(updated);
    store.logAction(user.id, user.name, `${newVal ? 'Enabled' : 'Disabled'} MFA security`);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
              <div className="text-lg font-semibold text-slate-700">{user.name}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Toastmasters ID</label>
              <div className="text-slate-700">{user.toastmastersId}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Joined</label>
              <div className="text-slate-700">{user.joinedAt}</div>
            </div>
          </div>
          <div className="space-y-4">
             <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Role</label>
              <div className="mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'VPE' ? 'bg-tmMaroon text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {user.role}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Mentor</label>
              <div className="text-slate-700">{user.mentorName}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <ShieldCheck className="text-tmRoyalBlue" /> Security & Access
        </h2>
        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
          <div>
            <h4 className="font-bold text-slate-800">Two-Factor Authentication (2FA)</h4>
            <p className="text-sm text-slate-500 max-w-md">Require a verification code when signing in to add an extra layer of protection to your account.</p>
          </div>
          <button 
            onClick={toggleMFA}
            className={`w-14 h-8 rounded-full transition-colors relative ${mfa ? 'bg-tmRoyalBlue' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${mfa ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'meetings' | 'progress' | 'reports' | 'profile' | 'members'>('dashboard');

  const handleLogin = (user: Member) => {
    setAuthState({ user, isAuthenticated: true });
    store.logAction(user.id, user.name, 'Logged into VPE Hub');
  };

  const handleLogout = () => {
    if (authState.user) {
      store.logAction(authState.user.id, authState.user.name, 'Logged out');
    }
    setAuthState({ user: null, isAuthenticated: false });
    setActiveTab('dashboard');
  };

  if (!authState.isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const { user } = authState;
  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col hidden lg:flex fixed h-full z-20">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="group flex items-center gap-3 mb-10 px-2 text-left transition-all"
          title="Return to Dashboard"
        >
          <div className="w-10 h-10 bg-tmMaroon rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-none group-hover:text-tmRoyalBlue transition-colors">VPE Hub</h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Management System</span>
          </div>
        </button>

        <nav className="space-y-2 flex-1">
          <SidebarItem icon={<BarChart3 size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          {user.role === 'VPE' && (
            <SidebarItem icon={<Users size={20} />} label="Members" active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
          )}
          <SidebarItem icon={<Calendar size={20} />} label="Meetings" active={activeTab === 'meetings'} onClick={() => setActiveTab('meetings')} />
          <SidebarItem icon={<Award size={20} />} label="Education" active={activeTab === 'progress'} onClick={() => setActiveTab('progress')} />
          {user.role === 'VPE' && (
            <SidebarItem icon={<History size={20} />} label="Reports" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
          )}
          <SidebarItem icon={<UserCircle size={20} />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-4 mb-4 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-tmRoyalBlue text-white rounded-lg flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-slate-800 truncate">{user.name}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">{user.role}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-4 md:p-8 lg:p-10">
        {/* Mobile Header (XPath: main/div[1]) */}
        <div className="lg:hidden flex items-center justify-between mb-8">
           <button 
            onClick={() => setActiveTab('dashboard')} 
            className="group flex items-center gap-2 text-left"
            title="Go Home"
          >
            <div className="w-8 h-8 bg-tmMaroon rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <BarChart3 className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-slate-800 group-hover:text-tmRoyalBlue transition-colors">VPE Hub</h1>
          </button>
          <button onClick={handleLogout} className="text-slate-400 p-2 hover:text-red-500 transition-colors" title="Logout"><LogOut size={24} /></button>
        </div>

        {/* Tab Content (XPath: main/div[2]) */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard user={user} />}
          {activeTab === 'members' && <MembersView user={user} />}
          {activeTab === 'meetings' && <MeetingsView user={user} />}
          {activeTab === 'progress' && <ProgressView user={user} />}
          {activeTab === 'reports' && <ReportsView user={user} />}
          {activeTab === 'profile' && <ProfileView user={user} onUpdate={(m) => setAuthState(prev => ({ ...prev, user: m }))} />}
        </div>
      </main>

      {/* Mobile Navigation - Sticky Bottom */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-30">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-tmRoyalBlue' : 'text-slate-400'}`}>
          <BarChart3 size={20} />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        {user.role === 'VPE' && (
          <button onClick={() => setActiveTab('members')} className={`flex flex-col items-center ${activeTab === 'members' ? 'text-tmRoyalBlue' : 'text-slate-400'}`}>
            <Users size={20} />
            <span className="text-[10px] font-bold mt-1">Users</span>
          </button>
        )}
        <button onClick={() => setActiveTab('meetings')} className={`flex flex-col items-center ${activeTab === 'meetings' ? 'text-tmRoyalBlue' : 'text-slate-400'}`}>
          <Calendar size={20} />
          <span className="text-[10px] font-bold mt-1">Meetings</span>
        </button>
        <button onClick={() => setActiveTab('progress')} className={`flex flex-col items-center ${activeTab === 'progress' ? 'text-tmRoyalBlue' : 'text-slate-400'}`}>
          <Award size={20} />
          <span className="text-[10px] font-bold mt-1">Edu</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-tmRoyalBlue' : 'text-slate-400'}`}>
          <UserCircle size={20} />
          <span className="text-[10px] font-bold mt-1">Me</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
