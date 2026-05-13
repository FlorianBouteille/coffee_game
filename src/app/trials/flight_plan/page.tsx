"use client"

import { FlightPlan } from "@/app/components/pages/FlightPlan";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { useNextTrial } from "@/app/lib/useNextTrial";

export default function TrialTwoPage() {
  const goToNextTrial = useNextTrial();

  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Decode le plan de vol !" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
            <FlightPlan validateTrial={() => goToNextTrial(2)}/>
        </div>
      </section>
    </main>
  );
}
