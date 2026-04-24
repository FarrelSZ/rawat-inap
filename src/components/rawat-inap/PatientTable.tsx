import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import { Patient, SortDirection, SortField, SortState } from "@/types/patient";
import { ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2, AlertTriangle } from "lucide-react";

const PAGE_SIZE = 10;

interface PatientTableProps {
  patients: Patient[];
  isLoading: boolean;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patient: Patient) => void;
}

function SortIcon({ field, sort }: { field: SortField; sort: SortState }) {
  if (sort.field !== field) return <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-muted-foreground" />;
  return sort.direction === "asc" ? (
    <ArrowUp className="ml-1 h-3.5 w-3.5" />
  ) : (
    <ArrowDown className="ml-1 h-3.5 w-3.5" />
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getRuanganVariant(ruangan: Patient["ruangan"]): "default" | "secondary" | "destructive" | "outline" {
  if (ruangan === "ICU" || ruangan === "PICU" || ruangan === "NICU") return "destructive";
  if (ruangan === "VIP") return "default";
  return "secondary";
}

function SkeletonRow() {
  return (
    <TableRow>
      {[32, 140, 120, 160, 100, 140, 64, 56, 80].map((w, i) => (
        <TableCell key={i}>
          <div className="h-4 animate-pulse rounded bg-muted" style={{ width: w }} />
        </TableCell>
      ))}
    </TableRow>
  );
}

export function PatientTable({ patients, isLoading, onEdit, onDelete }: PatientTableProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortState>({
    field: "tanggalmasuk",
    direction: "desc",
  });
  const [page, setPage] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  function toggleSort(field: SortField) {
    setSort((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { field, direction: "asc" };
    });
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return patients;
    return patients.filter((p) => p.nama.toLowerCase().includes(q) || p.nik.includes(q));
  }, [patients, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const dir: SortDirection = sort.direction;
      if (sort.field === "nama") {
        const cmp = a.nama.localeCompare(b.nama, "id");
        return dir === "asc" ? cmp : -cmp;
      }
      const cmp = a.tanggalmasuk.localeCompare(b.tanggalmasuk);
      return dir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* Search + result count */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={handleSearch} placeholder="Cari nama atau NIK pasien..." />
        {!isLoading && (
          <p className="shrink-0 text-xs text-muted-foreground">
            {search ? `${sorted.length} hasil dari ${patients.length} pasien` : `${patients.length} pasien terdaftar`}
          </p>
        )}
      </div>

      {/* Table */}
      {isLoading || sorted.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-2 h-7 font-semibold text-xs uppercase tracking-wide"
                      onClick={() => toggleSort("nama")}
                    >
                      Nama Pasien
                      <SortIcon field="nama" sort={sort} />
                    </Button>
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">NIK</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Diagnosa</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-2 h-7 font-semibold text-xs uppercase tracking-wide"
                      onClick={() => toggleSort("tanggalmasuk")}
                    >
                      Tgl Masuk
                      <SortIcon field="tanggalmasuk" sort={sort} />
                    </Button>
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Dokter PJ</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Ruangan</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonRow key={i} />)
                  : paginated.map((patient, idx) => (
                      <TableRow key={patient.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="text-center text-xs text-muted-foreground tabular-nums">
                          {(page - 1) * PAGE_SIZE + idx + 1}
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-sm">{patient.nama}</p>
                          <p className="text-xs text-muted-foreground font-mono sm:hidden">{patient.nik}</p>
                        </TableCell>
                        <TableCell className="hidden font-mono text-xs sm:table-cell">{patient.nik}</TableCell>
                        <TableCell className="max-w-40 truncate text-sm" title={patient.diagnosamasuk}>
                          {patient.diagnosamasuk}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm">{formatDate(patient.tanggalmasuk)}</TableCell>
                        <TableCell className="max-w-36 truncate text-sm" title={patient.dokterpenanggungjawab}>
                          {patient.dokterpenanggungjawab}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRuanganVariant(patient.ruangan)} className="text-xs whitespace-nowrap">
                            {patient.ruangan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-xs whitespace-nowrap border-green-300 bg-green-50 text-green-700"
                          >
                            Aktif
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {confirmDeleteId === patient.id ? (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0" />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => {
                                  onDelete?.(patient);
                                  setConfirmDeleteId(null);
                                }}
                              >
                                Hapus
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => setConfirmDeleteId(null)}
                              >
                                Batal
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                title="Edit pasien"
                                onClick={() => onEdit?.(patient)}
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                title="Hapus pasien"
                                onClick={() => setConfirmDeleteId(patient.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>

          {!isLoading && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={sorted.length}
              pageSize={PAGE_SIZE}
            />
          )}
        </>
      ) : (
        <EmptyState
          title={search ? "Pasien tidak ditemukan" : "Belum ada pasien aktif"}
          description={
            search
              ? `Tidak ada pasien yang cocok dengan pencarian "${search}"`
              : "Mulai dengan mendaftarkan pasien rawat inap baru."
          }
        />
      )}
    </div>
  );
}
