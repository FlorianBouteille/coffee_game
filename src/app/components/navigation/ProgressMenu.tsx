"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DOCUMENTS,
  getHighestCompletedTrial,
  loadCompletedTrials,
  PROGRESS_CHANGE_EVENT,
  PROGRESS_STORAGE_KEY,
  TRIALS,
  isDocumentUnlocked,
} from "@/app/lib/gameProgress";

export function ProgressMenuButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [completedTrials, setCompletedTrials] = useState<number[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const syncProgress = () => {
      setCompletedTrials(loadCompletedTrials());
    };

    syncProgress();
    window.addEventListener("storage", syncProgress);
    window.addEventListener(PROGRESS_CHANGE_EVENT, syncProgress as EventListener);

    return () => {
      window.removeEventListener("storage", syncProgress);
      window.removeEventListener(PROGRESS_CHANGE_EVENT, syncProgress as EventListener);
    };
  }, []);

  const highestCompletedTrial = getHighestCompletedTrial(completedTrials);
  const accessibleTrials = TRIALS.filter((trial) => highestCompletedTrial >= (trial.id - 1));
  const availableDocuments = DOCUMENTS.filter((document) => isDocumentUnlocked(document, completedTrials));

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Ouvrir le menu de progression"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-white/80 shadow-lg backdrop-blur-sm"
      >
        <span className="flex flex-col gap-1">
          <span className="h-0.5 w-4 rounded-full bg-black/70" />
          <span className="h-0.5 w-4 rounded-full bg-black/70" />
          <span className="h-0.5 w-4 rounded-full bg-black/70" />
        </span>
      </button>

      {isOpen && (
        <aside className="absolute right-0 top-14 w-72 rounded-2xl border border-black/10 bg-white/95 p-4 text-left shadow-xl backdrop-blur-sm z-50">

          {showResetConfirm ? (
            <div className="mb-4">
              <p className="text-sm font-semibold text-black/80">On recommence ?</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
                      window.dispatchEvent(new Event(PROGRESS_CHANGE_EVENT));
                      window.localStorage.clear();
                      setCompletedTrials([]);
                      router.push("/");
                    } catch (e) {
                      // ignore
                    }
                    setShowResetConfirm(false);
                    setIsOpen(false);
                  }}
                  className="rounded-full bg-red-600 px-3 py-1 text-sm text-white"
                >
                  Oui
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                >
                  Non
                </button>
              </div>
            </div>
          ) : ( <>
            <section className="mb-4">
            <h2 className="text-sm font-semibold text-black/80">Épreuves</h2>
            <ul className="mt-2 space-y-2">
              {accessibleTrials.length > 0 ? (
                accessibleTrials.map((trial) => (
                  <li key={trial.id}>
                    <Link
                      href={trial.href}
                      className={`block rounded-xl border px-3 py-2 text-sm transition ${completedTrials.includes(trial.id) ? 'border-black/10 text-black/80' : 'border-black/5 text-black/60'}`}
                    >
                      {trial.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="rounded-xl border border-dashed border-black/10 px-3 py-2 text-sm text-black/50">Aucune épreuve accessible pour l&apos;instant.</li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-black/80">Documents</h2>
            <ul className="mt-2 space-y-2">
              {DOCUMENTS.map((document) => {
                const unlocked = isDocumentUnlocked(document, completedTrials);

                return (
                  <li key={document.slug}>
                    { unlocked && 
                      <Link href={`/documents/${document.slug}`} className="block rounded-xl border border-black/10 px-3 py-2 text-sm text-black/80 transition hover:bg-black/5">
                        {document.title}
                      </Link> }
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="mt-4 border-t border-black/10 pt-3">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="w-full rounded-md border border-black/10 bg-white/90 px-3 py-2 text-sm text-black/80 text-left"
            >
              Repartir à zéro
            </button>
          </div>
          </>)}
        </aside>
      )}
    </div>
  );
}
