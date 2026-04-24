import { Patient, RoomType } from "@/types/patient";

const ROOM_TYPES: RoomType[] = ["VIP", "Kelas 1", "Kelas 2", "Kelas 3", "ICU", "PICU", "NICU"];

const DOCTORS = [
  "dr. Andi Setiawan, Sp.PD",
  "dr. Budi Santoso, Sp.B",
  "dr. Citra Dewi, Sp.A",
  "dr. Dian Purnama, Sp.JP",
  "dr. Eka Rahayu, Sp.OG",
  "dr. Fajar Nugroho, Sp.N",
  "dr. Gita Savitri, Sp.M",
];

const DIAGNOSES = [
  "Demam Berdarah Dengue (DBD)",
  "Pneumonia",
  "Appendisitis Akut",
  "Diabetes Melitus Tipe 2 dengan Komplikasi",
  "Infark Miokard Akut",
  "Stroke Iskemik",
  "Fraktur Femur",
  "Hipertensi Emergency",
  "Gagal Jantung Kongestif",
  "Sepsis",
  "Gastroenteritis Akut",
  "Bronkitis Akut",
];

function generateNIK(index: number): string {
  const base = "3201";
  const padded = String(index + 1).padStart(12, "0");
  return (base + padded).slice(0, 16);
}

function generateDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "P001",
    nama: "Agus Salim",
    nik: generateNIK(0),
    diagnosamasuk: DIAGNOSES[0],
    tanggalmasuk: generateDate(5),
    dokterpenanggungjawab: DOCTORS[0],
    ruangan: ROOM_TYPES[0],
    status: "aktif",
  },
  {
    id: "P002",
    nama: "Budi Raharjo",
    nik: generateNIK(1),
    diagnosamasuk: DIAGNOSES[1],
    tanggalmasuk: generateDate(3),
    dokterpenanggungjawab: DOCTORS[1],
    ruangan: ROOM_TYPES[1],
    status: "aktif",
  },
  {
    id: "P003",
    nama: "Citra Kusuma",
    nik: generateNIK(2),
    diagnosamasuk: DIAGNOSES[2],
    tanggalmasuk: generateDate(7),
    dokterpenanggungjawab: DOCTORS[2],
    ruangan: ROOM_TYPES[2],
    status: "aktif",
  },
  {
    id: "P004",
    nama: "Dewi Anggraini",
    nik: generateNIK(3),
    diagnosamasuk: DIAGNOSES[3],
    tanggalmasuk: generateDate(1),
    dokterpenanggungjawab: DOCTORS[3],
    ruangan: ROOM_TYPES[3],
    status: "aktif",
  },
  {
    id: "P005",
    nama: "Eko Prasetyo",
    nik: generateNIK(4),
    diagnosamasuk: DIAGNOSES[4],
    tanggalmasuk: generateDate(10),
    dokterpenanggungjawab: DOCTORS[4],
    ruangan: ROOM_TYPES[4],
    status: "aktif",
  },
  {
    id: "P006",
    nama: "Fitri Handayani",
    nik: generateNIK(5),
    diagnosamasuk: DIAGNOSES[5],
    tanggalmasuk: generateDate(2),
    dokterpenanggungjawab: DOCTORS[5],
    ruangan: ROOM_TYPES[5],
    status: "aktif",
  },
  {
    id: "P007",
    nama: "Gilang Ramadhan",
    nik: generateNIK(6),
    diagnosamasuk: DIAGNOSES[6],
    tanggalmasuk: generateDate(8),
    dokterpenanggungjawab: DOCTORS[6],
    ruangan: ROOM_TYPES[6],
    status: "aktif",
  },
  {
    id: "P008",
    nama: "Hana Pertiwi",
    nik: generateNIK(7),
    diagnosamasuk: DIAGNOSES[7],
    tanggalmasuk: generateDate(4),
    dokterpenanggungjawab: DOCTORS[0],
    ruangan: ROOM_TYPES[0],
    status: "aktif",
  },
  {
    id: "P009",
    nama: "Irwan Susanto",
    nik: generateNIK(8),
    diagnosamasuk: DIAGNOSES[8],
    tanggalmasuk: generateDate(6),
    dokterpenanggungjawab: DOCTORS[1],
    ruangan: ROOM_TYPES[1],
    status: "aktif",
  },
  {
    id: "P010",
    nama: "Joko Widodo",
    nik: generateNIK(9),
    diagnosamasuk: DIAGNOSES[9],
    tanggalmasuk: generateDate(0),
    dokterpenanggungjawab: DOCTORS[2],
    ruangan: ROOM_TYPES[2],
    status: "aktif",
  },
  {
    id: "P011",
    nama: "Kartika Sari",
    nik: generateNIK(10),
    diagnosamasuk: DIAGNOSES[10],
    tanggalmasuk: generateDate(9),
    dokterpenanggungjawab: DOCTORS[3],
    ruangan: ROOM_TYPES[3],
    status: "aktif",
  },
  {
    id: "P012",
    nama: "Lukman Hakim",
    nik: generateNIK(11),
    diagnosamasuk: DIAGNOSES[11],
    tanggalmasuk: generateDate(12),
    dokterpenanggungjawab: DOCTORS[4],
    ruangan: ROOM_TYPES[4],
    status: "aktif",
  },
];

let patientStore: Patient[] = [...MOCK_PATIENTS];

export async function fetchPatients(): Promise<Patient[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...patientStore];
}

export async function addPatient(data: Omit<Patient, "id" | "status">): Promise<Patient> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newPatient: Patient = {
    ...data,
    id: `P${String(patientStore.length + 1).padStart(3, "0")}`,
    status: "aktif",
  };
  patientStore = [newPatient, ...patientStore];
  return newPatient;
}

export async function updatePatient(id: string, data: Omit<Patient, "id" | "status">): Promise<Patient> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = patientStore.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Pasien tidak ditemukan");
  const updated: Patient = { ...patientStore[index], ...data };
  patientStore = patientStore.map((p) => (p.id === id ? updated : p));
  return updated;
}

export async function deletePatient(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const exists = patientStore.some((p) => p.id === id);
  if (!exists) throw new Error("Pasien tidak ditemukan");
  patientStore = patientStore.filter((p) => p.id !== id);
}
