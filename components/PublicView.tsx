import React, { useState } from 'react';
import type { Vacancy, BPJSData } from '../types';
import { MOCK_BPJS_DATA } from '../data/mockData';
import { ArrowTopRightOnSquareIcon, BriefcaseIcon, DocumentTextIcon, UserPlusIcon } from './icons';

interface PublicViewProps {
  localVacancies: Vacancy[];
}

const JobSeekerRegistration: React.FC = () => {
    const [mode, setMode] = useState<'online' | 'offline' | null>(null);

    const requirements = [
        "Fotokopi KTP",
        "Fotokopi Ijazah Terakhir",
        "Pas Foto 3x4 (2 lembar)",
        "Mengisi Formulir Pendaftaran"
    ];

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Pendaftaran Pencari Kerja (AK/1)</h3>
            <div className="mb-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-blue-800">Persyaratan:</h4>
                <ul className="list-disc list-inside mt-2 text-slate-700">
                    {requirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                 <button onClick={() => setMode('online')} className="bg-white border-2 border-blue-500 text-blue-500 p-6 rounded-lg shadow-sm hover:shadow-lg hover:bg-blue-50 transition-all duration-300 text-center">
                    <h4 className="text-xl font-semibold mb-2">Daftar Online</h4>
                    <p className="text-slate-600">Pendaftaran melalui sistem nasional.</p>
                </button>
                <button onClick={() => setMode('offline')} className="bg-white border-2 border-green-500 text-green-500 p-6 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-50 transition-all duration-300 text-center">
                    <h4 className="text-xl font-semibold mb-2">Daftar Offline</h4>
                    <p className="text-slate-600">Datang langsung ke lokasi pelayanan.</p>
                </button>
            </div>

            {mode === 'online' && (
                <div className="mt-6 p-6 bg-slate-50 rounded-lg text-center animate-fade-in">
                    <p className="text-slate-700 mb-4">Anda akan diarahkan ke portal SIAPKerja dari KEMNAKER untuk pendaftaran secara online.</p>
                    <a href="https://siapkerja.kemnaker.go.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                        Lanjutkan ke SIAPKerja <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2"/>
                    </a>
                </div>
            )}

            {mode === 'offline' && (
                 <div className="mt-6 p-6 bg-slate-50 rounded-lg animate-fade-in">
                    <p className="text-slate-700 mb-4 text-center">Silakan isi formulir di bawah ini dan bawa persyaratan ke Mal Pelayanan Publik (MPP) Kota Padang Panjang.</p>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">NIK</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div className="text-center pt-4">
                            <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">Kirim Pendaftaran Awal</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

const BPJSCheck: React.FC = () => {
    const [nik, setNik] = useState('');
    const [result, setResult] = useState<BPJSData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        if (nik.length !== 16 || !/^\d+$/.test(nik)) {
            setError('NIK harus terdiri dari 16 angka.');
            return;
        }
        setError('');
        setLoading(true);
        setResult(null);
        setTimeout(() => {
            const data = MOCK_BPJS_DATA[nik] || { nik, name: 'Data Tidak Ditemukan', status: 'Tidak Ditemukan' };
            setResult(data);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Cek Perlindungan BPJS Ketenagakerjaan Sektor Informal</h3>
            <form onSubmit={handleCheck} className="flex flex-col sm:flex-row items-start gap-4 mb-2">
                <div className="w-full">
                    <input 
                        type="text"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="Masukkan 16 digit Nomor Induk Kependudukan (NIK)"
                        className="flex-grow w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        maxLength={16}
                    />
                     {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <button type="submit" disabled={loading || !nik} className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex-shrink-0">
                    {loading ? 'Mengecek...' : 'Cek Status'}
                </button>
            </form>

            {result && (
                <div className={`mt-6 p-6 rounded-lg ${result.status === 'Aktif' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border-l-4 animate-fade-in`}>
                    <h4 className="text-lg font-bold">{result.name}</h4>
                    <p className="mt-2">Status Perlindungan: <span className={`font-semibold ${result.status === 'Aktif' ? 'text-green-700' : 'text-red-700'}`}>{result.status}</span></p>
                    {result.status === 'Aktif' && result.protectionStartDate && (
                        <p>Periode Perlindungan: <span className="font-semibold">{new Date(result.protectionStartDate).toLocaleDateString('id-ID')}</span> s/d <span className="font-semibold">{new Date(result.protectionEndDate).toLocaleDateString('id-ID')}</span></p>
                    )}
                </div>
            )}
        </div>
    );
};

const JobVacancies: React.FC<{localVacancies: Vacancy[]}> = ({localVacancies}) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Lowongan Kerja</h3>
            <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-slate-700">Lowongan di Padang Panjang</h4>
                <div className="space-y-4">
                    {localVacancies.length > 0 ? localVacancies.map(job => (
                        <div key={job.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-slate-50">
                            <h5 className="font-bold text-blue-700">{job.position}</h5>
                            <p className="text-sm text-slate-600">{job.companyName} - {job.location}</p>
                            <p className="text-sm text-slate-500 mt-2">{job.description}</p>
                            <p className="text-xs text-slate-400 mt-2 text-right">Diposting: {new Date(job.postedDate).toLocaleDateString('id-ID')}</p>
                        </div>
                    )) : (
                        <p className="text-slate-500 text-center py-4">Saat ini belum ada lowongan lokal yang tersedia.</p>
                    )}
                </div>
            </div>
            <div>
                 <h4 className="text-xl font-semibold mb-4 text-slate-700">Akses Lowongan Lainnya</h4>
                 <div className="grid md:grid-cols-2 gap-4">
                     <a href="https://www.jobstreet.co.id" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        JobStreet <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2"/>
                    </a>
                    <a href="https://www.linkedin.com/jobs" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
                        LinkedIn Jobs <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2"/>
                    </a>
                 </div>
            </div>
        </div>
    );
};

const menuItems = [
    { id: 'register', label: 'Daftar Pencari Kerja', icon: UserPlusIcon, description: "Buat kartu kuning (AK/1) secara online atau offline." },
    { id: 'bpjs', label: 'Cek Perlindungan BPJS', icon: BriefcaseIcon, description: "Periksa status kepesertaan BPJS Ketenagakerjaan Anda." },
    { id: 'vacancies', label: 'Lowongan Kerja', icon: DocumentTextIcon, description: "Temukan informasi lowongan kerja di Padang Panjang dan sekitarnya." },
];

export const PublicView: React.FC<PublicViewProps> = ({localVacancies}) => {
    const [activeView, setActiveView] = useState<string | null>(null);

    const renderContent = () => {
        switch (activeView) {
            case 'register': return <JobSeekerRegistration />;
            case 'bpjs': return <BPJSCheck />;
            case 'vacancies': return <JobVacancies localVacancies={localVacancies} />;
            default: return null;
        }
    };
    
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-blue-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {!activeView ? (
                     <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Layanan Ketenagakerjaan</h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Akses berbagai layanan ketenagakerjaan yang kami sediakan untuk masyarakat Kota Padang Panjang.</p>
                    </div>
                ) : (
                    <div className="mb-8">
                         <button onClick={() => setActiveView(null)} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Kembali ke Menu Utama
                         </button>
                    </div>
                )}
                
                {activeView ? (
                    <div className="animate-fade-in-up">
                        {renderContent()}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {menuItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id} onClick={() => setActiveView(item.id)} className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left cursor-pointer border-t-4 border-transparent hover:border-blue-500">
                                    <div className="p-4 bg-blue-100 rounded-full inline-block mb-6">
                                        <Icon className="h-10 w-10 text-blue-600"/>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{item.label}</h3>
                                    <p className="text-slate-500">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
