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
    <aside className="w-64 bg-white text-slate-700 fixed top-16 left-0 h-[calc(100vh-64px)] shadow-lg flex flex-col">
       <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Admin Menu</h2>
      </div>
      <nav className="mt-4 flex-1">
        <ul className="space-y-1 px-2">
          {menuItems.map(({ view, label, icon: Icon }) => (
            <li key={view}>
              <button
                onClick={() => onViewChange(view)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative ${
                  currentView === view
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className={`absolute left-0 top-0 h-full w-1 rounded-r-lg ${currentView === view ? 'bg-blue-600' : 'bg-transparent'}`}></span>
                <Icon className={`h-5 w-5 mr-3 ${currentView === view ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
