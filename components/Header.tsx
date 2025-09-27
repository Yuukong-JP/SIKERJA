
import React from 'react';
import type { Role } from '../types';

interface HeaderProps {
  role: Role;
  onRoleChange: (newRole: Role) => void;
}

export const Header: React.FC<HeaderProps> = ({ role, onRoleChange }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h1 className="text-xl font-bold text-slate-800 ml-3">
              SI Ketenagakerjaan
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${role === 'public' ? 'text-blue-600' : 'text-slate-500'}`}>
              Masyarakat
            </span>
            <button
              onClick={() => onRoleChange(role === 'admin' ? 'public' : 'admin')}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${role === 'admin' ? 'bg-blue-600' : 'bg-gray-300'
                }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${role === 'admin' ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
            <span className={`text-sm font-medium ${role === 'admin' ? 'text-blue-600' : 'text-slate-500'}`}>
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
