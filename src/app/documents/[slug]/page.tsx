"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  DOCUMENTS,
  getHighestCompletedTrial,
  isDocumentUnlocked,
  loadCompletedTrials,
  PROGRESS_CHANGE_EVENT,
} from "@/app/lib/gameProgress";
import { PageHeader } from "@/app/components/layout/PageHeader";

export default function DocumentPage() {
  const params = useParams<{ slug: string }>();
  const [completedTrials, setCompletedTrials] = useState<number[]>([]);

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

  const documentConfig = useMemo(
    () => DOCUMENTS.find((document) => document.slug === params.slug),
    [params.slug],
  );

  if (!documentConfig) {
    return (
      <main className="flex min-h-screen flex-col px-6 text-center">
        <section className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <h1 className="text-2xl font-bold">Document introuvable</h1>
            <p className="mt-3 text-sm text-black/65">Ce document n&apos;existe pas dans la progression actuelle.</p>
            <Link href="/" className="mt-5 inline-flex rounded-full bg-black/20 px-4 py-2 text-sm font-medium transition hover:bg-black/30">
              Retour à l&apos;accueil
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const unlocked = isDocumentUnlocked(documentConfig, completedTrials);
  const highestCompletedTrial = getHighestCompletedTrial(completedTrials);

  return (
    <main className="flex min-h-screen flex-col px-6 text-center">
      <PageHeader title={documentConfig.title} />
      <section className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
          {unlocked ? (
            <>
              {documentConfig.image_url && (
                <img src={documentConfig.image_url} alt={documentConfig.title} className="w-full rounded-md object-cover" />
              )}
              <p className="mt-4 text-sm leading-6 text-black/75">{documentConfig.content}</p>
            </>
          ) : (
            <>
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">Document verrouillé</p>
              <p className="mt-4 text-sm leading-6 text-black/70">
                Il se débloquera quand tu auras validé l&apos;épreuve {documentConfig.unlockAfterTrial}.
              </p>
            </>
          )}
          <Link href="/" className="mt-6 inline-flex rounded-full bg-black/20 px-4 py-2 text-sm font-medium transition hover:bg-black/30">
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
