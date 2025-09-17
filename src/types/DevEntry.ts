export interface DevEntry {
  id: string;
  name: string;
  formData: FormData;
  metadata: {
    isUrgent: boolean;
    isRecommended: boolean;
    hiddenFields: string[];
    createdAt: string;
    lastModified: string;
  };
}

export interface DevSettings {
  skipSplashScreen: boolean;
  skipLoadingScreen: boolean;
  showDebugInfo: boolean;
  autoFillEnabled: boolean;
}

export interface FormData {
  // Step 1: Client, Posisi & Penempatan
  client: string;
  posisiDilamar: string;
  penempatan: string;
  detailPenempatan: string;
  
  // Step 2: Data Pribadi
  namaLengkap: string;
  nik: string;
  noHp: string;
  tempatLahir: string;
  tanggalLahir: string;
  umur: string;
  jenisKelamin: string;
  statusPerkawinan: string;
  agama: string;
  namaAyah: string;
  namaIbu: string;
  
  // Step 3: Alamat
  alamatKtp: string;
  alamatDomisili: string;
  rtRw: string;
  nomorRumah: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  kodePos: string;
  
  // Step 4: Pendidikan
  tingkatPendidikan: string;
  namaSekolah: string;
  jurusan: string;
  tahunMasuk: string;
  tahunLulus: string;
  ipk: string;
  
  // Step 5: Pengalaman Kerja
  pengalamanKerja: boolean;
  pengalamanLeasing: boolean;
  namaPerusahaan: string;
  posisiJabatan: string;
  periodeKerja: string;
  deskripsiTugas: string;
  
  // Step 6: Dokumen & Persyaratan
  kendaraanPribadi: boolean;
  ktpAsli: boolean;
  simC: boolean;
  simA: boolean;
  skck: boolean;
  npwp: boolean;
  riwayatBurukKredit: boolean;
  alasanMelamar: string;
  cvFile: File | null;
}