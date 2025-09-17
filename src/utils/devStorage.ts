import { DevEntry, DevSettings, FormData } from '../types/DevEntry';

const DEV_ENTRIES_KEY = 'swapro_dev_entries';
const DEV_SETTINGS_KEY = 'swapro_dev_settings';

// Default settings
const defaultSettings: DevSettings = {
  skipSplashScreen: false,
  skipLoadingScreen: false,
  showDebugInfo: false,
  autoFillEnabled: false,
};

// Sample data templates
export const sampleDataTemplates: Partial<FormData>[] = [
  {
    client: 'ADIRA',
    posisiDilamar: 'Sales Officer - CMO',
    penempatan: 'JAKARTA',
    detailPenempatan: 'ADIRA TEBET MOTOR',
    namaLengkap: 'John Doe',
    nik: '3171234567890001',
    noHp: '081234567890',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1990-01-15',
    umur: '34',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    agama: 'Islam',
    namaAyah: 'John Senior',
    namaIbu: 'Jane Doe',
    alamatKtp: 'Jl. Sudirman No. 123, RT 001/002',
    alamatDomisili: 'Jl. Sudirman No. 123, RT 001/002',
    rtRw: '001/002',
    nomorRumah: '123',
    kelurahan: 'Karet Tengsin',
    kecamatan: 'Tanah Abang',
    kota: 'Jakarta Pusat',
    kodePos: '10220',
    tingkatPendidikan: 'S1',
    namaSekolah: 'Universitas Indonesia',
    jurusan: 'Ekonomi',
    tahunMasuk: '2008',
    tahunLulus: '2012',
    ipk: '3.5',
    pengalamanKerja: true,
    pengalamanLeasing: true,
    namaPerusahaan: 'PT. Finance Indonesia',
    posisiJabatan: 'Sales Executive',
    periodeKerja: 'Jan 2020 - Des 2023',
    deskripsiTugas: 'Melakukan penjualan produk pembiayaan kendaraan',
    kendaraanPribadi: true,
    ktpAsli: true,
    simC: true,
    simA: false,
    skck: true,
    npwp: true,
    riwayatBurukKredit: false,
    alasanMelamar: 'Tertarik dengan perusahaan yang memiliki reputasi baik dan ingin mengembangkan karir di bidang finance.',
  },
  {
    client: 'SMS',
    posisiDilamar: 'Collection Remedial Officer',
    penempatan: 'JAKARTA',
    detailPenempatan: 'SMS FINANCE JAKARTA TIMUR',
    namaLengkap: 'Sarah Wilson',
    nik: '3172345678900002',
    noHp: '082345678901',
    tempatLahir: 'Bandung',
    tanggalLahir: '1992-05-20',
    umur: '32',
    jenisKelamin: 'Perempuan',
    statusPerkawinan: 'Belum Menikah',
    agama: 'Kristen',
    namaAyah: 'Robert Wilson',
    namaIbu: 'Maria Wilson',
    alamatKtp: 'Jl. Gatot Subroto No. 456, RT 003/004',
    alamatDomisili: 'Jl. Gatot Subroto No. 456, RT 003/004',
    rtRw: '003/004',
    nomorRumah: '456',
    kelurahan: 'Kuningan Timur',
    kecamatan: 'Setiabudi',
    kota: 'Jakarta Selatan',
    kodePos: '12950',
    tingkatPendidikan: 'D3',
    namaSekolah: 'Politeknik Negeri Bandung',
    jurusan: 'Akuntansi',
    tahunMasuk: '2010',
    tahunLulus: '2013',
    ipk: '3.7',
    pengalamanKerja: true,
    pengalamanLeasing: false,
    namaPerusahaan: 'PT. Collection Services',
    posisiJabatan: 'Collection Officer',
    periodeKerja: 'Mar 2021 - Nov 2023',
    deskripsiTugas: 'Menangani penagihan kredit bermasalah dan negosiasi dengan nasabah',
    kendaraanPribadi: false,
    ktpAsli: true,
    simC: true,
    simA: false,
    skck: true,
    npwp: true,
    riwayatBurukKredit: false,
    alasanMelamar: 'Memiliki pengalaman di bidang collection dan ingin bergabung dengan perusahaan yang lebih besar.',
  }
];

// Dev Entries Management
export const loadDevEntries = (): DevEntry[] => {
  try {
    const stored = localStorage.getItem(DEV_ENTRIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading dev entries:', error);
    return [];
  }
};

export const saveDevEntries = (entries: DevEntry[]): void => {
  try {
    localStorage.setItem(DEV_ENTRIES_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving dev entries:', error);
  }
};

export const createDevEntry = (name: string, formData: Partial<FormData>, metadata?: Partial<DevEntry['metadata']>): DevEntry => {
  const now = new Date().toISOString();
  return {
    id: `dev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    formData: formData as FormData,
    metadata: {
      isUrgent: false,
      isRecommended: false,
      hiddenFields: [],
      createdAt: now,
      lastModified: now,
      ...metadata,
    },
  };
};

export const updateDevEntry = (entries: DevEntry[], id: string, updates: Partial<DevEntry>): DevEntry[] => {
  return entries.map(entry => 
    entry.id === id 
      ? { 
          ...entry, 
          ...updates, 
          metadata: { 
            ...entry.metadata, 
            ...updates.metadata, 
            lastModified: new Date().toISOString() 
          } 
        }
      : entry
  );
};

export const deleteDevEntry = (entries: DevEntry[], id: string): DevEntry[] => {
  return entries.filter(entry => entry.id !== id);
};

// Dev Settings Management
export const loadDevSettings = (): DevSettings => {
  try {
    const stored = localStorage.getItem(DEV_SETTINGS_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch (error) {
    console.error('Error loading dev settings:', error);
    return defaultSettings;
  }
};

export const saveDevSettings = (settings: DevSettings): void => {
  try {
    localStorage.setItem(DEV_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving dev settings:', error);
  }
};

// Generate sample entries
export const generateSampleEntries = (): DevEntry[] => {
  return sampleDataTemplates.map((template, index) => 
    createDevEntry(
      `Sample ${index + 1} - ${template.namaLengkap} (${template.posisiDilamar})`,
      template,
      {
        isUrgent: index === 0, // First sample is urgent
        isRecommended: index === 1, // Second sample is recommended
      }
    )
  );
};