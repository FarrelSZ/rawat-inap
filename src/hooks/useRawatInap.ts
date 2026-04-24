import { useState } from "react";
import { toast } from "sonner";
import { useAddPatient, useDeletePatient, usePatients, useUpdatePatient } from "./usePatients";
import { Patient, PatientFormValues, View } from "@/types/patient";

export function useRawatInap() {
  const [view, setView] = useState<View>("list");
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const { data: patients = [], isLoading } = usePatients();
  const addPatientMutation = useAddPatient();
  const updatePatientMutation = useUpdatePatient();
  const deletePatientMutation = useDeletePatient();

  async function handleFormSubmit(values: PatientFormValues) {
    try {
      if (editingPatient) {
        await updatePatientMutation.mutateAsync({ id: editingPatient.id, values });
        toast.success("Data pasien berhasil diperbarui", {
          description: `Data ${values.nama} telah diperbarui.`,
        });
      } else {
        await addPatientMutation.mutateAsync(values);
        toast.success("Pasien berhasil didaftarkan", {
          description: `${values.nama} telah terdaftar di rawat inap.`,
        });
      }
      setEditingPatient(null);
      setView("list");
    } catch {
      toast.error(editingPatient ? "Gagal memperbarui data pasien" : "Gagal mendaftarkan pasien", {
        description: "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  }

  function handleEditPatient(patient: Patient) {
    setEditingPatient(patient);
    setView("form");
  }

  async function handleDeletePatient(patient: Patient) {
    try {
      await deletePatientMutation.mutateAsync(patient.id);
      toast.success("Pasien berhasil dihapus", {
        description: `Data ${patient.nama} telah dihapus dari sistem.`,
      });
    } catch {
      toast.error("Gagal menghapus pasien", {
        description: "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  }

  function handleCancel() {
    setEditingPatient(null);
    setView("list");
  }

  return {
    view,
    setView,
    patients,
    isLoading,
    editingPatient,
    handleFormSubmit,
    handleEditPatient,
    handleDeletePatient,
    handleCancel,
    isSubmitting: addPatientMutation.isPending || updatePatientMutation.isPending,
  };
}
