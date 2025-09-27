
import type { JobSeeker, TrainingParticipant, InformalWorker, Vacancy, Company, BPJSData } from '../types';

export const MOCK_JOB_SEEKERS: JobSeeker[] = [
  { id: 'JS001', name: 'Budi Santoso', nik: '1234567890123456', address: 'Jl. Merdeka No. 10', phone: '081234567890', education: 'S1 Teknik Informatika' },
  { id: 'JS002', name: 'Citra Lestari', nik: '2345678901234567', address: 'Jl. Pahlawan No. 5', phone: '082345678901', education: 'SMA' },
];

export const MOCK_TRAINING_PARTICIPANTS: TrainingParticipant[] = [
  { id: 'TP001', name: 'Dewi Anggraini', trainingName: 'Pelatihan Digital Marketing', startDate: '2024-07-01', endDate: '2024-07-31', status: 'Selesai' },
  { id: 'TP002', name: 'Eko Prasetyo', trainingName: 'Pelatihan Barista', startDate: '2024-08-01', endDate: '2024-08-15', status: 'Aktif' },
];

export const MOCK_INFORMAL_WORKERS: InformalWorker[] = [
  { id: 'IW001', name: 'Fajar Nugroho', nik: '3456789012345678', sector: 'Pedagang Kaki Lima', bpjsStatus: 'Aktif', protectionStartDate: '2024-01-01', protectionEndDate: '2024-12-31' },
  { id: 'IW002', name: 'Gita Permata', nik: '4567890123456789', sector: 'Ojek Online', bpjsStatus: 'Tidak Aktif' },
];

export const MOCK_VACANCIES: Vacancy[] = [
  { id: 'V001', position: 'Admin Media Sosial', companyName: 'Toko Maju Jaya', location: 'Padang Panjang', description: 'Mengelola akun media sosial dan interaksi dengan pelanggan.', postedDate: '2024-07-20' },
  { id: 'V002', position: 'Kasir', companyName: 'Cafe Senja', location: 'Padang Panjang', description: 'Melayani pembayaran dan membuat laporan penjualan harian.', postedDate: '2024-07-18' },
];

export const MOCK_COMPANIES: Company[] = [
  { id: 'C001', name: 'Toko Maju Jaya', address: 'Jl. Sudirman No. 15', sector: 'Ritel', contactPerson: 'H. Ahmad', contactPhone: '081122334455' },
  { id: 'C002', name: 'Cafe Senja', address: 'Jl. Gatot Subroto No. 30', sector: 'Kuliner', contactPerson: 'Ibu Rina', contactPhone: '082233445566' },
];

export const MOCK_BPJS_DATA: Record<string, BPJSData> = {
    '3456789012345678': {
        nik: '3456789012345678',
        name: 'Fajar Nugroho',
        status: 'Aktif',
        protectionStartDate: '2024-01-01',
        protectionEndDate: '2024-12-31'
    },
    '4567890123456789': {
        nik: '4567890123456789',
        name: 'Gita Permata',
        status: 'Tidak Aktif',
    }
};
