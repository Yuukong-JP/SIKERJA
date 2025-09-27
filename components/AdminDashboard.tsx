
import React, { useState, useCallback, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { DataTable } from './DataTable';
import type { AdminView, JobSeeker, TrainingParticipant, InformalWorker, Vacancy, Company } from '../types';
import { BriefcaseIcon, BuildingOfficeIcon, DocumentTextIcon, UserGroupIcon, UsersIcon, ChartPieIcon } from './icons';

interface AdminDashboardProps {
  dataSets: {
    jobSeekers: JobSeeker[];
    trainingParticipants: TrainingParticipant[];
    informalWorkers: InformalWorker[];
    vacancies: Vacancy[];
    companies: Company[];
  };
  dataSetters: {
    setJobSeekers: React.Dispatch<React.SetStateAction<JobSeeker[]>>;
    setTrainingParticipants: React.Dispatch<React.SetStateAction<TrainingParticipant[]>>;
    setInformalWorkers: React.Dispatch<React.SetStateAction<InformalWorker[]>>;
    setVacancies: React.Dispatch<React.SetStateAction<Vacancy[]>>;
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  };
}

const viewConfig = {
    dashboard: { title: 'Dashboard', icon: ChartPieIcon },
    jobSeekers: { title: 'Pencari Kerja', icon: UsersIcon },
    trainingParticipants: { title: 'Peserta Pelatihan', icon: UserGroupIcon },
    informalWorkers: { title: 'Pekerja Informal', icon: BriefcaseIcon },
    vacancies: { title: 'Lowongan Kerja', icon: DocumentTextIcon },
    companies: { title: 'Perusahaan', icon: BuildingOfficeIcon },
};

const columnConfig: Record<AdminView, { key: string, header: string }[]> = {
    dashboard: [],
    jobSeekers: [
        { key: 'name', header: 'Nama' },
        { key: 'nik', header: 'NIK' },
        { key: 'address', header: 'Alamat' },
        { key: 'phone', header: 'Telepon' },
        { key: 'education', header: 'Pendidikan' },
    ],
    trainingParticipants: [
        { key: 'name', header: 'Nama' },
        { key: 'trainingName', header: 'Nama Pelatihan' },
        { key: 'startDate', header: 'Mulai' },
        { key: 'endDate', header: 'Selesai' },
        { key: 'status', header: 'Status' },
    ],
    informalWorkers: [
        { key: 'name', header: 'Nama' },
        { key: 'nik', header: 'NIK' },
        { key: 'sector', header: 'Sektor Usaha' },
        { key: 'bpjsStatus', header: 'Status BPJS' },
    ],
    vacancies: [
        { key: 'position', header: 'Posisi' },
        { key: 'companyName', header: 'Perusahaan' },
        { key: 'location', header: 'Lokasi' },
        { key: 'postedDate', header: 'Tanggal Posting' },
    ],
    companies: [
        { key: 'name', header: 'Nama Perusahaan' },
        { key: 'address', header: 'Alamat' },
        { key: 'sector', header: 'Sektor' },
        { key: 'contactPerson', header: 'Kontak Person' },
    ],
};

const DashboardContent: React.FC<{ counts: Record<string, number> }> = ({ counts }) => (
    <div className="p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(counts).map(([key, value]) => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full">
                           {React.createElement(viewConfig[key as AdminView]?.icon || ChartPieIcon, { className: "h-6 w-6 text-blue-600" })}
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-slate-500">{viewConfig[key as AdminView]?.title}</p>
                            <p className="text-2xl font-bold text-slate-800">{value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


export const AdminDashboard: React.FC<AdminDashboardProps> = ({ dataSets, dataSetters }) => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewChange = useCallback((view: AdminView) => {
    setCurrentView(view);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = (window as any).XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: any[] = (window as any).XLSX.utils.sheet_to_json(worksheet);

      const setter = dataSetters[`set${currentView.charAt(0).toUpperCase() + currentView.slice(1)}` as keyof typeof dataSetters];
      if (setter && json.length > 0) {
        // Simple mapping based on expected headers
        const newItems = json.map((item, index) => ({ id: `${currentView.slice(0,2).toUpperCase()}${Date.now()}${index}`, ...item }));
        (setter as React.Dispatch<React.SetStateAction<any[]>>)((prev: any[]) => [...prev, ...newItems]);
        alert(`${json.length} data berhasil diimpor ke tabel ${viewConfig[currentView].title}.`);
      } else {
        alert('Gagal mengimpor data. Pastikan format file Excel sesuai dan Anda berada di tabel yang benar.');
      }
    };
    reader.readAsArrayBuffer(file);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const counts = {
    jobSeekers: dataSets.jobSeekers.length,
    trainingParticipants: dataSets.trainingParticipants.length,
    informalWorkers: dataSets.informalWorkers.length,
    vacancies: dataSets.vacancies.length,
    companies: dataSets.companies.length,
  };

  const CurrentIcon = viewConfig[currentView]?.icon;
  const currentTitle = viewConfig[currentView]?.title;

  return (
    <div className="flex">
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      <div className="flex-1 min-h-screen pl-64">
        <div className="p-8">
            {currentView === 'dashboard' ? (
                <DashboardContent counts={counts} />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            {CurrentIcon && <CurrentIcon className="h-8 w-8 text-blue-600" />}
                            <h2 className="text-3xl font-bold text-slate-800 ml-3">{currentTitle}</h2>
                        </div>
                        <div className="flex items-center space-x-2">
                             <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".xlsx, .xls, .csv"
                             />
                            <button 
                                onClick={handleImportClick}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                Impor dari Excel
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Tambah Data
                            </button>
                        </div>
                    </div>
                    <DataTable 
                      columns={columnConfig[currentView]} 
                      data={dataSets[currentView as keyof typeof dataSets]} 
                    />
                </>
            )}
        </div>
      </div>
    </div>
  );
};
