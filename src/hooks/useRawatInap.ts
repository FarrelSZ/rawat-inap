import { useState } from "react";
import { toast } from "sonner";
import { useAddPatient, usePatients } from "./usePatients";
import { PatientFormValues, View } from "@/types/patient";

export function useRawatInap() {
  const [view, setView] = useState<View>("list");

  const { data: patients = [], isLoading } = usePatients();
  const addPatientMutation = useAddPatient();

  async function handleFormSubmit(values: PatientFormValues) {
    try {
      await addPatientMutation.mutateAsync(values);
      toast.success("Pasien berhasil didaftarkan", {
        description: `${values.nama} telah terdaftar di rawat inap.`,
      });
      setView("list");
    } catch {
      toast.error("Gagal mendaftarkan pasien", {
        description: "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  }

  return {
    view,
    setView,
    patients,
    isLoading,
    handleFormSubmit,
    isSubmitting: addPatientMutation.isPending,
  };
}
