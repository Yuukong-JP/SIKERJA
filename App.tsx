
import React, { useState, useCallback } from 'react';
import { AdminDashboard } from './components/AdminDashboard';
import { PublicView } from './components/PublicView';
import { Header } from './components/Header';
import { ConsultationChat } from './components/ConsultationChat';
import type { Role, JobSeeker, TrainingParticipant, InformalWorker, Vacancy, Company } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { MOCK_JOB_SEEKERS, MOCK_TRAINING_PARTICIPANTS, MOCK_INFORMAL_WORKERS, MOCK_VACANCIES, MOCK_COMPANIES } from './data/mockData';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('public');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [jobSeekers, setJobSeekers] = useLocalStorage<JobSeeker[]>('jobSeekers', MOCK_JOB_SEEKERS);
  const [trainingParticipants, setTrainingParticipants] = useLocalStorage<TrainingParticipant[]>('trainingParticipants', MOCK_TRAINING_PARTICIPANTS);
  const [informalWorkers, setInformalWorkers] = useLocalStorage<InformalWorker[]>('informalWorkers', MOCK_INFORMAL_WORKERS);
  const [vacancies, setVacancies] = useLocalStorage<Vacancy[]>('vacancies', MOCK_VACANCIES);
  const [companies, setCompanies] = useLocalStorage<Company[]>('companies', MOCK_COMPANIES);

  const handleRoleChange = useCallback((newRole: Role) => {
    setRole(newRole);
  }, []);

  const dataSets = {
    jobSeekers,
    trainingParticipants,
    informalWorkers,
    vacancies,
    companies,
  };

  const dataSetters = {
    setJobSeekers,
    setTrainingParticipants,
    setInformalWorkers,
    setVacancies,
    setCompanies,
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header role={role} onRoleChange={handleRoleChange} />
      <main>
        {role === 'admin' ? (
          <AdminDashboard dataSets={dataSets} dataSetters={dataSetters} />
        ) : (
          <PublicView localVacancies={vacancies} />
        )}
      </main>
      
      {role === 'public' && (
        <>
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
            aria-label="Buka Konsultasi Online"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          {isChatOpen && <ConsultationChat onClose={() => setIsChatOpen(false)} />}
        </>
      )}
    </div>
  );
};

export default App;
