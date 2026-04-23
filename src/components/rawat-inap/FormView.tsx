import { PatientForm } from "./PatientForm";
import { PatientFormValues } from "@/types/patient";

interface FormViewProps {
  onSubmit: (values: PatientFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function FormView({ onSubmit, onCancel, isSubmitting }: FormViewProps) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Pendaftaran Pasien Baru</h1>
        <p className="mt-1 text-sm text-muted-foreground">Lengkapi seluruh data pasien yang akan masuk rawat inap</p>
      </div>
      <PatientForm onSubmit={onSubmit} onCancel={onCancel} isSubmitting={isSubmitting} />
    </>
  );
}
