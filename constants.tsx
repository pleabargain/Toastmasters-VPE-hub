
import React from 'react';

export const COLORS = {
  tmMaroon: '#772432',
  tmRoyalBlue: '#004165',
  tmYellow: '#F2DF74',
  tmGray: '#A9B2B1',
};

export const PATHS = [
  "Dynamic Leadership",
  "Effective Coaching",
  "Engaging Humor",
  "Innovative Planning",
  "Leadership Development",
  "Motivational Strategies",
  "Persuasive Influence",
  "Presentation Mastery",
  "Strategic Relationships",
  "Team Collaboration",
  "Visionary Communication"
];

export const ROLES = [
  "Toastmaster of the Day",
  "Speaker",
  "Evaluator",
  "Table Topics Master",
  "General Evaluator",
  "Grammarian",
  "Ah-Counter",
  "Timer"
];

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    'Scheduled': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Completed': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};
