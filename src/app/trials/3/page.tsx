"use client";

import { useRouter } from "next/navigation";
import { SearchLocations } from "@/app/components/pages/SearchLocations";
import { saveCompletedTrial } from "@/app/lib/gameProgress";
import { PageHeader } from "@/app/components/layout/PageHeader";

export default function TrialOnePage() {
  const router = useRouter();

  const goToNextTrial = () => {
    saveCompletedTrial(3);
    router.push("/trials/4");
  };

  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Trouve la destination finale !" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
            <SearchLocations validateTrial={goToNextTrial}/>
        </div>
      </section>
    </main>
  );
}