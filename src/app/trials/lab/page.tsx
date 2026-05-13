"use client"

import { useState } from "react"
import { BasicTrial } from "@/app/components/pages/BasicTrial"
import { ColorPicker } from "@/app/components/form/ColorPicker"
import { Input } from "@/app/components/form/Input"
import { PageHeader } from "@/app/components/layout/PageHeader"
import { useNextTrial } from "@/app/lib/useNextTrial"

export default function TrialDualPage() {
  const goToNextTrial = useNextTrial()

  const [colorAnswer, setColorAnswer] = useState("")
  const [codeAnswer, setCodeAnswer] = useState("")

  const validateBoth = () => {
    const colorCorrect = colorAnswer.toLowerCase() === "yellow"
    const codeCorrect = codeAnswer === "4392"

    if (colorCorrect && codeCorrect) {
      goToNextTrial(5)
    }
  }

  console.log("render")
  return (
    <main className="flex min-h-screen flex-col px-6 text-center gap-8">
      <PageHeader title="Faites pousser la graine !" />

      <section className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xl space-y-8 rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-sm">
          
          {}
          <div>
            <BasicTrial
              label="Choisis une couleur"
              correctAnswer="yellow"
              onSuccess={() => {
              }}
              showSubmitButton={false}
              renderInput={(answer, setAnswer) => (
                <ColorPicker
                  value={colorAnswer}
                  onChange={setColorAnswer}
                  label="Sélectionne une couleur"
                  colors={["red", "blue", "green", "yellow", "purple"]}
                />
              )}
            />
          </div>

          {}
          <div>
            <BasicTrial
              label="Entre le code secret"
              placeholder="...."
              correctAnswer="4392"
              onSuccess={() => {
              }}
              showSubmitButton={false}
              renderInput={(answer, setAnswer) => (
                <Input
                  label="Entre le code secret"
                  placeholder="...."
                  id="code-answer"
                  onChange={setCodeAnswer}
                />
              )}
            />
          </div>

          {/**
            * 💡 BOUTON DE VALIDATION GLOBAL
            * 
            * Vérifier que LES DEUX sont correctes,
            * puis avancer seulement si c'est le cas.
            */}
          <button
            onClick={validateBoth}
            className="mt-6 w-full rounded-lg bg-green-500/30 py-2 font-medium hover:bg-green-500/50 transition-colors"
          >
            Valider !
          </button>

          {/**
            * 💡 DEBUG: Afficher l'état actuel (optionnel)
            * Ça aide à comprendre ce qui se passe!
            */}
          <div className="text-xs text-white/50 mt-4 p-2 rounded bg-black/20">
            <p>Couleur: {colorAnswer || "(rien)"}</p>
            <p>Code: {codeAnswer || "(rien)"}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
