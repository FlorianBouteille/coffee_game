"use client"

import { useRouter } from "next/navigation"
import { saveCompletedTrial, TRIALS } from "./gameProgress"

/**
 * Hook custom pour gérer la navigation vers le prochain trial
 * 
 * Utilisation:
 * const goToNextTrial = useNextTrial()
 * goToNextTrial(4) // Complète le trial 4 et va au suivant
 * 
 * 💡 AVANTAGES:
 * - Plus de duplication de code dans chaque trial
 * - Automatique: récupère le prochain trial depuis TRIALS
 * - Change facilement la structure des trials sans réécrire partout
 */
export function useNextTrial() {
  const router = useRouter()

  return (currentTrialId: number) => {
    saveCompletedTrial(currentTrialId)

    const nextTrial = TRIALS.find((trial) => trial.id === currentTrialId + 1)

    if (nextTrial) {
      router.push(nextTrial.href)
    } else {
      router.push("/")
    }
  }
}
