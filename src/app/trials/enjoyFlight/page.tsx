"use client";

import { SearchLocations } from "@/app/components/pages/SearchLocations";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { useNextTrial } from "@/app/lib/useNextTrial";
import { LoadingBar } from "@/app/components/pages/loadingBar";
import { useState } from "react";

export default function TrialOnePage() {
  const goToNextTrial = useNextTrial();

  let [finished, setFinished] = useState(false)
  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Destination : Kenya !" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
          <div>
            <p>Le Kenya, c'est loin. Détendez vous et profitez de votre voyage !</p>
          </div>
          {finished ? <button onClick={() => goToNextTrial(5)}>L'avion a atteri !</button> : <LoadingBar time={10} onFinish={setFinished}/>}
        </div>
      </section>
    </main>
  );
}