import React, { useState, useCallback } from 'react';
import { AdminDashboard } from './components/AdminDashboard';
import { PublicView } from './components/PublicView';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import type { JobSeeker, TrainingParticipant, InformalWorker, Vacancy, Company } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { MOCK_JOB_SEEKERS, MOCK_TRAINING_PARTICIPANTS, MOCK_INFORMAL_WORKERS, MOCK_VACANCIES, MOCK_COMPANIES } from './data/mockData';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [jobSeekers, setJobSeekers] = useLocalStorage<JobSeeker[]>('jobSeekers', MOCK_JOB_SEEKERS);
  const [trainingParticipants, setTrainingParticipants] = useLocalStorage<TrainingParticipant[]>('trainingParticipants', MOCK_TRAINING_PARTICIPANTS);
  const [informalWorkers, setInformalWorkers] = useLocalStorage<InformalWorker[]>('informalWorkers', MOCK_INFORMAL_WORKERS);
  const [vacancies, setVacancies] = useLocalStorage<Vacancy[]>('vacancies', MOCK_VACANCIES);
  const [companies, setCompanies] = useLocalStorage<Company[]>('companies', MOCK_COMPANIES);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
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
      <Header 
        isAuthenticated={isAuthenticated} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      <main>
        {isAuthenticated ? (
          <AdminDashboard dataSets={dataSets} dataSetters={dataSetters} />
        ) : (
          <PublicView localVacancies={vacancies} />
        )}
      </main>
      
      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default App;