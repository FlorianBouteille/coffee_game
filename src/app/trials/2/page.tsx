"use client"

import { FlightPlan } from "@/app/components/pages/FlightPlan";
import { useRouter } from "next/navigation";
import { saveCompletedTrial } from "@/app/lib/gameProgress";
import { PageHeader } from "@/app/components/layout/PageHeader";

export default function TrialTwoPage() {
  const router = useRouter();

  const goToNextTrial = () => {
    saveCompletedTrial(2);
    router.push("/trials/3");
  };

  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Decode le plan de vol !" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
            <FlightPlan validateTrial={goToNextTrial}/>
        </div>
      </section>
    </main>
  );
}
