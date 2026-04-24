import { Button } from "@/components/ui/button";
import { PatientTable } from "./PatientTable";
import { Patient } from "@/types/patient";
import { PlusCircle } from "lucide-react";

interface ListViewProps {
  patients: Patient[];
  isLoading: boolean;
  onRegister: () => void;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patient: Patient) => void;
}

export function ListView({ patients, isLoading, onRegister, onEdit, onDelete }: ListViewProps) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Rawat Inap</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manajemen pasien masuk dan daftar pasien aktif</p>
      </div>

      <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Daftar Pasien Aktif</h2>
          <Button size="sm" onClick={onRegister}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Daftarkan Pasien</span>
            <span className="sm:hidden">Tambah</span>
          </Button>
        </div>
        <PatientTable patients={patients} isLoading={isLoading} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </>
  );
}
