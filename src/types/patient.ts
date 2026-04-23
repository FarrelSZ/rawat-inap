export type Gender = "L" | "P";

export type RoomType = "VIP" | "Kelas 1" | "Kelas 2" | "Kelas 3" | "ICU" | "PICU" | "NICU";

export interface Patient {
  id: string;
  nama: string;
  nik: string;
  diagnosamasuk: string;
  tanggalmasuk: string; // ISO date string
  dokterpenanggungjawab: string;
  ruangan: RoomType;
  status: "aktif" | "pulang";
}

export interface PatientFormValues {
  nama: string;
  nik: string;
  diagnosamasuk: string;
  tanggalmasuk: string;
  dokterpenanggungjawab: string;
  ruangan: RoomType;
}

export type SortField = "nama" | "tanggalmasuk";
export type SortDirection = "asc" | "desc";

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export interface PaginationState {
  page: number;
  pageSize: number;
}
