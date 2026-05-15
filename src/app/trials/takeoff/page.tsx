"use client";

import { SearchLocations } from "@/app/components/pages/SearchLocations";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { useNextTrial } from "@/app/lib/useNextTrial";
import { LoadingBar } from "@/app/components/pages/loadingBar";
import { BasicTrial } from "@/app/components/pages/BasicTrial";

export default function TrialOnePage() {
  const goToNextTrial = useNextTrial();

  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Destination : Kenya !" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
          <BasicTrial 
            label="Le personnel de bord doit procéder à certaines vérifications. Assurez vous que tout est en ordre et adressez vous à un.e responsable." 
            correctAnswer={"1996"} 
            onSuccess={() => goToNextTrial(4)}
          />
        </div>
      </section>
    </main>
  );
}