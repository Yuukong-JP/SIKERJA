
export type Role = 'admin' | 'public';

export type AdminView = 'dashboard' | 'jobSeekers' | 'trainingParticipants' | 'informalWorkers' | 'vacancies' | 'companies';

export interface JobSeeker {
  id: string;
  name: string;
  nik: string;
  address: string;
  phone: string;
  education: string;
}

export interface TrainingParticipant {
  id: string;
  name: string;
  trainingName: string;
  startDate: string;
  endDate: string;
  status: 'Aktif' | 'Selesai' | 'Batal';
}

export interface InformalWorker {
  id: string;
  name: string;
  nik: string;
  sector: string;
  bpjsStatus: 'Aktif' | 'Tidak Aktif';
  protectionStartDate?: string;
  protectionEndDate?: string;
}

export interface Vacancy {
  id: string;
  position: string;
  companyName: string;
  location: string;
  description: string;
  postedDate: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  sector: string;
  contactPerson: string;
  contactPhone: string;
}

export interface BPJSData {
    nik: string;
    name: string;
    status: 'Aktif' | 'Tidak Aktif' | 'Tidak Ditemukan';
    protectionStartDate?: string;
    protectionEndDate?: string;
}
