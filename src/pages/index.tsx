import Head from "next/head";
import Link from "next/link";
import { Geist } from "next/font/google";
import {
  BedDouble,
  Activity,
  Users,
  ClipboardList,
  Pill,
  FlaskConical,
  ChevronRight,
  Hospital,
  Clock,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const geist = Geist({ subsets: ["latin"] });

interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
  available?: boolean;
}

function ModuleCard({ icon, title, description, href, badge, available = true }: ModuleCardProps) {
  const inner = (
    <Card
      className={`group relative h-full overflow-hidden border transition-all duration-200 ${
        available ? "hover:border-foreground/20 hover:shadow-md cursor-pointer" : "opacity-60 cursor-not-allowed"
      }`}
    >
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
              available
                ? "bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {icon}
          </div>
          {badge && (
            <Badge variant={available ? "default" : "secondary"} className="text-xs shrink-0">
              {badge}
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-tight">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
        {available && (
          <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Buka modul
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        )}
        {!available && <p className="text-xs text-muted-foreground">Segera hadir</p>}
      </CardContent>
    </Card>
  );

  if (!available) return <div>{inner}</div>;
  return <Link href={href}>{inner}</Link>;
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  sub?: string;
}

function StatCard({ label, value, icon, sub }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card px-5 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="text-xl font-bold leading-tight">{value}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

const MODULES: ModuleCardProps[] = [
  {
    icon: <BedDouble className="h-5 w-5" />,
    title: "Rawat Inap",
    description: "Pendaftaran pasien masuk, daftar pasien aktif, dan manajemen ruangan.",
    href: "/rawat-inap",
    badge: "Aktif",
    available: true,
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Rawat Jalan",
    description: "Manajemen antrian, jadwal poli, dan rekam medis kunjungan harian.",
    href: "/rawat-jalan",
    badge: "Segera",
    available: false,
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Data Pasien",
    description: "Riwayat lengkap pasien, rekam medis elektronik, dan dokumen medis.",
    href: "/pasien",
    badge: "Segera",
    available: false,
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Rekam Medis",
    description: "Input diagnosa, tindakan medis, SOAP, dan resume pasien pulang.",
    href: "/rekam-medis",
    badge: "Segera",
    available: false,
  },
  {
    icon: <Pill className="h-5 w-5" />,
    title: "Farmasi",
    description: "Manajemen stok obat, resep digital, dan riwayat penggunaan obat.",
    href: "/farmasi",
    badge: "Segera",
    available: false,
  },
  {
    icon: <FlaskConical className="h-5 w-5" />,
    title: "Laboratorium",
    description: "Permintaan lab, hasil pemeriksaan, dan integrasi dengan rekam medis.",
    href: "/laboratorium",
    badge: "Segera",
    available: false,
  },
];

const STATS: StatCardProps[] = [
  {
    label: "Pasien Rawat Inap",
    value: "12",
    icon: <BedDouble className="h-5 w-5" />,
    sub: "Hari ini",
  },
  {
    label: "Tingkat Hunian",
    value: "74%",
    icon: <TrendingUp className="h-5 w-5" />,
    sub: "Dari kapasitas total",
  },
  {
    label: "Rata-rata LOS",
    value: "4.2 hr",
    icon: <Clock className="h-5 w-5" />,
    sub: "Length of stay",
  },
  {
    label: "Akreditasi",
    value: "Paripurna",
    icon: <ShieldCheck className="h-5 w-5" />,
    sub: "KARS 2024",
  },
];

export default function Home() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Head>
        <title>SIMRS – Sistem Informasi Manajemen Rumah Sakit</title>
        <meta
          name="description"
          content="Sistem Informasi Manajemen Rumah Sakit – modul rawat inap, rawat jalan, farmasi, dan laboratorium."
        />
      </Head>

      <div className={`${geist.className} min-h-screen bg-muted/30`}>
        {/* ── Header ── */}
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Hospital className="h-5 w-5" />
              </div>
              <div className="leading-none">
                <p className="font-bold text-sm">SIMRS</p>
                <p className="text-xs text-muted-foreground hidden sm:block">Sistem Informasi Manajemen Rumah Sakit</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="hidden text-xs text-muted-foreground sm:block">{today}</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {/* ── Hero ── */}
          <section className="mb-10">
            <div className="rounded-2xl border bg-card p-6 sm:p-8 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-lg">
                  <Badge variant="secondary" className="mb-3 text-xs">
                    Versi 1.0 — April 2026
                  </Badge>
                  <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    Selamat Datang di <span className="text-primary">SIMRS</span>
                  </h1>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Platform manajemen rumah sakit digital yang terintegrasi. Kelola pasien rawat inap, rawat jalan,
                    farmasi, dan laboratorium dalam satu sistem.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
                  <Link href="/rawat-inap">
                    <Button size="lg" className="w-full sm:w-auto">
                      <BedDouble className="h-4 w-4" />
                      Buka Rawat Inap
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="mt-16 border-t">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-left">
            <p>© 2026 SIMRS — Sistem Informasi Manajemen Rumah Sakit</p>
          </div>
        </footer>
      </div>
    </>
  );
}
