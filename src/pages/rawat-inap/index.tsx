import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatientForm } from "@/components/rawat-inap/PatientForm";
import { PatientTable } from "@/components/rawat-inap/PatientTable";
import { useAddPatient, usePatients } from "@/hooks/usePatients";
import { PatientFormValues } from "@/types/patient";
import { PlusCircle, Users, ArrowLeft, Hospital, Home, BedDouble, Activity, ChevronRight } from "lucide-react";
import { toast } from "sonner";

type View = "list" | "form";

export default function RawatInapPage() {
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

  const activeCount = patients.filter((p) => p.status === "aktif").length;

  return (
    <>
      <Head>
        <title>Rawat Inap – Pasien Masuk | SIMRS</title>
      </Head>

      <div className="min-h-screen bg-muted/40">
        {/* ── Sticky Header ── */}
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            {/* Left: logo + breadcrumb */}
            <div className="flex items-center gap-2 min-w-0">
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Hospital className="h-4 w-4" />
                </div>
                <span className="hidden font-bold text-sm sm:block">SIMRS</span>
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              <span className="text-sm font-medium text-muted-foreground truncate">Rawat Inap</span>
              {view === "form" && (
                <>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                  <span className="text-sm font-medium truncate">Formulir</span>
                </>
              )}
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Home className="h-3.5 w-3.5" />
                  Beranda
                </Button>
              </Link>
              {view === "list" ? (
                <Button size="sm" onClick={() => setView("form")}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Daftarkan Pasien</span>
                  <span className="sm:hidden">Tambah</span>
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setView("list")}>
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Kembali
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          {view === "list" ? (
            <>
              {/* ── Page title + stat cards ── */}
              <div className="mb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Rawat Inap</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Manajemen pasien masuk dan daftar pasien aktif</p>
                  </div>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {isLoading ? "Memuat..." : `${activeCount} pasien aktif`}
                  </Badge>
                </div>

                {/* Stat strip */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <BedDouble className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pasien Aktif</p>
                      <p className="text-lg font-bold leading-tight">{isLoading ? "—" : activeCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ICU / PICU</p>
                      <p className="text-lg font-bold leading-tight">
                        {isLoading ? "—" : patients.filter((p) => ["ICU", "PICU", "NICU"].includes(p.ruangan)).length}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-3 rounded-xl border bg-card px-4 py-3 sm:col-span-1">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Terdaftar</p>
                      <p className="text-lg font-bold leading-tight">{isLoading ? "—" : patients.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Table card ── */}
              <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">Daftar Pasien Aktif</h2>
                  <Button size="sm" onClick={() => setView("form")} className="sm:hidden">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Tambah
                  </Button>
                </div>
                <PatientTable patients={patients} isLoading={isLoading} />
              </div>
            </>
          ) : (
            <>
              {/* ── Form view header ── */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Pendaftaran Pasien Baru</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Lengkapi seluruh data pasien yang akan masuk rawat inap
                </p>
              </div>
              <PatientForm
                onSubmit={handleFormSubmit}
                onCancel={() => setView("list")}
                isSubmitting={addPatientMutation.isPending}
              />
            </>
          )}
        </main>
      </div>
    </>
  );
}
