import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hospital, Home, ArrowLeft, ChevronRight } from "lucide-react";
import { View } from "@/types/patient";

interface PageHeaderProps {
  view: View;
  onBack: () => void;
}

export function PageHeader({ view, onBack }: PageHeaderProps) {
  return (
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
          {view === "form" && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
