export const PROGRESS_STORAGE_KEY = "coffee-game-completed-trials";
export const PROGRESS_CHANGE_EVENT = "coffee-game-progress-changed";

export type TrialConfig = {
  id: number;
  title: string;
  href: string;
};

export const TRIALS: TrialConfig[] = [
  { id: 0, title: "Première épreuve !", href: "/trials/first" },
  { id: 1, title: "Quel est ton nom ?", href: "/trials/Enter" },
  { id: 2, title: "Plan de vol", href: "/trials/flight_plan" },
  { id: 3, title: "Destination finale", href: "/trials/destination" },
  { id: 4, title: "TicTacToe", href: "/trials/tictactoe" },
  { id: 5, title: "Obtenez la graine", href: "/trials/lab" },
];

export type DocumentConfig = {
  slug: string;
  title: string;
  unlockAfterTrial: number;
  content: string;
  image_url?: string;
};

export const DOCUMENTS: DocumentConfig[] = [
  {
    slug: "boarding_pass",
    title: "Boarding pass mystere !",
    unlockAfterTrial: 1,
    content: "Cette carte d'emarquement est incomplète... Espérons que le personnel de bord est compétent ! Rendez-vous a l'aéroport !",
    image_url: "https://eaegnamwiiqzybxnxaid.supabase.co/storage/v1/object/sign/documents/boardingpass_unsolved.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZDA1ZDcyMC0zOTQ3LTRiZWItYTc4OS1lNjIyOGYzOWUzNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvYm9hcmRpbmdwYXNzX3Vuc29sdmVkLmpwZyIsImlhdCI6MTc3Nzg5NjE1NywiZXhwIjoxODA5NDMyMTU3fQ.H7TG4voPIJNNSD3RA9H-MPvtFhxIu7sos1309T4Wt9Y"
  },
  {
    slug: "complete_pass",
    title: "Boarding pass",
    unlockAfterTrial: 3,
    content: "Votre carte d'embarquement est valide ! Vite, montez dans l'avion et prenez vos places pour pouvoir décoller !",
    image_url: "https://eaegnamwiiqzybxnxaid.supabase.co/storage/v1/object/sign/documents/boardingpass_solved.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZDA1ZDcyMC0zOTQ3LTRiZWItYTc4OS1lNjIyOGYzOWUzNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvYm9hcmRpbmdwYXNzX3NvbHZlZC5qcGciLCJpYXQiOjE3Nzc4OTY4ODYsImV4cCI6MTgwOTQzMjg4Nn0.nmlrMlX0UX00j67JqxrzLBSMkLBsR4UzahWOk0LNVCw",
  },
];

function parseTrialIds(rawValue: string | null) {
  if (!rawValue) {
    return [] as number[];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "number") : [];
  } catch {
    return [] as number[];
  }
}

export function loadCompletedTrials() {
  if (typeof window === "undefined") {
    return [] as number[];
  }

  return parseTrialIds(window.localStorage.getItem(PROGRESS_STORAGE_KEY));
}

export function saveCompletedTrial(trialId: number) {
  if (typeof window === "undefined") {
    return [] as number[];
  }

  const nextTrials = Array.from(new Set([...loadCompletedTrials(), trialId])).sort((left, right) => left - right);
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(nextTrials));
  window.dispatchEvent(new Event(PROGRESS_CHANGE_EVENT));
  return nextTrials;
}

export function getHighestCompletedTrial(trialIds: number[]) {
  return trialIds.length > 0 ? Math.max(...trialIds) : 0;
}

export function isDocumentUnlocked(documentConfig: DocumentConfig, trialIds: number[]) {
  return getHighestCompletedTrial(trialIds) >= documentConfig.unlockAfterTrial;
}
