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
        className="flex h-10 w-10 items-center justify-center rounded-md border shadow-lg backdrop-blur-sm"
        style={{ borderColor: 'var(--backlighter)', backgroundColor: 'var(--backdarker)' }}
      >
        <span className="flex flex-col gap-1">
          <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
          <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
          <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
        </span>
      </button>

      {isOpen && (
        <aside className="absolute right-0 top-14 w-72 rounded-2xl p-4 text-left shadow-xl backdrop-blur-sm z-50" style={{ borderColor: 'var(--backlighter)', backgroundColor: 'var(--backdarker)', color: 'var(--foreground)', border: '1px solid var(--backlighter)' }}>

          {showResetConfirm ? (
            <div className="mb-4">
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>On recommence ?</p>
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
                  className="rounded-full px-3 py-1 text-sm"
                  style={{ backgroundColor: 'var(--backlighter)', color: 'var(--foreground)' }}
                >
                  Oui
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="rounded-full px-3 py-1 text-sm"
                  style={{ backgroundColor: 'var(--backdarker)', color: 'var(--foreground)', border: '1px solid var(--backlighter)' }}
                >
                  Non
                </button>
              </div>
            </div>
          ) : ( <>
            <section className="mb-4">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Épreuves</h2>
            <ul className="mt-2 space-y-2">
              {accessibleTrials.length > 0 ? (
                accessibleTrials.map((trial) => (
                  <li key={trial.id}>
                    <Link
                      href={trial.href}
                      className={`block rounded-xl border px-3 py-2 text-sm transition ${completedTrials.includes(trial.id) ? '' : ''}`}
                      style={{ borderColor: 'var(--backlighter)', color: 'var(--foreground)' }}
                    >
                      {trial.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="rounded-xl border border-dashed px-3 py-2 text-sm" style={{ borderColor: 'var(--backlighter)', color: 'var(--backlighter)' }}>Aucune épreuve accessible pour l&apos;instant.</li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Documents</h2>
            <ul className="mt-2 space-y-2">
              {DOCUMENTS.map((document) => {
                const unlocked = isDocumentUnlocked(document, completedTrials);

                return (
                  <li key={document.slug}>
                    { unlocked && 
                      <Link href={`/documents/${document.slug}`} className="block rounded-xl border px-3 py-2 text-sm transition hover:opacity-80" style={{ borderColor: 'var(--backlighter)', color: 'var(--foreground)' }}>
                        {document.title}
                      </Link> }
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--backlighter)' }}>
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="w-full rounded-md px-3 py-2 text-sm text-left"
              style={{ backgroundColor: 'var(--backdarker)', color: 'var(--foreground)', border: '1px solid var(--backlighter)' }}
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
