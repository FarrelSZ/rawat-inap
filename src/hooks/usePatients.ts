import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPatient, deletePatient, fetchPatients, updatePatient } from "@/lib/mock-data";
import { Patient, PatientFormValues } from "@/types/patient";

export const PATIENTS_QUERY_KEY = ["patients"] as const;

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: PATIENTS_QUERY_KEY,
    queryFn: fetchPatients,
    staleTime: 0,
  });
}

export function useAddPatient() {
  const queryClient = useQueryClient();

  return useMutation<Patient, Error, PatientFormValues>({
    mutationFn: (values) =>
      addPatient({
        nama: values.nama,
        nik: values.nik,
        diagnosamasuk: values.diagnosamasuk,
        tanggalmasuk: values.tanggalmasuk,
        dokterpenanggungjawab: values.dokterpenanggungjawab,
        ruangan: values.ruangan,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation<Patient, Error, { id: string; values: PatientFormValues }>({
    mutationFn: ({ id, values }) =>
      updatePatient(id, {
        nama: values.nama,
        nik: values.nik,
        diagnosamasuk: values.diagnosamasuk,
        tanggalmasuk: values.tanggalmasuk,
        dokterpenanggungjawab: values.dokterpenanggungjawab,
        ruangan: values.ruangan,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
    },
  });
}
