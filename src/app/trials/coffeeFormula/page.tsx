"use client";

import { SearchLocations } from "@/app/components/pages/SearchLocations";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { useNextTrial } from "@/app/lib/useNextTrial";
import { BasicTrial } from "@/app/components/pages/BasicTrial";

export default function TrialOnePage() {
  const goToNextTrial = useNextTrial();

  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Souvenirs du lycée..." />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
        <BasicTrial label="Retrouvez la formule chimique du café !" correctAnswer={"C8h10n4o2"} onSuccess={() => goToNextTrial(7)}/>
        </div>
      </section>
    </main>
  );
}