import { PatientForm } from "./PatientForm";
import { Patient, PatientFormValues } from "@/types/patient";

interface FormViewProps {
  onSubmit: (values: PatientFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  editingPatient?: Patient | null;
}

export function FormView({ onSubmit, onCancel, isSubmitting, editingPatient }: FormViewProps) {
  const isEdit = Boolean(editingPatient);
  const initialValues: PatientFormValues | undefined = editingPatient
    ? {
        nama: editingPatient.nama,
        nik: editingPatient.nik,
        diagnosamasuk: editingPatient.diagnosamasuk,
        tanggalmasuk: editingPatient.tanggalmasuk,
        dokterpenanggungjawab: editingPatient.dokterpenanggungjawab,
        ruangan: editingPatient.ruangan,
      }
    : undefined;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {isEdit ? "Edit Data Pasien" : "Pendaftaran Pasien Baru"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEdit
            ? `Ubah data pasien atas nama ${editingPatient?.nama}`
            : "Lengkapi seluruh data pasien yang akan masuk rawat inap"}
        </p>
      </div>
      <PatientForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        initialValues={initialValues}
        mode={isEdit ? "edit" : "add"}
      />
    </>
  );
}
