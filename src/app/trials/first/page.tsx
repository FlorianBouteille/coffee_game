"use client";

import { Enter } from "../../components/pages/Enter";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { BasicTrial } from "@/app/components/pages/BasicTrial";
import { useState, useEffect } from "react";
import { useNextTrial } from "@/app/lib/useNextTrial";

export default function TrialOnePage() {
  const goToNextTrial = useNextTrial();

  const [value, setValue] = useState(10)

      useEffect (() => {
        const id = setTimeout(() => {
        setValue(prev => {
            if (prev <= 0.01)
            {
                clearTimeout(id)
                return 0
            }
            return (prev - 0.01)
        })
        }, 10)
        return () => {
            clearTimeout(id)
        }
    }, [value])

  let strValue = value.toFixed(2)

  const lol = <div>
                <p>Je rigole... C'était pour vous réveiller un peu hihi... La situation est extremement préoccupante mais on a toujours le temps pour une petite boutade ! Allez, c'est parti cette fois !</p>
                <button onClick={() => goToNextTrial(0)}>Commcencer l'aventure !</button>
              </div>
  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title="Répondez vite à cette question !" />
      <section className="flex flex-1 items-center justify-center">
        <div className="trialZone flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
        {value > 0 && <BasicTrial 
          label="Quelle est la masse de Saturne, anneaux compris, en kilogrammes ? (notation scientifique, 3 chiffres significatifs) "
          correctAnswer="5.685e26 kg"
          onSuccess={() => {}}
          />}
        <div style={{fontSize: "60px", color: "red", fontVariantNumeric: "tabular-nums"}}>{strValue}</div>
        {value <= 0 && lol}
        </div>
      </section>
    </main>
  );
}
