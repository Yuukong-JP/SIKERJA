
import React from 'react';
import type { AdminView } from '../types';
import { ChartPieIcon, UsersIcon, UserGroupIcon, BriefcaseIcon, DocumentTextIcon, BuildingOfficeIcon } from './icons';

interface SidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
}

const menuItems: { view: AdminView; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: ChartPieIcon },
  { view: 'jobSeekers', label: 'Pencari Kerja', icon: UsersIcon },
  { view: 'trainingParticipants', label: 'Peserta Pelatihan', icon: UserGroupIcon },
  { view: 'informalWorkers', label: 'Pekerja Informal', icon: BriefcaseIcon },
  { view: 'vacancies', label: 'Lowongan Kerja', icon: DocumentTextIcon },
  { view: 'companies', label: 'Perusahaan', icon: BuildingOfficeIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <aside className="w-64 bg-white text-slate-700 fixed top-16 left-0 h-full shadow-lg">
      <nav className="mt-5">
        <ul>
          {menuItems.map(({ view, label, icon: Icon }) => (
            <li key={view} className="px-4 py-1">
              <button
                onClick={() => onViewChange(view)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  currentView === view
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
