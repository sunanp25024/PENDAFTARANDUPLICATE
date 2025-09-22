export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'date' | 'tel' | 'number' | 'email' | 'boolean';
  required: boolean;
  placeholder?: string;
  options?: string[];
  rows?: number;
  maxLength?: number;
  icon?: string; // Icon name from lucide-react
  isUrgent?: boolean;
  isHidden?: boolean;
  step: number; // Which step this field belongs to (0-5)
  order: number; // Order within the step
  gridCols?: 1 | 2; // Grid columns (1 = full width, 2 = half width)
}

export interface FormStep {
  id: string;
  title: string;
  icon: string;
  color: string;
  fields: FormField[];
}

export interface ClientConfig {
  id: string;
  name: string;
  positions: string[];
  isActive: boolean;
}

export interface LocationConfig {
  id: string;
  name: string;
  details: {
    [clientId: string]: string[];
  };
  isActive: boolean;
}

export interface FormConfig {
  steps: FormStep[];
  clients: ClientConfig[];
  locations: LocationConfig[];
  positionPlacements: {
    [position: string]: string[];
  };
}

export interface FormStatistics {
  totalSubmissions: number;
  submissionsByPosition: { [position: string]: number };
  submissionsByGender: { male: number; female: number };
  submissionsByClient: { [client: string]: number };
  submissionsByLocation: { [location: string]: number };
  recentSubmissions: Array<{
    name: string;
    position: string;
    client: string;
    timestamp: string;
  }>;
}

export const defaultFormConfig: FormConfig = {
  steps: [
    {
      id: 'client-position',
      title: 'Client & Posisi',
      icon: 'Building2',
      color: 'from-blue-400 to-blue-500',
      fields: [
        {
          id: 'client',
          name: 'client',
          label: 'Client',
          type: 'select',
          required: true,
          icon: 'Building2',
          step: 0,
          order: 0,
          gridCols: 1,
          options: []
        },
        {
          id: 'posisiDilamar',
          name: 'posisiDilamar',
          label: 'Posisi yang Dilamar',
          type: 'select',
          required: true,
          icon: 'Target',
          step: 0,
          order: 1,
          gridCols: 1,
          options: []
        },
        {
          id: 'penempatan',
          name: 'penempatan',
          label: 'Lokasi Penempatan',
          type: 'select',
          required: true,
          icon: 'MapPin',
          step: 0,
          order: 2,
          gridCols: 1,
          options: []
        },
        {
          id: 'detailPenempatan',
          name: 'detailPenempatan',
          label: 'Detail Penempatan',
          type: 'select',
          required: true,
          icon: 'MapPin',
          step: 0,
          order: 3,
          gridCols: 1,
          options: []
        }
      ]
    },
    {
      id: 'personal-data',
      title: 'Data Pribadi',
      icon: 'User',
      color: 'from-purple-400 to-purple-500',
      fields: [
        {
          id: 'namaLengkap',
          name: 'namaLengkap',
          label: 'Nama Lengkap',
          type: 'text',
          required: true,
          icon: 'User',
          step: 1,
          order: 0,
          gridCols: 2
        },
        {
          id: 'nik',
          name: 'nik',
          label: 'NIK',
          type: 'text',
          required: true,
          maxLength: 16,
          icon: 'User',
          step: 1,
          order: 1,
          gridCols: 2
        },
        {
          id: 'noHp',
          name: 'noHp',
          label: 'Nomor HP',
          type: 'tel',
          required: true,
          icon: 'Phone',
          step: 1,
          order: 2,
          gridCols: 2
        },
        {
          id: 'tempatLahir',
          name: 'tempatLahir',
          label: 'Tempat Lahir',
          type: 'text',
          required: true,
          icon: 'MapPin',
          step: 1,
          order: 3,
          gridCols: 2
        },
        {
          id: 'tanggalLahir',
          name: 'tanggalLahir',
          label: 'Tanggal Lahir',
          type: 'date',
          required: true,
          icon: 'Calendar',
          step: 1,
          order: 4,
          gridCols: 2
        },
        {
          id: 'umur',
          name: 'umur',
          label: 'Umur',
          type: 'text',
          required: false,
          placeholder: 'Otomatis terisi',
          icon: 'Calendar',
          step: 1,
          order: 5,
          gridCols: 2
        },
        {
          id: 'jenisKelamin',
          name: 'jenisKelamin',
          label: 'Jenis Kelamin',
          type: 'select',
          required: true,
          icon: 'User',
          step: 1,
          order: 6,
          gridCols: 2,
          options: ['Laki-laki', 'Perempuan']
        },
        {
          id: 'statusPerkawinan',
          name: 'statusPerkawinan',
          label: 'Status Perkawinan',
          type: 'select',
          required: true,
          icon: 'Heart',
          step: 1,
          order: 7,
          gridCols: 2,
          options: ['Belum Menikah', 'Menikah', 'Cerai']
        },
        {
          id: 'agama',
          name: 'agama',
          label: 'Agama',
          type: 'select',
          required: true,
          icon: 'Heart',
          step: 1,
          order: 8,
          gridCols: 2,
          options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']
        },
        {
          id: 'namaAyah',
          name: 'namaAyah',
          label: 'Nama Ayah',
          type: 'text',
          required: true,
          icon: 'User',
          step: 1,
          order: 9,
          gridCols: 2
        },
        {
          id: 'namaIbu',
          name: 'namaIbu',
          label: 'Nama Ibu',
          type: 'text',
          required: true,
          icon: 'User',
          step: 1,
          order: 10,
          gridCols: 2
        }
      ]
    },
    {
      id: 'address',
      title: 'Alamat',
      icon: 'MapPin',
      color: 'from-green-400 to-green-500',
      fields: [
        {
          id: 'alamatKtp',
          name: 'alamatKtp',
          label: 'Alamat KTP',
          type: 'textarea',
          required: true,
          rows: 3,
          icon: 'MapPin',
          step: 2,
          order: 0,
          gridCols: 1
        },
        {
          id: 'alamatDomisili',
          name: 'alamatDomisili',
          label: 'Alamat Domisili (Tempat Tinggal Sekarang)',
          type: 'textarea',
          required: true,
          rows: 3,
          icon: 'MapPin',
          step: 2,
          order: 1,
          gridCols: 1
        },
        {
          id: 'rtRw',
          name: 'rtRw',
          label: 'RT/RW',
          type: 'text',
          required: false,
          placeholder: '001/002',
          icon: 'MapPin',
          step: 2,
          order: 2,
          gridCols: 2
        },
        {
          id: 'nomorRumah',
          name: 'nomorRumah',
          label: 'Nomor Rumah',
          type: 'text',
          required: false,
          icon: 'MapPin',
          step: 2,
          order: 3,
          gridCols: 2
        },
        {
          id: 'kelurahan',
          name: 'kelurahan',
          label: 'Kelurahan',
          type: 'text',
          required: true,
          icon: 'MapPin',
          step: 2,
          order: 4,
          gridCols: 2
        },
        {
          id: 'kecamatan',
          name: 'kecamatan',
          label: 'Kecamatan',
          type: 'text',
          required: true,
          icon: 'MapPin',
          step: 2,
          order: 5,
          gridCols: 2
        },
        {
          id: 'kota',
          name: 'kota',
          label: 'Kota',
          type: 'text',
          required: true,
          icon: 'MapPin',
          step: 2,
          order: 6,
          gridCols: 2
        },
        {
          id: 'kodePos',
          name: 'kodePos',
          label: 'Kode Pos',
          type: 'text',
          required: false,
          maxLength: 5,
          icon: 'MapPin',
          step: 2,
          order: 7,
          gridCols: 2
        }
      ]
    },
    {
      id: 'education',
      title: 'Pendidikan',
      icon: 'GraduationCap',
      color: 'from-orange-400 to-orange-500',
      fields: [
        {
          id: 'tingkatPendidikan',
          name: 'tingkatPendidikan',
          label: 'Tingkat Pendidikan',
          type: 'select',
          required: true,
          icon: 'GraduationCap',
          step: 3,
          order: 0,
          gridCols: 2,
          options: ['SMA/SMK', 'D3', 'S1', 'S2', 'S3']
        },
        {
          id: 'namaSekolah',
          name: 'namaSekolah',
          label: 'Nama Sekolah/Universitas',
          type: 'text',
          required: true,
          icon: 'GraduationCap',
          step: 3,
          order: 1,
          gridCols: 2
        },
        {
          id: 'jurusan',
          name: 'jurusan',
          label: 'Jurusan',
          type: 'text',
          required: false,
          icon: 'GraduationCap',
          step: 3,
          order: 2,
          gridCols: 2
        },
        {
          id: 'tahunMasuk',
          name: 'tahunMasuk',
          label: 'Tahun Masuk',
          type: 'number',
          required: false,
          icon: 'Calendar',
          step: 3,
          order: 3,
          gridCols: 2
        },
        {
          id: 'tahunLulus',
          name: 'tahunLulus',
          label: 'Tahun Lulus',
          type: 'number',
          required: false,
          icon: 'Calendar',
          step: 3,
          order: 4,
          gridCols: 2
        },
        {
          id: 'ipk',
          name: 'ipk',
          label: 'IPK/Nilai Rata-rata',
          type: 'text',
          required: false,
          placeholder: '3.50',
          icon: 'GraduationCap',
          step: 3,
          order: 5,
          gridCols: 2
        }
      ]
    },
    {
      id: 'experience',
      title: 'Pengalaman',
      icon: 'Briefcase',
      color: 'from-red-400 to-red-500',
      fields: [
        {
          id: 'pengalamanKerja',
          name: 'pengalamanKerja',
          label: 'Apakah Anda memiliki pengalaman kerja?',
          type: 'boolean',
          required: false,
          icon: 'Briefcase',
          step: 4,
          order: 0,
          gridCols: 1
        },
        {
          id: 'pengalamanLeasing',
          name: 'pengalamanLeasing',
          label: 'Apakah Anda memiliki pengalaman di bidang leasing?',
          type: 'boolean',
          required: false,
          icon: 'Briefcase',
          step: 4,
          order: 1,
          gridCols: 1
        },
        {
          id: 'namaPerusahaan',
          name: 'namaPerusahaan',
          label: 'Nama Perusahaan',
          type: 'text',
          required: false,
          icon: 'Building2',
          step: 4,
          order: 2,
          gridCols: 2
        },
        {
          id: 'posisiJabatan',
          name: 'posisiJabatan',
          label: 'Posisi/Jabatan',
          type: 'text',
          required: false,
          icon: 'Briefcase',
          step: 4,
          order: 3,
          gridCols: 2
        },
        {
          id: 'periodeKerja',
          name: 'periodeKerja',
          label: 'Periode Kerja',
          type: 'text',
          required: false,
          placeholder: 'Jan 2020 - Des 2023',
          icon: 'Calendar',
          step: 4,
          order: 4,
          gridCols: 2
        },
        {
          id: 'deskripsiTugas',
          name: 'deskripsiTugas',
          label: 'Deskripsi Tugas',
          type: 'textarea',
          required: false,
          rows: 3,
          icon: 'FileText',
          step: 4,
          order: 5,
          gridCols: 1
        }
      ]
    },
    {
      id: 'documents',
      title: 'Dokumen',
      icon: 'FileText',
      color: 'from-teal-400 to-teal-500',
      fields: [
        {
          id: 'kendaraanPribadi',
          name: 'kendaraanPribadi',
          label: 'Apakah Anda memiliki kendaraan pribadi?',
          type: 'boolean',
          required: false,
          icon: 'Car',
          step: 5,
          order: 0,
          gridCols: 2
        },
        {
          id: 'ktpAsli',
          name: 'ktpAsli',
          label: 'Apakah Anda memiliki KTP Asli?',
          type: 'boolean',
          required: false,
          icon: 'User',
          step: 5,
          order: 1,
          gridCols: 2
        },
        {
          id: 'simC',
          name: 'simC',
          label: 'Apakah Anda memiliki SIM C?',
          type: 'boolean',
          required: false,
          icon: 'Car',
          step: 5,
          order: 2,
          gridCols: 2
        },
        {
          id: 'simA',
          name: 'simA',
          label: 'Apakah Anda memiliki SIM A?',
          type: 'boolean',
          required: false,
          icon: 'Car',
          step: 5,
          order: 3,
          gridCols: 2
        },
        {
          id: 'skck',
          name: 'skck',
          label: 'Apakah Anda memiliki SKCK?',
          type: 'boolean',
          required: false,
          icon: 'FileText',
          step: 5,
          order: 4,
          gridCols: 2
        },
        {
          id: 'npwp',
          name: 'npwp',
          label: 'Apakah Anda memiliki NPWP?',
          type: 'boolean',
          required: false,
          icon: 'CreditCard',
          step: 5,
          order: 5,
          gridCols: 2
        },
        {
          id: 'riwayatBurukKredit',
          name: 'riwayatBurukKredit',
          label: 'Apakah Anda memiliki riwayat buruk kredit?',
          type: 'boolean',
          required: false,
          icon: 'CreditCard',
          step: 5,
          order: 6,
          gridCols: 1
        },
        {
          id: 'alasanMelamar',
          name: 'alasanMelamar',
          label: 'Alasan Melamar',
          type: 'textarea',
          required: true,
          rows: 4,
          maxLength: 500,
          placeholder: 'Jelaskan mengapa Anda tertarik dengan posisi ini dan perusahaan kami...',
          icon: 'FileText',
          step: 5,
          order: 7,
          gridCols: 1
        }
      ]
    }
  ],
  clients: [
    { 
      id: 'adira', 
      name: 'ADIRA', 
      positions: [
        'Sales Officer - CMO',
        'Collection Remedial Officer', 
        'Relationship Officer (RO)',
        'CUSTOMER SERVICE STAFF',
        'DATA ADMIN STAFF',
        'GENERAL ADMIN STAFF',
        'TELLER',
        'CLUSTER COLLECTION SUPPORT',
        'REGIONAL COLLECTION SUPPORT',
        'REGIONAL CREDIT ADMIN',
        'REGIONAL CREDIT SUPPORT',
        'REGIONAL TELESURVEYOR',
        'AREA RECOVERY ADMIN',
        'COLLATERAL STAFF',
        'PAYMENT PROCESSOR STAFF',
        'REGIONAL MESSENGER STAFF',
        'WAREHOUSE STAFF',
        'MKT ADMIN'
      ], 
      isActive: true 
    },
    { 
      id: 'sms', 
      name: 'SMS', 
      positions: [
        'Sales Officer - CMO',
        'Collection Remedial Officer',
        'Relationship Officer (RO)',
        'CUSTOMER SERVICE STAFF'
      ], 
      isActive: true 
    },
    { 
      id: 'wom', 
      name: 'WOM', 
      positions: [
        'Sales Officer - CMO',
        'Collection Remedial Officer',
        'CUSTOMER SERVICE STAFF'
      ], 
      isActive: true 
    },
    { 
      id: 'fif', 
      name: 'FIF', 
      positions: [
        'Sales Officer - CMO',
        'Collection Remedial Officer',
        'CUSTOMER SERVICE STAFF'
      ], 
      isActive: true 
    }
  ],
  locations: [
    { 
      id: 'jakarta', 
      name: 'JAKARTA', 
      details: {
        ADIRA: ['ADIRA TEBET MOTOR', 'ADIRA TEBET MOBIL', 'ADIRA KELAPA GADING MOTOR', 'ADIRA KELAPA GADING MOBIL', 'ADIRA BACK OFFICE JAKARTA'],
        SMS: ['SMS FINANCE JAKARTA TIMUR', 'SMS FINANCE JAKARTA UTARA', 'SMS FINANCE JAKARTA SELATAN'],
        WOM: ['WOM FINANCE JAKARTA PUSAT', 'WOM FINANCE JAKARTA BARAT'],
        FIF: ['FIF GROUP JAKARTA PUSAT', 'FIF GROUP JAKARTA TIMUR']
      },
      isActive: true 
    },
    { 
      id: 'bogor', 
      name: 'BOGOR', 
      details: {
        ADIRA: ['ADIRA BOGOR MOTOR', 'ADIRA BOGOR MOBIL'],
        SMS: ['SMS FINANCE BOGOR'],
        WOM: ['WOM FINANCE BOGOR'],
        FIF: ['FIF GROUP BOGOR']
      },
      isActive: true 
    },
    { 
      id: 'depok', 
      name: 'DEPOK', 
      details: {
        ADIRA: ['ADIRA DEPOK MOTOR', 'ADIRA DEPOK MOBIL'],
        SMS: ['SMS FINANCE DEPOK'],
        WOM: ['WOM FINANCE DEPOK'],
        FIF: ['FIF GROUP DEPOK']
      },
      isActive: true 
    },
    { 
      id: 'bekasi', 
      name: 'BEKASI', 
      details: {
        ADIRA: ['ADIRA BEKASI MOTOR', 'ADIRA BEKASI MOBIL', 'ADIRA PONDOK GEDE'],
        SMS: ['SMS FINANCE BEKASI'],
        WOM: ['WOM FINANCE BEKASI'],
        FIF: ['FIF GROUP BEKASI']
      },
      isActive: true 
    },
    { 
      id: 'tangerang', 
      name: 'TANGERANG', 
      details: {
        ADIRA: ['ADIRA TANGERANG MOTOR', 'ADIRA TANGERANG MOBIL', 'ADIRA KETAPANG'],
        SMS: ['SMS FINANCE TANGERANG'],
        WOM: ['WOM FINANCE TANGERANG'],
        FIF: ['FIF GROUP TANGERANG']
      },
      isActive: true 
    }
  ],
  positionPlacements: {
    'Sales Officer - CMO': [
      'ADIRA TEBET MOTOR',
      'ADIRA KELAPA GADING MOTOR',
      'ADIRA TEBET MOBIL',
      'ADIRA KELAPA GADING MOBIL',
      'ADIRA BACK OFFICE JAKARTA',
      'ADIRA BOGOR MOTOR',
      'ADIRA DEPOK MOTOR',
      'ADIRA BEKASI MOTOR',
      'ADIRA TANGERANG MOTOR'
    ],
    'Collection Remedial Officer': [
      'ADIRA BACK OFFICE JAKARTA',
      'SMS FINANCE JAKARTA TIMUR',
      'WOM FINANCE JAKARTA PUSAT',
      'FIF GROUP JAKARTA PUSAT'
    ],
    'Relationship Officer (RO)': [
      'ADIRA BACK OFFICE JAKARTA',
      'SMS FINANCE JAKARTA TIMUR',
      'WOM FINANCE JAKARTA PUSAT'
    ],
    'CUSTOMER SERVICE STAFF': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'DATA ADMIN STAFF': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'GENERAL ADMIN STAFF': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'TELLER': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'CLUSTER COLLECTION SUPPORT': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'REGIONAL COLLECTION SUPPORT': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'REGIONAL CREDIT ADMIN': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'REGIONAL CREDIT SUPPORT': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'REGIONAL TELESURVEYOR': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'AREA RECOVERY ADMIN': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'COLLATERAL STAFF': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'PAYMENT PROCESSOR STAFF': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'REGIONAL MESSENGER STAFF': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'WAREHOUSE STAFF': [
      'ADIRA BACK OFFICE JAKARTA'
    ],
    'MKT ADMIN': [
      'ADIRA BACK OFFICE JAKARTA'
    ]
  }
};