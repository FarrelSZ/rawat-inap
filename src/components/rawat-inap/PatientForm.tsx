import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientFormValues, RoomType } from "@/types/patient";
import {
  Loader2,
  User,
  CreditCard,
  Stethoscope,
  CalendarDays,
  UserCheck,
  BedDouble,
  AlertCircle,
  Pencil,
} from "lucide-react";

const ROOM_OPTIONS: RoomType[] = ["VIP", "Kelas 1", "Kelas 2", "Kelas 3", "ICU", "PICU", "NICU"];

const ROOM_LABELS: Record<RoomType, string> = {
  VIP: "VIP – Ruangan Premium",
  "Kelas 1": "Kelas 1",
  "Kelas 2": "Kelas 2",
  "Kelas 3": "Kelas 3",
  ICU: "ICU – Intensive Care Unit",
  PICU: "PICU – Pediatric ICU",
  NICU: "NICU – Neonatal ICU",
};

const DOCTOR_OPTIONS = [
  "dr. Andi Setiawan, Sp.PD",
  "dr. Budi Santoso, Sp.B",
  "dr. Citra Dewi, Sp.A",
  "dr. Dian Purnama, Sp.JP",
  "dr. Eka Rahayu, Sp.OG",
  "dr. Fajar Nugroho, Sp.N",
  "dr. Gita Savitri, Sp.M",
];

const patientSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter").max(100, "Nama maksimal 100 karakter"),
  nik: z
    .string()
    .length(16, "NIK harus tepat 16 digit")
    .regex(/^\d{16}$/, "NIK hanya boleh berisi angka"),
  diagnosamasuk: z.string().min(5, "Diagnosa minimal 5 karakter").max(255, "Diagnosa maksimal 255 karakter"),
  tanggalmasuk: z.string().min(1, "Tanggal masuk wajib diisi"),
  dokterpenanggungjawab: z.string().min(1, "Dokter penanggung jawab wajib dipilih"),
  ruangan: z.enum(["VIP", "Kelas 1", "Kelas 2", "Kelas 3", "ICU", "PICU", "NICU"] as const, {
    error: "Ruangan wajib dipilih",
  }),
});

interface PatientFormProps {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  initialValues?: PatientFormValues;
  mode?: "add" | "edit";
}

function SectionHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

export function PatientForm({ onSubmit, onCancel, isSubmitting, initialValues, mode = "add" }: PatientFormProps) {
  const today = new Date().toISOString().split("T")[0];

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialValues ?? {
      nama: "",
      nik: "",
      diagnosamasuk: "",
      tanggalmasuk: today,
      dokterpenanggungjawab: "",
      ruangan: undefined,
    },
  });

  const nikValue = form.watch("nik");

  return (
    <div className="mx-auto max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* ── Section 1: Data Identitas ── */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <SectionHeading
              icon={<User className="h-4 w-4" />}
              title="Data Identitas Pasien"
              subtitle="Informasi dasar dan identitas kependudukan pasien"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Nama */}
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap sesuai KTP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NIK */}
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="flex items-center gap-1.5">
                      <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                      Nomor Induk Kependudukan (NIK)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="16 digit angka"
                          maxLength={16}
                          className="pr-16 font-mono"
                          {...field}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            field.onChange(val);
                          }}
                        />
                        <span
                          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums ${
                            nikValue.length === 16 ? "text-green-600 font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {nikValue.length}/16
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ── Section 2: Data Medis ── */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <SectionHeading
              icon={<Stethoscope className="h-4 w-4" />}
              title="Data Medis"
              subtitle="Informasi klinis dan diagnosa saat masuk rawat inap"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Diagnosa */}
              <FormField
                control={form.control}
                name="diagnosamasuk"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="flex items-center gap-1.5">
                      <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
                      Diagnosa Masuk
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Demam Berdarah Dengue (DBD) derajat II" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal Masuk */}
              <FormField
                control={form.control}
                name="tanggalmasuk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                      Tanggal Masuk
                    </FormLabel>
                    <FormControl>
                      <Input type="date" max={today} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ruangan */}
              <FormField
                control={form.control}
                name="ruangan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <BedDouble className="h-3.5 w-3.5 text-muted-foreground" />
                      Ruangan
                    </FormLabel>
                    <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih ruangan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROOM_OPTIONS.map((room) => (
                          <SelectItem key={room} value={room}>
                            {ROOM_LABELS[room]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ── Section 3: Data Administrasi ── */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <SectionHeading
              icon={<UserCheck className="h-4 w-4" />}
              title="Data Administrasi"
              subtitle="Dokter penanggung jawab dan informasi administratif"
            />

            {/* Dokter PJ */}
            <FormField
              control={form.control}
              name="dokterpenanggungjawab"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-muted-foreground" />
                    Dokter Penanggung Jawab
                  </FormLabel>
                  <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih dokter penanggung jawab" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DOCTOR_OPTIONS.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>
                          {doctor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ── Actions ── */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : mode === "edit" ? (
                <>
                  <Pencil className="h-4 w-4" />
                  Simpan Perubahan
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4" />
                  Simpan & Daftarkan Pasien
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
