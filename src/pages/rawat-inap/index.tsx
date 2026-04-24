import Head from "next/head";
import { useRawatInap } from "@/hooks/useRawatInap";
import { PageHeader } from "@/components/rawat-inap/PageHeader";
import { ListView } from "@/components/rawat-inap/ListView";
import { FormView } from "@/components/rawat-inap/FormView";

export default function RawatInapPage() {
  const {
    view,
    setView,
    patients,
    isLoading,
    editingPatient,
    handleFormSubmit,
    handleEditPatient,
    handleDeletePatient,
    handleCancel,
    isSubmitting,
  } = useRawatInap();

  return (
    <>
      <Head>
        <title>Rawat Inap – Pasien Masuk | SIMRS</title>
      </Head>

      <div className="min-h-screen bg-muted/40">
        <PageHeader view={view} onBack={handleCancel} />

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          {view === "list" ? (
            <ListView
              patients={patients}
              isLoading={isLoading}
              onRegister={() => setView("form")}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          ) : (
            <FormView
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
              editingPatient={editingPatient}
            />
          )}
        </main>
      </div>
    </>
  );
}
